/*
 * Copyright 2017 Vincenzo De Notaris
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

package edu.monash.spring.sso.web.controllers;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.thymeleaf.context.Context;
import org.thymeleaf.messageresolver.StandardMessageResolver;
import org.thymeleaf.templatemode.StandardTemplateModeHandlers;
import org.thymeleaf.tools.memoryexecutor.StaticTemplateExecutor;

@Controller
@RequestMapping("/saml")
public class SSOController {

    // Logger
    private static final Logger LOG = LoggerFactory
            .getLogger(SSOController.class);

    @Autowired
    private MetadataManager metadata;

    @Autowired
    private String loginTarget;

    private String template = "<!DOCTYPE html>\n" +
            "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:th=\"http://www.thymeleaf.org\"\n" +
            "\t  xmlns:sec=\"http://www.thymeleaf.org/thymeleaf-extras-springsecurity3\">\n" +
            "<head>\n" +
            "\t<title>Select you IdP!</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "<h1>Select your IdP:</h1>\n" +
            "<form action=\"saml/login\" method=\"get\">\n" +
            "\t<div th:each=\"idp : ${idps}\">\n" +
            "\t\t<input type=\"radio\" name=\"idp\" th:id=\"'idp_' + ${idp}\" th:value=\"${idp}\" />\n" +
            "\t\t<label th:for=\"'idp_' + ${idp}\" ><span th:text=\"${idp}\">null</span></label>\n" +
            "\t</div>\n" +
            "\t<p>\n" +
            "\t\t<input type=\"submit\" value=\"Login\" />\n" +
            "\t</p>\n" +
            "</form>\n" +
            "</body>\n" +
            "</html>";

    private static String IDPS = "idps";

    @GetMapping(value = "/idpSelection")
    public ModelAndView idpSelection(HttpServletRequest request, Model model) {
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken)) {
            LOG.warn("The current user is already logged.");
            return new ModelAndView("redirect:" + this.loginTarget);
        } else {
            if (isForwarded(request)) {
                Set<String> idps = metadata.getIDPEntityNames();
                for (String idp : idps) {
                    LOG.info("Configured Identity Provider for SSO: " + idp);
                }
                model.addAttribute(IDPS, idps);
                return new ModelAndView(new View() {

                    @Override
                    public String getContentType() {
                        return "text/html";
                    }

                    @Override
                    public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws IOException {

                        String templateMode = StandardTemplateModeHandlers.HTML5.getTemplateModeName();
                        Context context = new Context();
                        context.setVariable(IDPS, model.get(IDPS));
                        StandardMessageResolver messageResolver = new StandardMessageResolver();
                        StaticTemplateExecutor executor = new StaticTemplateExecutor(context, messageResolver, templateMode);
                        String result = executor.processTemplateCode(template);

                        response.getWriter().write(result);
                        response.setContentType(this.getContentType());
                    }

                }, model.asMap());
            } else {
                LOG.warn("Direct accesses to '/idpSelection' route are not allowed");
                return new ModelAndView("redirect:" + this.loginTarget);
            }
        }
    }

    /*
     * Checks if an HTTP request has been forwarded by a servlet.
     */
    private boolean isForwarded(HttpServletRequest request) {
        if (request.getAttribute("javax.servlet.forward.request_uri") == null)
            return false;
        else
            return true;
    }

}

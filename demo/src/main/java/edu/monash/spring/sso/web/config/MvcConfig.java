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

package edu.monash.spring.sso.web.config;

import edu.monash.spring.configurations.WebMvcConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.resource.ResourceResolver;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class MvcConfig extends WebMvcConfig {
    private static final Path indexPath = Paths.get("app", "index.html");

    private boolean isLocalEnv;

    @Autowired
    public MvcConfig(Environment env) {
        for (String i : env.getActiveProfiles()) {
            if (i.equals("local")) {
                this.isLocalEnv = true;
                break;
            }
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/error").setViewName("error");
        registry.addViewController("/").setViewName("forward:/index.html");
        super.addViewControllers(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/service-worker.js").addResourceLocations("classpath:/front/service-worker.js");
        registry.addResourceHandler("/img/**").addResourceLocations("classpath:/app/img/");
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/app/static/");

        // React routes all point to indexPath.
        System.out.println("Index Path: " + MvcConfig.indexPath.toString());
        ResourceResolver reactRoutesResolver = new ReactResourceResolver(MvcConfig.indexPath.toString());

        registry.addResourceHandler(
                "*","/", "/index.html",
                "/plan", "/error/**", "/view/**", "/maps")
                .resourceChain(true)
                .addResolver(reactRoutesResolver);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (this.isLocalEnv) {
            // Allows "npm start" to still make calls to local springboot.
            // Disables on deploy.
            registry
                    .addMapping("/**")
                    .allowedMethods("*")
                    .allowedOrigins("*");
        }
    }
}
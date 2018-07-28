package edu.monash.spring.sso.web.controllers;

import edu.monash.spring.sso.saml.core.MonashSamlUser;
import edu.monash.spring.sso.stereotypes.CurrentUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class ApiController {

    @GetMapping("/currentUser")
    public MonashSamlUser get(@CurrentUser MonashSamlUser user) {
        return user;
    }

}

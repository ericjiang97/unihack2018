package edu.monash.spring.sso.web.controllers;

import edu.monash.spring.sso.web.core.User;
import edu.monash.spring.sso.web.stereotypes.CurrentUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class ApiController {

    @GetMapping("/currentUser")
    public User get(@CurrentUser User user) {
        return user;
    }

}

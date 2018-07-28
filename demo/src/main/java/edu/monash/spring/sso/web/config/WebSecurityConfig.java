package edu.monash.spring.sso.web.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebSecurityConfig extends edu.monash.spring.configurations.WebSecurityConfig {

    public WebSecurityConfig() {
        // this.setErrorPage("/error");
        // this.setLoginTarget("/");
        this.setLogoutTarget("/"); // recommend: https://my.monash , https://monash-2.campusm.exlibrisgroup.com/
    }

}
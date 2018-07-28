package edu.monash.spring.sso.web.config;

import com.google.auth.oauth2.GoogleCredentials;
import edu.monash.spring.sso.gae.DatastoreSessionMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.config.annotation.web.http.SpringHttpSessionConfiguration;

@Configuration
@EnableSpringHttpSession
public class SessionConfig extends SpringHttpSessionConfiguration {

    @Autowired
    private GoogleCredentials googleCredentials;

    @Bean
    public MapSessionRepository sessionRepository() {
        return new org.springframework.session.MapSessionRepository(new DatastoreSessionMap(googleCredentials));
    }

}
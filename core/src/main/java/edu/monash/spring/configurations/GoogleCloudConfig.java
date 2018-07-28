package edu.monash.spring.configurations;

import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.AccessControlException;

@Configuration
@ConfigurationProperties(prefix = "gcp")
public class GoogleCloudConfig {

    private final DefaultResourceLoader resourceLoader = new DefaultResourceLoader();

    private String credentialFile;

    public void setCredentialFile(String credentialFile) {
        this.credentialFile = credentialFile;
    }

    public String getCredentialFile() {
        return this.credentialFile;
    }

    @Bean
    public GoogleCredentials googleCredentials() throws IOException, AccessControlException {

        if (this.getCredentialFile() != null) {
            Resource credentialResource = resourceLoader.getResource(this.getCredentialFile());
            InputStream credentialsStream = null;
            try {
                File credentialFile = credentialResource.getFile();
                credentialsStream = new FileInputStream(credentialFile);
                return GoogleCredentials.fromStream(credentialsStream);
            } finally {
                try {
                    if (credentialsStream != null) {
                        credentialsStream.close();
                    }
                } catch (Exception e) {
                }
            }
        } else {
            return null;
        }
    }
}

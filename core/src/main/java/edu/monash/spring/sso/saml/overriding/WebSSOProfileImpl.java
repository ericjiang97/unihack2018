package edu.monash.spring.sso.saml.overriding;


import org.opensaml.common.SAMLException;
import org.opensaml.saml2.core.*;
import org.opensaml.saml2.core.impl.IssuerBuilder;
import org.opensaml.saml2.metadata.AssertionConsumerService;
import org.opensaml.saml2.metadata.IDPSSODescriptor;
import org.opensaml.saml2.metadata.SPSSODescriptor;
import org.opensaml.saml2.metadata.SingleSignOnService;
import org.opensaml.saml2.metadata.provider.MetadataProviderException;
import org.opensaml.ws.message.encoder.MessageEncodingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.saml.SAMLProcessingFilter;
import org.springframework.security.saml.context.SAMLMessageContext;
import org.springframework.security.saml.metadata.ExtendedMetadata;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.security.saml.processor.SAMLProcessor;
import org.springframework.security.saml.storage.SAMLMessageStorage;
import org.springframework.security.saml.websso.WebSSOProfile;
import org.springframework.security.saml.websso.WebSSOProfileOptions;

/**
 * Class implements WebSSO profile and offers capabilities for SP initialized SSO and
 * process Response coming from IDP or IDP initialized SSO. HTTP-POST and HTTP-Redirect
 * bindings are supported.
 *
 * @author Vladimir Schafer
 */
public class WebSSOProfileImpl extends org.springframework.security.saml.websso.WebSSOProfileImpl implements WebSSOProfile {

    private final Logger log = LoggerFactory.getLogger(WebSSOProfileImpl.class);

    private String spRequestIssuer;

    public WebSSOProfileImpl() {
    }

    public WebSSOProfileImpl(SAMLProcessor processor, MetadataManager manager) {
        super(processor, manager);
    }

    public String getSpRequestIssuer() {
        return this.spRequestIssuer;
    }

    public void setSpRequestIssuer(String value) {
        this.spRequestIssuer = value;
    }

    protected void sendMessage(SAMLMessageContext context, boolean sign) throws MetadataProviderException, SAMLException, MessageEncodingException {
        AuthnRequest authRequest = (AuthnRequest) context.getOutboundSAMLMessage();

        // Only the requested URL works in Monash.
        Issuer issuer = (new IssuerBuilder()).buildObject();
        issuer.setValue(this.spRequestIssuer);
        authRequest.setIssuer(issuer);
        authRequest.setAssertionConsumerServiceURL(this.spRequestIssuer + SAMLProcessingFilter.FILTER_URL);

        processor.sendMessage(context, sign);
    }
}
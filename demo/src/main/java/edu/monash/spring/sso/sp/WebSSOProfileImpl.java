package edu.monash.spring.sso.sp;


import org.opensaml.common.SAMLException;
import org.opensaml.saml2.core.*;
import org.opensaml.saml2.core.impl.IssuerBuilder;
import org.opensaml.saml2.core.impl.IssuerImpl;
import org.opensaml.saml2.metadata.AssertionConsumerService;
import org.opensaml.saml2.metadata.IDPSSODescriptor;
import org.opensaml.saml2.metadata.SPSSODescriptor;
import org.opensaml.saml2.metadata.SingleSignOnService;
import org.opensaml.saml2.metadata.provider.MetadataProviderException;
import org.opensaml.util.URLBuilder;
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

    @Override
    public void sendAuthenticationRequest(SAMLMessageContext context, WebSSOProfileOptions options) throws SAMLException, MetadataProviderException, MessageEncodingException {

        // Verify we deal with a local SP
        if (!SPSSODescriptor.DEFAULT_ELEMENT_NAME.equals(context.getLocalEntityRole())) {
            throw new SAMLException("WebSSO can only be initialized for local SP, but localEntityRole is: " + context.getLocalEntityRole());
        }

        // Load the entities from the context
        SPSSODescriptor spDescriptor = (SPSSODescriptor) context.getLocalEntityRoleMetadata();
        IDPSSODescriptor idpssoDescriptor = (IDPSSODescriptor) context.getPeerEntityRoleMetadata();
        ExtendedMetadata idpExtendedMetadata = context.getPeerExtendedMetadata();

        if (spDescriptor == null || idpssoDescriptor == null || idpExtendedMetadata == null) {
            throw new SAMLException("SPSSODescriptor, IDPSSODescriptor or IDPExtendedMetadata are not present in the SAMLContext");
        }

        SingleSignOnService ssoService = getSingleSignOnService(options, idpssoDescriptor, spDescriptor);
        AssertionConsumerService consumerService = getAssertionConsumerService(options, idpssoDescriptor, spDescriptor);
        AuthnRequest authRequest = getAuthnRequest(context, options, consumerService, ssoService);

        // Only the requested URL works in Monash.
        Issuer issuer = (new IssuerBuilder()).buildObject();
        issuer.setValue(this.spRequestIssuer);
        authRequest.setIssuer(issuer);
        authRequest.setAssertionConsumerServiceURL(this.spRequestIssuer + SAMLProcessingFilter.FILTER_URL);

        // TODO optionally implement support for conditions, subject

        context.setCommunicationProfileId(getProfileIdentifier());
        context.setOutboundMessage(authRequest);
        context.setOutboundSAMLMessage(authRequest);
        context.setPeerEntityEndpoint(ssoService);
        context.setPeerEntityRoleMetadata(idpssoDescriptor);
        context.setPeerExtendedMetadata(idpExtendedMetadata);

        if (options.getRelayState() != null) {
            context.setRelayState(options.getRelayState());
        }

        // boolean sign = spDescriptor.isAuthnRequestsSigned() || idpssoDescriptor.getWantAuthnRequestsSigned();
        // sendMessage(context, sign);

        sendMessage(context, false); // never sign request

        SAMLMessageStorage messageStorage = context.getMessageStorage();
        if (messageStorage != null) {
            messageStorage.storeMessage(authRequest.getID(), authRequest);
        }

    }
}
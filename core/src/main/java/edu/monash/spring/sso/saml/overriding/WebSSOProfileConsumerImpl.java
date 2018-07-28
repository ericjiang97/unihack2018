package edu.monash.spring.sso.saml.overriding;

import org.opensaml.common.SAMLException;
import org.opensaml.saml2.core.AudienceRestriction;
import org.opensaml.saml2.core.AuthnStatement;
import org.opensaml.saml2.core.RequestedAuthnContext;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.saml.context.SAMLMessageContext;

import java.util.List;

public class  WebSSOProfileConsumerImpl extends org.springframework.security.saml.websso.WebSSOProfileConsumerImpl {

    private String spRequestIssuer;

    public String getSpRequestIssuer() {
        return this.spRequestIssuer;
    }

    public void setSpRequestIssuer(String value) {
        this.spRequestIssuer = value;
    }

    protected void verifyAudience(SAMLMessageContext context, List<AudienceRestriction> audienceRestrictions) throws SAMLException {
        context.setLocalEntityId(this.getSpRequestIssuer());
        super.verifyAudience(context, audienceRestrictions);
    }

    protected void verifyAuthenticationStatement(AuthnStatement auth, RequestedAuthnContext requestedAuthnContext, SAMLMessageContext context) throws AuthenticationException {

        // Removed logic to talidate that user wasn't authenticated too long time ago, since user may log into Okta and keep the session for long.

        // Validate users session is still valid
        if (auth.getSessionNotOnOrAfter() != null && auth.getSessionNotOnOrAfter().isBeforeNow()) {
            throw new CredentialsExpiredException("Authentication session is not valid on or after " + auth.getSessionNotOnOrAfter());
        }

        // Verify context
        verifyAuthnContext(requestedAuthnContext, auth.getAuthnContext(), context);

    }
}

package edu.monash.spring.sso.sp;

import org.opensaml.common.SAMLException;
import org.opensaml.saml2.core.AudienceRestriction;
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
}

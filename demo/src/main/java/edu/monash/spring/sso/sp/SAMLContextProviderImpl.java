package edu.monash.spring.sso.sp;

import org.opensaml.common.xml.SAMLConstants;
import org.opensaml.saml2.metadata.Endpoint;
import org.opensaml.saml2.metadata.EntityDescriptor;
import org.opensaml.saml2.metadata.RoleDescriptor;
import org.opensaml.saml2.metadata.impl.EntityDescriptorBuilder;
import org.opensaml.saml2.metadata.impl.RoleDescriptorImpl;
import org.opensaml.saml2.metadata.impl.SPSSODescriptorBuilder;
import org.opensaml.saml2.metadata.provider.MetadataProviderException;
import org.springframework.security.saml.context.SAMLMessageContext;
import org.springframework.security.saml.metadata.ExtendedMetadata;

import javax.xml.namespace.QName;
import java.util.List;

public class SAMLContextProviderImpl extends org.springframework.security.saml.context.SAMLContextProviderImpl {

    @Override
    protected void populateLocalEntity(SAMLMessageContext samlContext) throws MetadataProviderException {

        String localEntityId = samlContext.getLocalEntityId();
        QName localEntityRole = samlContext.getLocalEntityRole();

        if (localEntityId == null) {
            throw new MetadataProviderException("No hosted service provider is configured and no alias was selected");
        }

        EntityDescriptor entityDescriptor = metadata.getEntityDescriptor(localEntityId);
        RoleDescriptor roleDescriptor = metadata.getRole(localEntityId, localEntityRole, SAMLConstants.SAML20P_NS);
        ExtendedMetadata extendedMetadata = metadata.getExtendedMetadata(localEntityId);

        if (entityDescriptor == null) {
            entityDescriptor = (new EntityDescriptorBuilder()).buildObject();
        }

        if (roleDescriptor == null) {
            roleDescriptor = (new SPSSODescriptorBuilder()).buildObject();
        }

        samlContext.setLocalEntityMetadata(entityDescriptor);
        samlContext.setLocalEntityRoleMetadata(roleDescriptor);
        samlContext.setLocalExtendedMetadata(extendedMetadata);

        if (extendedMetadata.getSigningKey() != null) {
            samlContext.setLocalSigningCredential(keyManager.getCredential(extendedMetadata.getSigningKey()));
        } else {
            samlContext.setLocalSigningCredential(keyManager.getDefaultCredential());
        }

    }
}

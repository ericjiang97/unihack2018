package edu.monash.spring.sso.core;

import edu.monash.spring.configurations.WebMvcConfig;
import edu.monash.spring.configurations.WebSecurityConfig;
import edu.monash.spring.sso.saml.core.CurrentUserHandlerMethodArgumentResolver;
import edu.monash.spring.sso.saml.core.MonashSamlUser;
import edu.monash.spring.sso.web.CommonTestSupport;
import edu.monash.spring.sso.stereotypes.CurrentUser;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.security.Principal;
import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= {WebMvcConfig.class, WebSecurityConfig.class})
public class CurrentUserHandlerMethodArgumentResolverTest extends CommonTestSupport {

    @Autowired
    private CurrentUserHandlerMethodArgumentResolver resolver;

    private MethodParameter validParam;

    private MethodParameter notAnnotatedParam;

    private MethodParameter wrongTypeParam;

    @Before
    public void init() throws NoSuchMethodException {
        validParam = new MethodParameter(
                MethodSamples.class.getMethod("validUser", MonashSamlUser.class), 0);
        notAnnotatedParam = new MethodParameter(
                MethodSamples.class.getMethod("notAnnotatedUser", MonashSamlUser.class), 0);
        wrongTypeParam = new MethodParameter(
                MethodSamples.class.getMethod("wrongTypeUser", Object.class), 0);
    }

    @Test
    public void testSupportsParameter() throws NoSuchMethodException {
        assertTrue(resolver.supportsParameter(validParam));
        assertFalse(resolver.supportsParameter(notAnnotatedParam));
        assertFalse(resolver.supportsParameter(wrongTypeParam));
    }

    @Test
    public void testResolveArgument() throws Exception {
        // given
        ModelAndViewContainer mavContainer = mock(ModelAndViewContainer.class);
        WebDataBinderFactory binderFactory = mock(WebDataBinderFactory.class);
        NativeWebRequest webRequest = mock(NativeWebRequest.class);
        MonashSamlUser stubUser = new MonashSamlUser(USER_NAME, "", Collections.emptyList());
        Principal stubPrincipal = new UsernamePasswordAuthenticationToken(stubUser, null);
        when(webRequest.getUserPrincipal()).thenReturn(stubPrincipal);

        // when/then
        assertEquals(stubUser,
                resolver.resolveArgument(validParam, mavContainer, webRequest, binderFactory));
        assertEquals(WebArgumentResolver.UNRESOLVED,
                resolver.resolveArgument(notAnnotatedParam, mavContainer, webRequest, binderFactory));
        assertEquals(WebArgumentResolver.UNRESOLVED,
                resolver.resolveArgument(wrongTypeParam, mavContainer, webRequest, binderFactory));
    }

    @SuppressWarnings("unused")
    private static final class MethodSamples {

        public void validUser(@CurrentUser MonashSamlUser user) {
        }

        public void notAnnotatedUser(MonashSamlUser user) {
        }

        public void wrongTypeUser(@CurrentUser Object user) {
        }
    }
}

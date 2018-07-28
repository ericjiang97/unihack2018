package edu.monash.spring.sso.web.controllers;

import edu.monash.spring.configurations.WebMvcConfig;
import edu.monash.spring.configurations.WebSecurityConfig;
import edu.monash.spring.sso.saml.core.MonashSamlUser;
import edu.monash.spring.sso.web.CommonTestSupport;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.MethodParameter;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.View;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {WebMvcConfig.class, WebSecurityConfig.class})
@WebAppConfiguration
public class ApiControllerTest extends CommonTestSupport {

    @InjectMocks
    private ApiController apiController;

    @Mock
    private View mockView;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = standaloneSetup(apiController)
                .setCustomArgumentResolvers(new MockArgumentResolver())
                .setSingleView(mockView).build();
    }

    @Test
    public void testAnonymousCurrentUser() throws Exception {
        mockMvc.perform(get("/currentUser").session(mockHttpSession(true)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("username", is(CommonTestSupport.USER_NAME)));
    }

    private static class MockArgumentResolver implements HandlerMethodArgumentResolver {
        @Override
        public boolean supportsParameter(MethodParameter methodParameter) {
            return methodParameter.getParameterType().equals(MonashSamlUser.class);
        }

        @Override
        public Object resolveArgument(MethodParameter methodParameter,
                                      ModelAndViewContainer modelAndViewContainer,
                                      NativeWebRequest nativeWebRequest,
                                      WebDataBinderFactory webDataBinderFactory)
                throws Exception {
            return CommonTestSupport.USER_DETAILS;
        }
    }

}

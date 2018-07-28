/*
 * =============================================================================
 * 
 *   Copyright (c) 2011-2014, The THYMELEAF team (http://www.thymeleaf.org)
 * 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * 
 * =============================================================================
 */
package org.thymeleaf.tools.memoryexecutor;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import org.thymeleaf.TemplateProcessingParameters;
import org.thymeleaf.resourceresolver.IResourceResolver;
import org.thymeleaf.util.Validate;

/**
 * This non-standard "resource resolver" always return the template contents provided in the constructor.
 * 
 * It is thought to be use with MemoryTemplateResolver.
 */
class FixedMemoryResourceResolver implements IResourceResolver {

    private static final String NAME = "FixedMemoryResourceResolver";

    private final String templateContent;

    public FixedMemoryResourceResolver(final String templateContent) {
        Validate.notNull(templateContent, "Template content must be non-null");
        this.templateContent = templateContent;
    }
    
    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public InputStream getResourceAsStream(final TemplateProcessingParameters tpp, final String templateName) {
        return new ByteArrayInputStream(templateContent.getBytes());
    }
}

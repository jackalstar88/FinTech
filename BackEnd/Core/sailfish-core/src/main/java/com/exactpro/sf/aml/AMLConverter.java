/******************************************************************************
 * Copyright 2009-2018 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.exactpro.sf.aml;

import com.exactpro.sf.aml.generator.AlertCollector;
import com.exactpro.sf.aml.generator.AlertType;
import com.exactpro.sf.aml.reader.struct.AMLBlock;
import com.exactpro.sf.aml.reader.struct.AMLMatrix;
import com.exactpro.sf.aml.visitors.AMLConverterVisitor;
import com.exactpro.sf.scriptrunner.actionmanager.IActionManager;
import com.google.common.collect.ListMultimap;

public class AMLConverter {
    public static ListMultimap<AMLBlockType, AMLTestCase> convert(AMLMatrix matrix, AMLSettings settings, IActionManager actionManager) throws AMLException {
        AMLMatrixWrapper wrapper = new AMLMatrixWrapper(matrix);
        AMLConverterVisitor visitor = new AMLConverterVisitor(settings, actionManager, wrapper);

        for(AMLBlock block : matrix.getBlocks()) {
            block.accept(visitor);
        }

        AlertCollector alertCollector = visitor.getAlertCollector();

        if(alertCollector.getCount(AlertType.ERROR) > 0) {
            throw new AMLException("Failed to convert blocks", alertCollector);
        }

        return visitor.getBlocks();
    }
}

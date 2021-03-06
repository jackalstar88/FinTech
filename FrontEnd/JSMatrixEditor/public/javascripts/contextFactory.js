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
import {PropTypes} from 'react';
import Baobab from 'baobab';
import {TheMatrixList, getMainStoreId} from 'state/TheMatrixList';

export const baseContextTypes = {
    storeId: PropTypes.string.isRequired,
    panelId: PropTypes.string.isRequired,
    currentStore: PropTypes.instanceOf(Baobab).isRequired,
    readonly: PropTypes.bool.isRequired
};

function BaseContext() {}

export function contextFactory(storeId, panelId) {
    const result = new BaseContext();
    result.storeId = '' +  storeId;
    result.panelId = '' + panelId;
    result.currentStore = TheMatrixList[result.storeId];
    result.readonly = result.storeId !== getMainStoreId();

    return result;
}

export default contextFactory;

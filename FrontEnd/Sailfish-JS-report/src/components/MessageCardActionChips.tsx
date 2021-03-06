/******************************************************************************
 * Copyright 2009-2019 Exactpro (Exactpro Systems Limited)
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

import { h } from 'preact';
import { Chip } from './Chip';
import Action from '../models/Action';
import { StatusType, statusValues } from '../models/Status';
import "../styles/messages.scss";
import { createSelector } from '../helpers/styleCreators';

type SelectHandler = (status: StatusType) => any;

interface ActionChipsProps {
    actions: Action[];
    selectedStatus?: StatusType;
    selectHandler: SelectHandler;
}

export const MessageCardActionChips = ({ actions, selectedStatus, selectHandler }: ActionChipsProps) => {

    const className = createSelector(
        "mc-header__info",
        actions.length ? null : "empty"
    );

    return (
        <div class={className}>
            {
                actions.length ? 
                statusValues.map(status => renderChip(
                        status, 
                        actions.filter(action => action.status.status == status), 
                        selectedStatus,
                        selectHandler
                    )
                ) : 
                <p>Not related to any actions</p>
            }
        </div>
    )
}

function renderChip(status: StatusType, statusActions: Action[], selectedStatus: StatusType, selectHandeler: SelectHandler): JSX.Element {

    if (!statusActions || statusActions.length == 0) {
        return null;
    }

    return (
        <Chip
            count={statusActions.length}
            status={status}
            isSelected={status == selectedStatus} 
            clickHandler={e => { 
                selectHandeler(status);
                e.cancelBubble = true;
            }}/>
    )
}

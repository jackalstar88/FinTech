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
import UserMessage from '../models/UserMessage';
import ExpandablePanel from './ExpandablePanel';
import ExceptionCard from './ExceptionCard';
import { createSelector } from '../helpers/styleCreators';
import '../styles/action.scss';

interface CustomMessageProps {
    userMessage: UserMessage;
}

export const CustomMessage = ({ userMessage }: CustomMessageProps) => {

    const { message, color, style, level, exception } = userMessage;

    // italic style value - only for fontStyle css property
    // bold style value - only for fontWeight css property
    const messageStyle = {
        color: (color || "").toLowerCase(),
        fontStyle: (style || "").toLowerCase(),
        fontWeight: (style || "").toLowerCase()
    };

    const rootClass = createSelector(
        "action-card__custom-msg",
        level
    );

    if (exception) {
        return (
            <ExpandablePanel>
                <div class={rootClass}>
                    <div class="ac-body__item-title" style={messageStyle}>{message}</div>
                </div>
                <ExceptionCard
                    exception={exception}
                    drawDivider={false}/>
            </ExpandablePanel>
        )
    }

    return (
        <div class={rootClass + "   ac-body__item"}>
            <h3 style={messageStyle}>{message}</h3>
        </div>
    )
}
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

import { h, Component } from "preact";
import "../styles/checkpoint.scss";
import { createSelector } from '../helpers/styleCreators';

interface CheckpointProps {
    name: string;
    count: number;
    description?: string;
    isSelected: boolean;
    clickHandler?: () => any;
}

export class Checkpoint extends Component<CheckpointProps> {

    render({ name, count, isSelected, clickHandler, description }: CheckpointProps) {

        const rootClassName = createSelector(
            "checkpoint", 
            isSelected ? "selected" : ""
        );

        return (
            <div class={rootClassName}
                onClick={clickHandler}>
                <div class="checkpoint-icon" />
                <div class="checkpoint-count">Checkpoint {count}</div>
                <div class="checkpoint-name">{name}</div>
                <div class="checkpoint-description">{description}</div>
            </div>
        )
    }
}
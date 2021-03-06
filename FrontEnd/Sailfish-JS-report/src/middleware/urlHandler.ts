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

import AppState from "../state/models/AppState";
import { StateActionType } from "../actions/stateActions";

export const TEST_CASE_PARAM_KEY = 'tc',
    ACTION_PARAM_KEY = 'action',
    MESSAGE_PARAM_KEY = 'message';

 // we can't use window.location.search because URL can contain another search params
export function getUrlSearchString(url: string) {
    // removing previous search params
    const urlEnd = url.slice(url.lastIndexOf('/'));
    
    if (urlEnd.indexOf('?') == -1) {
        return "";
    }

    return urlEnd.slice(urlEnd.lastIndexOf('?'));
}

// redux middleware
export const urlHandler = store =>  next => (action: StateActionType) => {

    const prevState = store.getState() as AppState,
        result = next(action),
        nextState = store.getState() as AppState;

    hadnleStateUpdate(prevState, nextState);

    return result;
}

function hadnleStateUpdate(prevState : AppState, nextState : AppState) {
    // we use top.window instared of window to work with real window url, not iframe url

    if (prevState.selected.actionsId == nextState.selected.actionsId && 
        prevState.selected.messagesId == nextState.selected.messagesId && 
        prevState.selected.testCase == nextState.selected.testCase) {

        return;
    }

    const searchString = getUrlSearchString(top.window.location.href), 
        searchParams = new URLSearchParams(searchString),
        nextSearchParams = getNextSearchParams(searchParams, prevState, nextState),
        nextUrl = getNextUrl(top.window.location.href, searchString, nextSearchParams);

    top.window.history.pushState({}, "", nextUrl);
}

// returns new search params, based on state change
function getNextSearchParams(searchParams : URLSearchParams, prevState : AppState, nextState : AppState) : URLSearchParams {
    if (prevState.selected.testCase != nextState.selected.testCase) {
        if (nextState.selected.testCase) {
            searchParams.set(TEST_CASE_PARAM_KEY, nextState.selected.testCase.id);
        } else {
            searchParams.delete(TEST_CASE_PARAM_KEY);
        }
    }
    
    if (prevState.selected.actionsId != nextState.selected.actionsId) {
        if (nextState.selected.actionsId.length > 0) {
            searchParams.set(ACTION_PARAM_KEY, nextState.selected.actionsId.toString());
            // removing verification message id from url
            searchParams.delete(MESSAGE_PARAM_KEY);
        } else {
            searchParams.delete(ACTION_PARAM_KEY);
        }
    }
    
     // verification message selection handling
     if (nextState.selected.actionsId.length == 0 && prevState.selected.messagesId != nextState.selected.messagesId) {
        if (nextState.selected.messagesId && nextState.selected.messagesId.length != 0) {
            searchParams.set(MESSAGE_PARAM_KEY, nextState.selected.messagesId[0].toString());
        } else {
            searchParams.delete(MESSAGE_PARAM_KEY);
        }
    }

    return searchParams;
}

function getNextUrl(prevUrl : string, prevSearchString : string, nextSearchParams : URLSearchParams) : string {
    
    if (prevSearchString && prevSearchString != '?') {
        return prevUrl.replace(prevSearchString, '?' + nextSearchParams.toString());
    } else {
        // search params not found or empty

        return [
            prevUrl, 
            // optional '?' - we need this  not to create two '?' symbols
            prevUrl[prevUrl.length - 1] != '?' ? '?' : null,
            nextSearchParams.toString()
        ].join('');
    }
}
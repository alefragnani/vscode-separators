/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

export interface RuleConfig {
    name: string;
    languageIds: string[];
    rules: Rules;
}

export interface Rules {
    singleLine: string;
    multiLine: MultiLineRule[];
}

export interface MultiLineRule {
    start: string;
    end: string;
}

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS, LUA_LANGUAGE_IDS } from "../constants";
import { JavaScriptTypeScriptLanguage } from "./javaScriptTypeScript";
import { Language } from "./language";
import { LuaLanguage } from "./lua";

export class LanguageFactory {

    static getLanguage(languageId: string): Language | undefined {
        if (JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS.includes(languageId)) {
            return new JavaScriptTypeScriptLanguage();
        } else if (LUA_LANGUAGE_IDS.includes(languageId)) {
            return new LuaLanguage();
        } else {
            return undefined;
        }
    }
}
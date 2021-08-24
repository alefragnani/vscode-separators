/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CALLBACK_LANGUAGE_IDS } from "../constants";
import { JavaScriptTypeScriptLanguage } from "./javaScriptTypeScript";
import { Language } from "./language";
// import { LuaLanguage } from "./lua";

export class LanguageFactory {

    static getLanguage(languageId: string): Language | undefined {
        if (CALLBACK_LANGUAGE_IDS.includes(languageId)) {
            return new JavaScriptTypeScriptLanguage();
        // } else if (languageId === "lua") {
        //     return new LuaLanguage();
        } else {
            return undefined
        }
    }
}
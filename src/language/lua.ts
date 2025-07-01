/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class LuaLanguage implements Language {
    
    isCallback(symbol: DocumentSymbol): boolean {
        return symbol.name === "<Anonymous>" && symbol.detail.includes("-> function");
    }

    isGetterSetter(symbol: DocumentSymbol): boolean {
        // In Lua, getters are typically implemented as functions with 'get' in their name or detail.
        // This is a heuristic, as Lua does not have native getter syntax.
        return (
            typeof symbol.name === "string" &&
            /^(get|set)[A-Z_]/.test(symbol.name)
        );
    }
}
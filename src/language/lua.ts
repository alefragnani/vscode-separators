/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class LuaLanguage implements Language {
    
    supportsComments(): boolean {
        return false;
    }
    
    isCallback(symbol: DocumentSymbol): boolean {
        return symbol.name === "<Anonymous>" && symbol.detail.includes("-> function");
    }
}
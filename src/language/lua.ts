/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class LuaLanguage implements Language {
    
    isMultiLineCommentStart(lineText: string): boolean {
        return lineText.trim().startsWith("--[[");
    }
    isMultiLineCommentEnd(lineText: string): boolean {
        return lineText.trim().endsWith("]]");
    }
    
    isSingleLineComment(lineText: string): boolean {
        return lineText.trim().startsWith("--");
    }
    
    supportsComments(): boolean {
        return true;
    }
    
    isCallback(symbol: DocumentSymbol): boolean {
        return symbol.name === "<Anonymous>" && symbol.detail.includes("-> function");
    }
}
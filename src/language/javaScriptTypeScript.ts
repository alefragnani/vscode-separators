/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class JavaScriptTypeScriptLanguage implements Language {
    
    isMultiLineCommentStart(lineText: string): boolean {
        return lineText.trim().startsWith("/*") || lineText.trim().startsWith("/**");
    }
    isMultiLineCommentEnd(lineText: string | undefined): boolean {
        if (!lineText) return false;

        return lineText.trim().endsWith("*/");
    }
    
    isSingleLineComment(lineText: string | undefined): boolean {
        if (!lineText) return false;
        
        return lineText.trim().startsWith("//");
    }
    
    supportsComments(): boolean {
        return true;
    }

    isCallback(symbol: DocumentSymbol): boolean {
        return symbol.name.endsWith(' callback');
    }
}

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class GenericLanguage implements Language {
    
    isMultiLineCommentStart(lineText: string): boolean {
        return /^\s*\/\*/.test(lineText);
    }
    isMultiLineCommentEnd(lineText: string): boolean {
        return /\*\/\s*$/.test(lineText);
    }
    isSingleLineComment(lineText: string): boolean {
        return /^\s*\/\//.test(lineText);
    }
    supportsComments(): boolean {
        return true;
    }
    isCallback(symbol: DocumentSymbol): boolean {
        return false;
    }
}
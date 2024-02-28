/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, TextEditor } from "vscode";
import { LanguageFactory } from "./language/factory";

export function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol): number {

    const language = LanguageFactory.getLanguage(<string>activeEditor.document?.languageId);
    if (!language?.supportsComments()) {
        return documentSymbol.range.start.line;
    }
    
    let lineAbove = documentSymbol.range.start.line - 1;
    let lineTextAbove = getLineTextAbove(activeEditor, lineAbove);

    if (lineAbove < 0) return 0;
    
    if (language.isSingleLineComment(lineTextAbove)) {
        while (language.isSingleLineComment(lineTextAbove)) {
            lineAbove--;
            lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
        }
        return lineAbove + 1;
    }
    
    if (language.isMultiLineCommentEnd(lineTextAbove)) {
        lineAbove--;
        lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
        let didFoundMultiLineCommentStart = language.isMultiLineCommentStart(lineTextAbove);
        while (!didFoundMultiLineCommentStart) {
            lineAbove--;
            lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
            
            if (!lineTextAbove) break;
            
            didFoundMultiLineCommentStart = language.isMultiLineCommentStart(lineTextAbove);
        } 
        
        if (!didFoundMultiLineCommentStart) {
            return documentSymbol.range.start.line;
        }

        return lineAbove;   
    }
    
    return lineAbove + 1;
}

function getLineTextAbove(activeEditor: TextEditor, lineAbove: number): string | undefined {
    if (lineAbove < 0) {
        return undefined;
    }
    return activeEditor.document.lineAt(lineAbove).text;
}


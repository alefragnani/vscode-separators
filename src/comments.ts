/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, TextDocument, TextEditor } from "vscode";
import { LanguageFactory } from "./language/factory";

export function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol): number {

    if (!languageSupportsComments(activeEditor.document)) {
        return documentSymbol.range.start.line;
    }

    const lineAbove = documentSymbol.range.start.line - 1;
    const lineTextAbove = activeEditor.document.lineAt(lineAbove).text;
    const commentIndex = lineTextAbove.indexOf("//");
    if (commentIndex > 0) {
        return lineAbove;
    }
    return documentSymbol.range.start.line;
}

function languageSupportsComments(textDocument: TextDocument) {
    
    const language = LanguageFactory.getLanguage(<string>textDocument?.languageId);
    return language !== undefined;
}

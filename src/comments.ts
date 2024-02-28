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
    let lineTextAbove = activeEditor.document.lineAt(lineAbove).text;
    while (lineTextAbove.trim().startsWith("//")) {
        lineAbove--;
        lineTextAbove = activeEditor.document.lineAt(lineAbove).text;
    }
    return lineAbove + 1;

}


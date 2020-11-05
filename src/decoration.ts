/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { window, ThemeColor, TextEditor, Range, TextEditorDecorationType, DecorationRenderOptions, DocumentSymbol, workspace } from "vscode";

function createTopLineDecoration(
    borderColor: string | ThemeColor, borderWidth: string, borderStyle: string
): TextEditorDecorationType {
    const decorationOptions: DecorationRenderOptions = {
        isWholeLine: true,
        borderWidth: `${borderWidth} 0 0 0`,
        borderStyle: `${borderStyle}`,
        borderColor: borderColor
    };

    return window.createTextEditorDecorationType(decorationOptions);
}

export function createTextEditorDecoration() {

    const borderColor = new ThemeColor('separators.methods.borderColor');
    const borderWidth = workspace.getConfiguration("separators").get("methods.borderWidth", 1);
    const borderStyle = workspace.getConfiguration("separators").get("methods.borderStyle", "solid");

    return createTopLineDecoration(borderColor, `${borderWidth}px`, borderStyle);
}

export function updateDecorationsInActiveEditor(activeEditor: TextEditor | undefined,
    symbols: DocumentSymbol[] | undefined,
    bookmarkDecorationType: TextEditorDecorationType) {
    if (!activeEditor) {
        return;
    }

    if (!symbols) {
        const bks: Range[] = [];
        activeEditor.setDecorations(bookmarkDecorationType, bks);
        return;
    }

    const books: Range[] = [];


    for (const element of symbols) {
        const decoration = new Range(element.range.start.line, 0, element.range.start.line, 0);
        books.push(decoration);
    }

    activeEditor.setDecorations(bookmarkDecorationType, books);
}
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ExtensionContext, workspace, window, ThemeColor, OverviewRulerLane, TextEditor, Range, TextEditorDecorationType, SymbolInformation, DecorationRenderOptions } from "vscode";

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

export function createTextEditorDecoration(context: ExtensionContext) {

    const borderColor = new ThemeColor('separator.borderColors');

    return createTopLineDecoration("#65EAB9", "1px", "solid");
}

export function updateDecorationsInActiveEditor(activeEditor: TextEditor | undefined, 
    symbols: SymbolInformation[] | undefined,
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
        const decoration = new Range(element.location.range.start.line, 0, element.location.range.start.line, 0);
        books.push(decoration);
    }

    activeEditor.setDecorations(bookmarkDecorationType, books);
}
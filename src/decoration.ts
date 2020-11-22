/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { window, ThemeColor, TextEditor, Range, TextEditorDecorationType, DecorationRenderOptions, DocumentSymbol, workspace } from "vscode";
import { DEFAULT_GREENISH_COLOR } from "./constants";

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

function useOriginalGreenishSeparator(symbolKind: string): boolean {
    if (!["methods", "functions", "constructors"].includes(symbolKind)) {
        return false;
    }

    return workspace.getConfiguration("separators").get("useOriginalGreenishSeparator", false);
}

function getBorderColor(symbolKind: string): string | ThemeColor {
    if (useOriginalGreenishSeparator(symbolKind)) {
        return DEFAULT_GREENISH_COLOR;
    }
    
    return new ThemeColor(`separators.${symbolKind}.borderColor`);
}

export function createTextEditorDecoration(symbolKind: string): TextEditorDecorationType {

    const borderColor = getBorderColor(symbolKind);    
    const borderWidth = workspace.getConfiguration("separators").get(`${symbolKind}.borderWidth`, 1);
    const borderStyle = workspace.getConfiguration("separators").get(`${symbolKind}.borderStyle`, "solid");

    return createTopLineDecoration(borderColor, `${borderWidth}px`, borderStyle);
}

export function updateDecorationsInActiveEditor(activeEditor: TextEditor | undefined,
    symbols: DocumentSymbol[] | undefined,
    decorationType: TextEditorDecorationType) {
    if (!activeEditor) {
        return;
    }

    if (!symbols) {
        const bks: Range[] = [];
        activeEditor.setDecorations(decorationType, bks);
        return;
    }

    const ranges: Range[] = [];

    for (const element of symbols) {
        const decoration = new Range(element.range.start.line, 0, element.range.start.line, 0);
        ranges.push(decoration);
    }

    activeEditor.setDecorations(decorationType, ranges);
}
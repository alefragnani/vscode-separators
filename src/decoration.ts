/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { window, ThemeColor, TextEditor, Range, TextEditorDecorationType, DecorationRenderOptions, DocumentSymbol, workspace } from "vscode";
import { DEFAULT_GREENISH_COLOR, Location } from "./constants";

export interface TextEditorDecorationTypePair {
    above: TextEditorDecorationType;
    below: TextEditorDecorationType;
}

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

function createBottomLineDecoration(
    borderColor: string | ThemeColor, borderWidth: string, borderStyle: string
): TextEditorDecorationType {
    const decorationOptions: DecorationRenderOptions = {
        isWholeLine: true,
        borderWidth: `0 0 ${borderWidth} 0`,
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

export function createTextEditorDecoration(symbolKind: string): TextEditorDecorationTypePair {

    const borderColor = getBorderColor(symbolKind);    
    const borderWidth = workspace.getConfiguration("separators").get(`${symbolKind}.borderWidth`, 1);
    const borderStyle = workspace.getConfiguration("separators").get(`${symbolKind}.borderStyle`, "solid");

    return { 
        above: createTopLineDecoration(borderColor, `${borderWidth}px`, borderStyle),
        below: createBottomLineDecoration(borderColor, `${borderWidth}px`, borderStyle)
    }
}

export function updateDecorationsInActiveEditor(activeEditor: TextEditor | undefined,
    symbols: DocumentSymbol[] | undefined,
    decorationType: TextEditorDecorationTypePair) {
    if (!activeEditor) {
        return;
    }

    if (!symbols) {
        const bks: Range[] = [];
        activeEditor.setDecorations(decorationType.above, bks);
        activeEditor.setDecorations(decorationType.below, bks);
        return;
    }

    const location = workspace.getConfiguration("separators").get<string>("location", Location.aboveTheSymbol);

    const rangesAbove: Range[] = [];
    const rangesBelow: Range[] = [];

    for (const element of symbols) {
        if (location === Location.aboveTheSymbol || location === Location.surroundingTheSymbol) {
            const decorationAbove = new Range(element.range.start.line, 0, element.range.start.line, 0);
            rangesAbove.push(decorationAbove);
        }
        
        if (location === Location.belowTheSymbol || location === Location.surroundingTheSymbol) {
            const decorationBelow = new Range(element.range.end.line, 0, element.range.end.line, 0);
            rangesBelow.push(decorationBelow);
        }
    }

    activeEditor.setDecorations(decorationType.above, rangesAbove);
    activeEditor.setDecorations(decorationType.below, rangesBelow);
}
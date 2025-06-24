/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { window, ThemeColor, TextEditor, Range, TextEditorDecorationType, DecorationRenderOptions, DocumentSymbol, workspace } from "vscode";
import { DEFAULT_GREENISH_COLOR, } from "./constants";
import { Location, shouldHaveSeparatorAbove, shouldHaveSeparatorBelow } from "./location";
import { shiftTopLineAboveComment } from "./comments/comments";
import { symbolHasAtLeastNLines } from "./symbols";

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

export async function updateDecorationsInActiveEditor(activeEditor: TextEditor | undefined,
    symbols: DocumentSymbol[],
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
    const minimumLineCount = workspace.getConfiguration("separators", window.activeTextEditor?.document).get<number>("minimumLineCount", 0);

    const rangesAbove: Range[] = [];
    const rangesBelow: Range[] = [];

    for (let i = 0; i < symbols.length; i++) {
        const element = symbols[i];
        const elementAbove = i === 0 ? undefined : symbols[i - 1];

        if (!symbolHasAtLeastNLines(element, minimumLineCount)) {
            continue;
        }
        
        if (shouldHaveSeparatorAbove(location)) {
            const topLine = await shiftTopLineAboveComment(activeEditor, element, elementAbove);
            const decorationAbove = new Range(topLine, 0, topLine, 0);
            rangesAbove.push(decorationAbove);
        }
        
        if (shouldHaveSeparatorBelow(location)) {
            const decorationBelow = new Range(element.range.end.line, 0, element.range.end.line, 0);
            rangesBelow.push(decorationBelow);
        }
    }

    activeEditor.setDecorations(decorationType.above, rangesAbove);
    activeEditor.setDecorations(decorationType.below, rangesBelow);
}

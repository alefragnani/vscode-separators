/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Position, Range, Selection, window } from "vscode";

export function findPreviousSeparatorLine(separatorLines: number[], currentLine: number, fallbackLine: number): number {
    const sorted = [...separatorLines].sort((a, b) => a - b);
    const above = sorted.filter(line => line < currentLine);
    return above.length > 0 ? above[above.length - 1] : fallbackLine;
}

export function findNextSeparatorLine(separatorLines: number[], currentLine: number, fallbackLine: number): number {
    const sorted = [...separatorLines].sort((a, b) => a - b);
    const below = sorted.filter(line => line > currentLine);
    return below.length > 0 ? below[0] : fallbackLine;
}

export function navigateToPrevious(separatorLines: number[]): void {
    const editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    const currentLine = editor.selection.active.line;
    const targetLine = findPreviousSeparatorLine(separatorLines, currentLine, 0);

    const position = new Position(targetLine, 0);
    editor.selection = new Selection(position, position);
    editor.revealRange(new Range(position, position));
}

export function navigateToNext(separatorLines: number[]): void {
    const editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    const currentLine = editor.selection.active.line;
    const lastLine = editor.document.lineCount - 1;
    const targetLine = findNextSeparatorLine(separatorLines, currentLine, lastLine);

    const position = new Position(targetLine, 0);
    editor.selection = new Selection(position, position);
    editor.revealRange(new Range(position, position));
}

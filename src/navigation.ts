/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Position, Range, Selection, window } from "vscode";

export function navigateToPrevious(separatorLines: number[]): void {
    const editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    const currentLine = editor.selection.active.line;
    const sorted = [...separatorLines].sort((a, b) => a - b);
    const above = sorted.filter(line => line < currentLine);
    const targetLine = above.length > 0 ? above[above.length - 1] : 0;

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
    const sorted = [...separatorLines].sort((a, b) => a - b);
    const below = sorted.filter(line => line > currentLine);
    const lastLine = editor.document.lineCount - 1;
    const targetLine = below.length > 0 ? below[0] : lastLine;

    const position = new Position(targetLine, 0);
    editor.selection = new Selection(position, position);
    editor.revealRange(new Range(position, position));
}

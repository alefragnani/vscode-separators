/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { window, commands, FoldingRange, FoldingRangeKind } from "vscode";

export async function findRegions(): Promise<FoldingRange[]> {
    if (!window.activeTextEditor) {
        return [];
    }

    const foldingRanges = await commands.executeCommand(
        'vscode.executeFoldingRangeProvider',
        window.activeTextEditor.document.uri
    ) as FoldingRange[];

    if (!foldingRanges) {
        return [];
    }

    const regions: FoldingRange[] = [];
    for (const range of foldingRanges) {
        if (range.kind === FoldingRangeKind.Region) {
            regions.push(range);
        }
    }

    return regions;
}
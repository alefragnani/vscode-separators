/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { FoldingRangeKind, window, workspace } from "vscode";
import { pickFoldingRanges } from "./foldingRangesPicker";
import { DEFAULT_ENABLED_FOLDING_RANGES } from "./constants";
import { areEquivalent } from "./array";
import { getFoldingRangeKindAsKind } from "./foldingRanges";

export async function selectFoldingRanges(): Promise<boolean> {
    const selected = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("enabledFoldingRanges", DEFAULT_ENABLED_FOLDING_RANGES);
    const pick = await pickFoldingRanges(selected);

    if (!pick) {
        return false;
    }
    
    if (areEquivalent(pick, selected)) {
        return false
    }

    workspace.getConfiguration("separators").update("enabledFoldingRanges", pick);
    return true;
}

export function getEnabledFoldingRanges(): FoldingRangeKind[] {
    const foldingRanges = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("enabledFoldingRanges", DEFAULT_ENABLED_FOLDING_RANGES)
    const foldingRangesKind: FoldingRangeKind[] = [];
    foldingRanges.forEach(foldingRange => {
        foldingRangesKind.push(getFoldingRangeKindAsKind(foldingRange));
    });
    return foldingRangesKind;
}
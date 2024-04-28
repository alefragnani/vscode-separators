/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { SymbolKind, window, workspace } from "vscode";
import { areEquivalent } from "./array";
import { DEFAULT_ENABLED_SYMBOLS } from "./constants";
import { pickSymbols } from "./symbolsPicker";

export async function selectSymbols(): Promise<boolean> {
    const selected = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("enabledSymbols", DEFAULT_ENABLED_SYMBOLS);
    const pick = await pickSymbols(selected); 

    if (!pick) {
        return false;
    }
    
    if (areEquivalent(pick, selected)) {
        return false
    }
    
    workspace.getConfiguration("separators").update("enabledSymbols", pick);
    return true;
}


export function getSymbolKindAsKind(kind: string): SymbolKind {
    switch (kind) {
        case "Methods":
            return SymbolKind.Method;
        case "Functions":
            return SymbolKind.Function;
        case "Constructors":
            return SymbolKind.Constructor;
        case "Classes":
            return SymbolKind.Class;
        case "Interfaces":
            return SymbolKind.Interface;
        case "Enums":
            return SymbolKind.Enum;
        case "Namespaces":
            return SymbolKind.Namespace;
        case "Structs":
            return SymbolKind.Struct;

        default:
            return SymbolKind.Object;
    }
}

export function getEnabledSymbols(): SymbolKind[] {
    const symbols = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("enabledSymbols", DEFAULT_ENABLED_SYMBOLS)
    const symbolsKind: SymbolKind[] = [];
    symbols.forEach(symbol => {
        symbolsKind.push(getSymbolKindAsKind(symbol));
    });
    return symbolsKind;
}
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { QuickPickItem, SymbolKind, window, workspace } from "vscode";
import { areEquivalent } from "./array";
import { DEFAULT_ENABLED_SYMBOLS } from "./constants";

export async function showSelectSymbolsQuickPick(selectedSymbols: string[]): Promise<string[] > {
    const allSymbols: QuickPickItem[] = [];
    allSymbols.push({
        label: "Constructors",
        picked: selectedSymbols.includes("Constructors")
    });
    allSymbols.push({
        label: "Methods",
        picked: selectedSymbols.includes("Methods")
    });
    allSymbols.push({
        label: "Functions",
        picked: selectedSymbols.includes("Functions")
    });
    allSymbols.push({
        label: "Classes",
        picked: selectedSymbols.includes("Classes")
    });
    allSymbols.push({
        label: "Interfaces",
        picked: selectedSymbols.includes("Interfaces")
    });
    allSymbols.push({
        label: "Enums",
        picked: selectedSymbols.includes("Enums")
    });
    allSymbols.push({
        label: "Namespaces",
        picked: selectedSymbols.includes("Namespaces")
    });
    
    const picked = await window.showQuickPick(allSymbols, { 
        placeHolder: "Select which symbols should have separators", 
        canPickMany: true 
    });
    if (!picked) {
        return [];
    }

    if (picked.length === 0) {
        window.showErrorMessage("You must select at least on Symbol");
        return [];
    }

    return picked?.map(item => item.label);
}



export async function selectSymbols(): Promise<boolean> {
    const selected = workspace.getConfiguration("separators").get("enabledSymbols", DEFAULT_ENABLED_SYMBOLS);
    const pick = await showSelectSymbolsQuickPick(selected); 
    
    if (areEquivalent(pick, selected)) {
        return false
    }
    
    if (pick.length > 0) {
        workspace.getConfiguration("separators").update("enabledSymbols", pick);
        return true;
    }
    return false;
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

        default:
            return SymbolKind.Object;
    }
}

export function getEnabledSymbols(): SymbolKind[] {
    const symbols = workspace.getConfiguration("separators").get("enabledSymbols", DEFAULT_ENABLED_SYMBOLS)
    const symbolsKind: SymbolKind[] = [];
    symbols.forEach(symbol => {
        symbolsKind.push(getSymbolKindAsKind(symbol));
    });
    return symbolsKind;
}
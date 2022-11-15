/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { l10n, QuickPickItem, SymbolKind, window, workspace } from "vscode";
import { areEquivalent } from "./array";
import { DEFAULT_ENABLED_SYMBOLS } from "./constants";

interface SymbolQuickPickItem extends QuickPickItem {
    pickLabel: string;
}

export async function showSelectSymbolsQuickPick(selectedSymbols: string[]): Promise<string[] | undefined> {
    const allSymbols: SymbolQuickPickItem[] = [];
    allSymbols.push({
        label: l10n.t("Classes"),
        picked: selectedSymbols.includes("Classes"),
        pickLabel: "Classes"
    });
    allSymbols.push({
        label: l10n.t("Constructors"),
        picked: selectedSymbols.includes("Constructors"),
        pickLabel: "Constructors"
    });
    allSymbols.push({
        label: l10n.t("Enums"),
        picked: selectedSymbols.includes("Enums"),
        pickLabel: "Enums"
    });
    allSymbols.push({
        label: l10n.t("Functions"),
        picked: selectedSymbols.includes("Functions"),
        pickLabel: "Functions"
    });
    allSymbols.push({
        label: l10n.t("Interfaces"),
        picked: selectedSymbols.includes("Interfaces"),
        pickLabel: "Interfaces"
    });
    allSymbols.push({
        label: l10n.t("Methods"),
        picked: selectedSymbols.includes("Methods"),
        pickLabel: "Methods"
    });
    allSymbols.push({
        label: l10n.t("Namespaces"),
        picked: selectedSymbols.includes("Namespaces"),
        pickLabel: "Namespaces"
    });
    allSymbols.push({
        label: l10n.t("Structs"),
        picked: selectedSymbols.includes("Structs"),
        pickLabel: "Structs"
    });
    
    const picked = await window.showQuickPick(allSymbols, { 
        placeHolder: l10n.t("Select which symbols should have separators"), 
        canPickMany: true 
    });
    if (!picked) {
        return undefined;
    }

    if (picked.length === 0) {
        return [];
    }

    return picked?.map(item => item.pickLabel);
}



export async function selectSymbols(): Promise<boolean> {
    const selected = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("enabledSymbols", DEFAULT_ENABLED_SYMBOLS);
    const pick = await showSelectSymbolsQuickPick(selected); 

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
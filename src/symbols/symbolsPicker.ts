/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { QuickInputButton, QuickPickItem, ThemeIcon, l10n, window } from "vscode";
import { ThemeIcons } from "vscode-ext-codicons";
import { openSettings } from "./openSettings";

export interface SymbolQuickPickItem extends QuickPickItem {
    pickLabel: string;
}

class EditSettingsButton implements QuickInputButton {
    constructor(public iconPath: ThemeIcon, public tooltip: string) { }
}

const editSettingsButton = new EditSettingsButton(ThemeIcons.gear, l10n.t('Edit Settings'));

export async function pickSymbols(selectedSymbols: string[]): Promise<string[] | undefined> {
    const allSymbols: SymbolQuickPickItem[] = [];
    allSymbols.push({
        label: l10n.t("Classes"),
        picked: selectedSymbols.includes("Classes"),
        pickLabel: "Classes",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Constructors"),
        picked: selectedSymbols.includes("Constructors"),
        pickLabel: "Constructors",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Enums"),
        picked: selectedSymbols.includes("Enums"),
        pickLabel: "Enums",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Functions"),
        picked: selectedSymbols.includes("Functions"),
        pickLabel: "Functions",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Interfaces"),
        picked: selectedSymbols.includes("Interfaces"),
        pickLabel: "Interfaces",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Methods"),
        picked: selectedSymbols.includes("Methods"),
        pickLabel: "Methods",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Namespaces"),
        picked: selectedSymbols.includes("Namespaces"),
        pickLabel: "Namespaces",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Structs"),
        picked: selectedSymbols.includes("Structs"),
        pickLabel: "Structs",
        buttons: [editSettingsButton]
    });
    allSymbols.push({
        label: l10n.t("Properties"),
        picked: selectedSymbols.includes("Properties"),
        pickLabel: "Properties",
        buttons: [editSettingsButton]
    });

    return new Promise<string[] | undefined>((resolve, reject) => {
        const input = window.createQuickPick<SymbolQuickPickItem>();
        input.items = allSymbols;
        input.placeholder = l10n.t("Select which symbols should have separators");
        input.canSelectMany = true;
        input.selectedItems = [...allSymbols.filter(item => item.picked)];
        
        input.onDidTriggerItemButton(async (e) => {
            const item = e.item;
            openSettings(item.pickLabel);
            input.hide();
            return;
        });
        
        input.onDidAccept(() => {
            const picked = input.selectedItems;
            resolve(picked.map(item => item.pickLabel));
            input.hide();
            return;
        });
        
        input.onDidHide(() => {
            resolve(undefined);
        });
        
        input.show();
    });
}

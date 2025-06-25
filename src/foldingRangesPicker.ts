import { QuickInputButton, QuickPickItem, ThemeIcon, l10n, window } from "vscode";
import { ThemeIcons } from "vscode-ext-codicons";
import { openSettings } from "./openSettings";

export interface FoldingRangeQuickPickItem extends QuickPickItem {
    pickLabel: string;
}

class EditSettingsButton implements QuickInputButton {
    constructor(public iconPath: ThemeIcon, public tooltip: string) { }
}

const editSettingsButton = new EditSettingsButton(ThemeIcons.gear, l10n.t('Edit Settings'));

export async function pickFoldingRanges(selectedKinds: string[]): Promise<string[] | undefined> {
    const allKinds: FoldingRangeQuickPickItem[] = [];
    allKinds.push({
        label: l10n.t("Comments"),
        picked: selectedKinds.includes("Comments"),
        pickLabel: "Comments",
        buttons: [editSettingsButton]
    });
    allKinds.push({
        label: l10n.t("Imports"),
        picked: selectedKinds.includes("Imports"),
        pickLabel: "Imports",
        buttons: [editSettingsButton]
    });
    allKinds.push({
        label: l10n.t("Regions"),
        picked: selectedKinds.includes("Regions"),
        pickLabel: "Regions",
        buttons: [editSettingsButton]
    });

    return new Promise<string[] | undefined>((resolve, reject) => {
        const input = window.createQuickPick<FoldingRangeQuickPickItem>();
        input.items = allKinds;
        input.placeholder = l10n.t("Select which folding ranges should have separators");
        input.canSelectMany = true;
        input.selectedItems = [...allKinds.filter(item => item.picked)];
        
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

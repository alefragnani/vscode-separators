import { QuickPickItem, window } from "vscode";

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
    
    const picked = await window.showQuickPick(allSymbols, { canPickMany: true });
    console.log(picked);
    if (!picked || picked.length === 0) {
        window.showErrorMessage("Select at least one symbol");
        return [];
    }

    return picked?.map(item => item.label);
}
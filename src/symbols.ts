import { commands, SymbolInformation, SymbolKind, window } from "vscode";

export async function findMethods(): Promise<SymbolInformation[] | undefined> {
  if (!window.activeTextEditor) {
    return [];
  }

  const docSymbols = await commands.executeCommand(
      'vscode.executeDocumentSymbolProvider',
      window.activeTextEditor.document.uri
    ) as SymbolInformation[];
  
  const docSymbolsFunctionsMethods = docSymbols 
      ? docSymbols.filter(symbol => symbol.kind === SymbolKind.Function || symbol.kind === SymbolKind.Method)
      : undefined;

  return docSymbolsFunctionsMethods;
}
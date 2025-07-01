/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands, DocumentSymbol, SymbolKind, TextDocument, window, workspace } from "vscode";
import { LanguageFactory } from "../language/factory";
import { SeparatorSymbol } from "../symbol";

function getSymbolsFrom(symbol: DocumentSymbol, level: number): DocumentSymbol[] {

    const maxDepth: number = workspace.getConfiguration("separators", window.activeTextEditor?.document).get("maxDepth", 0);
    if (maxDepth !== 0 && level >= maxDepth) {
        return [ symbol ];
    }

    if (symbol.children.length === 0) {
        return [ symbol ];
    }

    level++;
    const symbols: DocumentSymbol[] = [];
    symbols.push(symbol);
    for (const children of symbol.children) {
        if (children.children.length === 0) {
            symbols.push(children);
        } else {
            symbols.push(...getSymbolsFrom(children, level));
        }
    }
    return symbols;
}

function shouldIgnore(symbol: DocumentSymbol, textDocument: TextDocument | undefined): boolean {

    if (symbol.kind !== SymbolKind.Function && symbol.kind !== SymbolKind.Property) {
        return false;
    }

    if (!workspace.getConfiguration("separators", textDocument).get("functions.ignoreCallbackInline", false)) {
        return false;
    }

    const language = LanguageFactory.getLanguage(<string>textDocument?.languageId);
    if (!language) {
        return false;
    }

    return (symbol.kind === SymbolKind.Function && language?.isCallback(symbol)) ||
           (symbol.kind === SymbolKind.Property && !language?.isGetterSetter(symbol));
}

export async function findSymbols(symbolsToFind: SymbolKind[]): Promise<DocumentSymbol[]> {
    if (!window.activeTextEditor) {
        return [];
    }

    const docSymbols = await commands.executeCommand(
        'vscode.executeDocumentSymbolProvider',
        window.activeTextEditor.document.uri
    ) as DocumentSymbol[];

    if (!docSymbols) {
        return [];
    }

    const symbols: DocumentSymbol[] = [];
    const level = 1;

    for (const symbol of docSymbols) {
        symbols.push(...getSymbolsFrom(symbol, level));
    }

    const docSymbolsFunctionsMethods = symbols
        ? symbols.filter(symbol => symbolsToFind.includes(symbol.kind) && !shouldIgnore(symbol, window.activeTextEditor?.document))
        : [];

    return docSymbolsFunctionsMethods;
}

export function symbolHasAtLeastNLines(element: SeparatorSymbol, minimunLineCount: number) {
    return minimunLineCount <= 0 || (element.endLine - element.startLine >= minimunLineCount);
}

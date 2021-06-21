/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands, DocumentSymbol, SymbolKind, TextDocument, window, workspace } from "vscode";

const CALLBACK_LANGUAGE_IDS = ["javascript", "javascripreact", "typescript", "typescriptreact"];

function getSymbolsFrom(symbol: DocumentSymbol): DocumentSymbol[] {
    if (symbol.children.length === 0) {
        return [ symbol ];
    }

    const symbols: DocumentSymbol[] = [];
    symbols.push(symbol);
    for (const children of symbol.children) {
        if (children.children.length === 0) {
            symbols.push(children);
        } else {
            symbols.push(...getSymbolsFrom(children));
        }
    }
    return symbols;
}

function shouldIgnore(symbol: DocumentSymbol, textDocument: TextDocument | undefined): boolean {

    if (symbol.kind !== SymbolKind.Function) {
        return false;
    }

    if (!workspace.getConfiguration("separators", textDocument).get("functions.ignoreCallbackInline", false)) {
        return false;
    }

    return CALLBACK_LANGUAGE_IDS.includes(<string>textDocument?.languageId) &&
        symbol.name.endsWith(' callback');
}

export async function findSymbols(symbolsToFind: SymbolKind[]): Promise<DocumentSymbol[] | undefined> {
    if (!window.activeTextEditor) {
        return [];
    }

    const docSymbols = await commands.executeCommand(
        'vscode.executeDocumentSymbolProvider',
        window.activeTextEditor.document.uri
    ) as DocumentSymbol[];

    if (!docSymbols) {
        return undefined;
    }

    const symbols: DocumentSymbol[] = [];

    for (const symbol of docSymbols) {
        symbols.push(...getSymbolsFrom(symbol));
    }

    const docSymbolsFunctionsMethods = symbols
        ? symbols.filter(symbol => symbolsToFind.includes(symbol.kind) && !shouldIgnore(symbol, window.activeTextEditor?.document))
        : undefined;

    return docSymbolsFunctionsMethods;
}
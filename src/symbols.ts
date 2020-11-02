/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands, DocumentSymbol, SymbolKind, window, workspace } from "vscode";

function getSymbolKindAsString(kind: SymbolKind): string {
    switch (kind) {
        case SymbolKind.Method:
            return "Method";
        case SymbolKind.Function:
            return "Function";
        case SymbolKind.Constructor:
            return "Constructor";

        default:
            return "";
    }
}

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

export async function findMethods(): Promise<DocumentSymbol[] | undefined> {
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

    let symbols: DocumentSymbol[] = [];

    for (const symbol of docSymbols) {
        symbols.push(...getSymbolsFrom(symbol));
    }

    const kinds = workspace.getConfiguration("separators").get("methods.supportedKinds", [ "Method", "Function", "Constructor" ]);

    const docSymbolsFunctionsMethods = symbols
        ? symbols.filter(symbol => kinds.includes(getSymbolKindAsString(symbol.kind)))
        : undefined;

    return docSymbolsFunctionsMethods;
}
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands, DocumentSymbol, SymbolKind, window } from "vscode";

function getSymbolsFrom(symbol: DocumentSymbol): DocumentSymbol[] {
    if (symbol.children.length === 0) {
        return [ symbol ];
    }

    const sym: DocumentSymbol[] = [];
    sym.push(symbol);
    for (const children of symbol.children) {
        if (children.children.length === 0) {
            sym.push(children);
        } else {
            const ss = getSymbolsFrom(children);
            sym.push(...ss);
        }
    }
    return sym;
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
        const ss = getSymbolsFrom(symbol);
        symbols.push(...ss);
    }

    const docSymbolsFunctionsMethods = symbols
        ? symbols.filter(symbol =>
            symbol.kind === SymbolKind.Constructor ||
            symbol.kind === SymbolKind.Function ||
            symbol.kind === SymbolKind.Method)
        : undefined;

    return docSymbolsFunctionsMethods;
}
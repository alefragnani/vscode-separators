/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SymbolKind } from 'vscode';
import { createTextEditorDecoration, updateDecorationsInActiveEditor } from './decoration';
import { findSymbols } from './symbols';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	let timeout: NodeJS.Timer;

	const symbolsDecorationsType = new Map<string, vscode.TextEditorDecorationType>();
	symbolsDecorationsType.set("methods", createTextEditorDecoration("methods"));
	symbolsDecorationsType.set("functions", createTextEditorDecoration("functions"));
	symbolsDecorationsType.set("constructors", createTextEditorDecoration("constructors"));

	const activeEditor = vscode.window.activeTextEditor;

	let isVisible = context.workspaceState.get<boolean>('separators.visible', true);

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(updateDecorations, 100);
	}

	// Evaluate (prepare the list) and DRAW
	async function updateDecorations() {
		let symbols: vscode.DocumentSymbol[] | undefined;
		if (isVisible) { 
			symbols = await findSymbols([SymbolKind.Method, SymbolKind.Function, SymbolKind.Constructor]);
			if (!symbols) { return; }
		} else {
			symbols = [];
		}

		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Method),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("methods")!);
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Function),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("functions")!);
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Constructor),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("constructors")!);
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			updateDecorations();
		}
	}, null, context.subscriptions);

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if (cfg.affectsConfiguration("separators")) {
			symbolsDecorationsType.forEach((value) => {
				value.dispose();
			})

			symbolsDecorationsType.set("methods", createTextEditorDecoration("methods"));
			symbolsDecorationsType.set("functions", createTextEditorDecoration("functions"));
			symbolsDecorationsType.set("constructors", createTextEditorDecoration("constructors"));

            updateDecorations();
        }
	}));	
	
	function toggleVisibility() {
		isVisible = !isVisible;
		context.workspaceState.update('separators.visible', isVisible);
		updateDecorations();
	}

	vscode.commands.registerCommand("separators.toggleVisibility", () => toggleVisibility());

}

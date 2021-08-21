/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SymbolKind } from 'vscode';
import { Container } from './container';
import { createTextEditorDecoration, updateDecorationsInActiveEditor } from './decoration';
import { getEnabledSymbols, selectSymbols } from './selectSymbols';
import { findSymbols } from './symbols';
import { registerWhatsNew } from './whats-new/command';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	Container.context = context;
	
	registerWhatsNew();
	
	let timeout: NodeJS.Timer;

	const symbolsDecorationsType = new Map<string, vscode.TextEditorDecorationType>();
	symbolsDecorationsType.set("methods", createTextEditorDecoration("methods"));
	symbolsDecorationsType.set("functions", createTextEditorDecoration("functions"));
	symbolsDecorationsType.set("constructors", createTextEditorDecoration("constructors"));
	symbolsDecorationsType.set("classes", createTextEditorDecoration("classes"));
	symbolsDecorationsType.set("interfaces", createTextEditorDecoration("interfaces"));
	symbolsDecorationsType.set("enums", createTextEditorDecoration("enums"));
	symbolsDecorationsType.set("namespaces", createTextEditorDecoration("namespaces"));

	let activeEditor = vscode.window.activeTextEditor;

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
			const selectedSymbols = getEnabledSymbols(); 
			symbols = await findSymbols(selectedSymbols);
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
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Class),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("classes")!);
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Interface),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("interfaces")!);
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Enum),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("enums")!);
		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			symbols.filter(symbol => symbol.kind === SymbolKind.Namespace),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			symbolsDecorationsType.get("namespaces")!);
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			activeEditor = editor;
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (event.contentChanges.length === 0) {
			return;
		}
		
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
			symbolsDecorationsType.set("classes", createTextEditorDecoration("classes"));
			symbolsDecorationsType.set("interfaces", createTextEditorDecoration("interfaces"));
			symbolsDecorationsType.set("enums", createTextEditorDecoration("enums"));
			symbolsDecorationsType.set("namespaces", createTextEditorDecoration("namespaces"));

            updateDecorations();
        }
	}));	
	
	function toggleVisibility() {
		isVisible = !isVisible;
		context.workspaceState.update('separators.visible', isVisible);
		updateDecorations();
	}


	vscode.commands.registerCommand("separators.toggleVisibility", () => toggleVisibility());
	vscode.commands.registerCommand("separators.selectSymbols", async () => {
		if (await selectSymbols()) {
			updateDecorations();
		}});

}

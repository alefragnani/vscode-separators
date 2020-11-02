/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createTextEditorDecoration, updateDecorationsInActiveEditor } from './decoration';
import { findMethods } from './symbols';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	let timeout: NodeJS.Timer;

	let methodsDecorationType = createTextEditorDecoration(context);
	context.subscriptions.push(methodsDecorationType);

	let activeEditor = vscode.window.activeTextEditor;

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
		const methods = await findMethods();
		if (!methods) { return; }

		// methods.forEach(method => {
		// 	console.log(`METHOD: ${method.name} / ${method.range.start.line}`);
		// });

		updateDecorationsInActiveEditor(
			vscode.window.activeTextEditor,
			methods,
			methodsDecorationType);
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

}

// this method is called when your extension is deactivated
export function deactivate() { }

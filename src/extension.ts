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

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-separators" is now active!');

	let timeout: NodeJS.Timer;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('vscode-separators.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		let bookmarkDecorationType = createTextEditorDecoration(context);
		context.subscriptions.push(bookmarkDecorationType);
	
		let activeEditor = vscode.window.activeTextEditor;
	
		if (activeEditor) {
				triggerUpdateDecorations();
		}
	

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from vscode-separators!');
		// const methods = await findMethods();
		// if (!methods) {return;}

		// methods.forEach(method => {
		// 	console.log(`METHOD: ${method.name} / ${method.location.range.start.line}`);
		// });
		// vscode.window.showInformationMessage(`${methods}`);

		function triggerUpdateDecorations() {
			if (timeout) {
					clearTimeout(timeout);
			}
			timeout = setTimeout(updateDecorations, 100);
		}

		// Evaluate (prepare the list) and DRAW
		async function updateDecorations() {
			const methods = await findMethods();
			if (!methods) {return;}

			methods.forEach(method => {
				console.log(`METHOD: ${method.name} / ${method.location.range.start.line}`);
			});

				updateDecorationsInActiveEditor(
					vscode.window.activeTextEditor, 
					methods, 
					bookmarkDecorationType);
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

	// });

	// vscode.window.onDidChangeActiveTextEditor(editor => {
	// 	if (editor) {
	// 			triggerUpdateDecorations();
	// 	}
	// }, null, context.subscriptions);	

	

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

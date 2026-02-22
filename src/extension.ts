/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DEFAULT_ENABLED_SYMBOLS } from './constants';
import { Container } from './container';
import { createTextEditorDecoration, TextEditorDecorationTypePair, updateDecorationsInActiveEditor, clearAllDecorations, updateActiveDecorations } from './decoration';
import { getEnabledSymbols, getSymbolKindAsString, selectSymbols } from './symbols/selectSymbols';
import { findSymbols } from './symbols/symbols';
import { registerWhatsNew } from './whats-new/command';
import { findFoldingRanges, getFoldingRangeKindAsString } from './foldingRanges/foldingRanges';
import { SeparatorSymbol } from './symbol';
import { getEnabledFoldingRanges, selectFoldingRanges } from './foldingRanges/selectFoldingRanges';

import { navigateToPrevious, navigateToNext } from './navigation';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	Container.context = context;
	
	await registerWhatsNew();
	
	let timeout: NodeJS.Timeout;

	const symbolsDecorationsType = new Map<string, TextEditorDecorationTypePair>();
	const currentSymbolsPerKind = new Map<string, SeparatorSymbol[]>();
	createDecorations();

	let activeEditor = vscode.window.activeTextEditor;

	let isVisible = context.workspaceState.get<boolean>('separators.visible', true);
	let currentSeparatorLines: number[] = [];

	if (activeEditor) {
		Container.ruleConfig = await Container.rulesProvider.getRuleConfigForLanguage(<string>activeEditor.document?.languageId);
		triggerUpdateDecorations();
	}

    function createDecorations() {
        symbolsDecorationsType.set("methods", createTextEditorDecoration("methods"));
        symbolsDecorationsType.set("functions", createTextEditorDecoration("functions"));
        symbolsDecorationsType.set("constructors", createTextEditorDecoration("constructors"));
        symbolsDecorationsType.set("classes", createTextEditorDecoration("classes"));
        symbolsDecorationsType.set("interfaces", createTextEditorDecoration("interfaces"));
        symbolsDecorationsType.set("enums", createTextEditorDecoration("enums"));
        symbolsDecorationsType.set("namespaces", createTextEditorDecoration("namespaces"));
        symbolsDecorationsType.set("structs", createTextEditorDecoration("structs"));
        symbolsDecorationsType.set("properties", createTextEditorDecoration("properties"));
        symbolsDecorationsType.set("foldingRanges.comments", createTextEditorDecoration("foldingRanges.comments"));
        symbolsDecorationsType.set("foldingRanges.imports", createTextEditorDecoration("foldingRanges.imports"));
        symbolsDecorationsType.set("foldingRanges.regions", createTextEditorDecoration("foldingRanges.regions"));
    }

    function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(updateDecorations, 100);
	}

	// Evaluate (prepare the list) and DRAW
	async function updateDecorations() {
        // Early return when separators are not visible - clear all decorations and avoid unnecessary processing
        if (!isVisible) {
            clearAllDecorations(symbolsDecorationsType);
            currentSeparatorLines = [];
            return;
        }

        if (!activeEditor) {
            return;
        }

        const newSeparatorLines: number[] = [];
        await updateSymbolsDecorations(newSeparatorLines);
        await updateFoldingRangesDecorations(newSeparatorLines);
        await updateActiveDecorationsForCurrentCursor(activeEditor);
        currentSeparatorLines = newSeparatorLines;
    }

    async function updateSymbolsDecorations(separatorLines: number[]) {
        const selectedSymbols = getEnabledSymbols(); 
        const symbols = await findSymbols(selectedSymbols);

        const symbols2: SeparatorSymbol[] = symbols.map(symbol => {
            return {
                name: getSymbolKindAsString(symbol.kind),
                startLine: symbol.range.start.line,
                endLine: symbol.range.end.line
            };
        });

        for (const symbol of DEFAULT_ENABLED_SYMBOLS) {
            const filteredSymbols = symbols2.filter(s => s.name.toLocaleLowerCase() === symbol.toLocaleLowerCase());
            currentSymbolsPerKind.set(symbol.toLocaleLowerCase(), filteredSymbols);
            const lines = await updateDecorationsInActiveEditor(
                vscode.window.activeTextEditor,
                filteredSymbols,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                symbolsDecorationsType.get(symbol.toLocaleLowerCase())!);
            separatorLines.push(...lines);
        }
	}

    async function updateFoldingRangesDecorations(separatorLines: number[]) {
        const selectedFoldingRanges = getEnabledFoldingRanges();
        const foldingRanges = await findFoldingRanges(selectedFoldingRanges);

        const symbols: SeparatorSymbol[] = foldingRanges.map(foldingRange => {
            return {
                name: getFoldingRangeKindAsString(foldingRange.kind),
                startLine: foldingRange.start,
                endLine: foldingRange.end
            };
        });

        for (const foldingRange of selectedFoldingRanges) {
            const kindKey = `foldingRanges.${getFoldingRangeKindAsString(foldingRange).toLocaleLowerCase()}`;
            const filteredSymbols = symbols.filter(s => s.name.toLocaleLowerCase() === getFoldingRangeKindAsString(foldingRange).toLocaleLowerCase());
            currentSymbolsPerKind.set(kindKey, filteredSymbols);
            const lines = await updateDecorationsInActiveEditor(
                vscode.window.activeTextEditor,
                filteredSymbols,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                symbolsDecorationsType.get(kindKey)!
            );
            separatorLines.push(...lines);
        }
	}

	vscode.window.onDidChangeActiveTextEditor(async editor => {
		if (editor) {
			activeEditor = editor;
			Container.ruleConfig = await Container.rulesProvider.getRuleConfigForLanguage(<string>activeEditor.document?.languageId);
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

	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(async event => {
		if (!isVisible || !event.textEditor || event.selections.length === 0 || event.textEditor !== vscode.window.activeTextEditor) {
			return;
		}
		await updateActiveDecorationsForCurrentCursor(event.textEditor);
	}));

	async function updateActiveDecorationsForCurrentCursor(editor: vscode.TextEditor) {
		if (!isVisible || !editor.selections.length) {
			return;
		}
		const cursorLine = editor.selections[0].active.line;

		// Find the globally innermost symbol across all kinds so only one separator is highlighted
		let innermostKind: string | undefined;
		let innermostRange = Infinity;
		for (const [kind, symbols] of currentSymbolsPerKind) {
			for (const symbol of symbols) {
				if (cursorLine >= symbol.startLine && cursorLine <= symbol.endLine) {
					const range = symbol.endLine - symbol.startLine;
					if (range < innermostRange) {
						innermostRange = range;
						innermostKind = kind;
					}
				}
			}
		}

		// If there is no symbol under the cursor, clear all active decorations and return early
		if (!innermostKind) {
			for (const [, decorationType] of symbolsDecorationsType) {
				editor.setDecorations(decorationType.activeAbove, []);
				editor.setDecorations(decorationType.activeBelow, []);
			}
			return;
		}

		// Only run the potentially expensive updateActiveDecorations for the single innermost kind.
		// For all other kinds, clear their active decorations synchronously.
		for (const [kind, symbols] of currentSymbolsPerKind) {
			const decorationType = symbolsDecorationsType.get(kind);
			if (!decorationType) {
				continue;
			}

			if (kind === innermostKind) {
				await updateActiveDecorations(editor, symbols, decorationType, cursorLine);
			} else {
				editor.setDecorations(decorationType.activeAbove, []);
				editor.setDecorations(decorationType.activeBelow, []);
			}
		}
	}

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if (cfg.affectsConfiguration("separators")) {
			symbolsDecorationsType.forEach((value) => {
				value.above.dispose();
				value.below.dispose();
				value.activeAbove.dispose();
				value.activeBelow.dispose();
			})

			createDecorations();
            updateDecorations();
        }
	}));	
	
	function toggleVisibility() {
		isVisible = !isVisible;
		context.workspaceState.update('separators.visible', isVisible);
		updateDecorations();
	}


	context.subscriptions.push(vscode.commands.registerCommand("separators.toggleVisibility", () => toggleVisibility()));
	context.subscriptions.push(vscode.commands.registerCommand("separators.selectSymbols", async () => {
		if (await selectSymbols()) {
			updateDecorations();
		}}));

	context.subscriptions.push(vscode.commands.registerCommand("separators.selectFoldingRanges", async () => {
		if (await selectFoldingRanges()) {
			updateDecorations();
		}}));

	context.subscriptions.push(vscode.commands.registerCommand("separators.navigateToPrevious", () => navigateToPrevious(currentSeparatorLines)));
	context.subscriptions.push(vscode.commands.registerCommand("separators.navigateToNext", () => navigateToNext(currentSeparatorLines)));

}

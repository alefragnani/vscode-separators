/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DEFAULT_ENABLED_FOLDING_RANGES, DEFAULT_ENABLED_SYMBOLS } from './constants';
import { Container } from './container';
import { createTextEditorDecoration, TextEditorDecorationTypePair, updateDecorationsInActiveEditor } from './decoration';
import { getEnabledSymbols, getSymbolKindAsString, selectSymbols } from './symbols/selectSymbols';
import { findSymbols } from './symbols/symbols';
import { registerWhatsNew } from './whats-new/command';
import { findFoldingRanges, getFoldingRangeKindAsString } from './foldingRanges/foldingRanges';
import { SeparatorSymbol } from './symbol';
import { getEnabledFoldingRanges, selectFoldingRanges } from './foldingRanges/selectFoldingRanges';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	Container.context = context;
	
	await registerWhatsNew();
	
	let timeout: NodeJS.Timer;

	const symbolsDecorationsType = new Map<string, TextEditorDecorationTypePair>();
	createDecorations();

	let activeEditor = vscode.window.activeTextEditor;

	let isVisible = context.workspaceState.get<boolean>('separators.visible', true);

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
        await updateSymbolsDecorations();
        await updateFoldingRangesDecorations();
    }

    async function updateSymbolsDecorations() {
		let symbols: vscode.DocumentSymbol[] = [];
		if (isVisible) {
			const selectedSymbols = getEnabledSymbols(); 
			symbols = await findSymbols(selectedSymbols);
		} else {
			symbols = [];
		}

        const symbols2: SeparatorSymbol[] = symbols.map(symbol => {
			return {
				name: getSymbolKindAsString(symbol.kind),
				startLine: symbol.range.start.line,
				endLine: symbol.range.end.line
			};
		});
        console.log(`Found ${symbols2.length} symbols.`);

        for (const symbol of DEFAULT_ENABLED_SYMBOLS) {
            await updateDecorationsInActiveEditor(
                vscode.window.activeTextEditor,
                symbols2.filter(s => s.name.toLocaleLowerCase() === symbol.toLocaleLowerCase()),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                symbolsDecorationsType.get(symbol.toLocaleLowerCase())!);
        }
	}

    async function updateFoldingRangesDecorations() {
        let foldingRanges: vscode.FoldingRange[] = [];
        if (isVisible) {
            const selectedFoldingRanges = getEnabledFoldingRanges()
            foldingRanges = await findFoldingRanges(selectedFoldingRanges);
        } else {
            foldingRanges = [];
        }

		const symbols: SeparatorSymbol[] = foldingRanges.map(foldingRange => {
			return {
				name: getFoldingRangeKindAsString(foldingRange.kind),
				startLine: foldingRange.start,
				endLine: foldingRange.end
			};
		}); 
		console.log(`Found ${symbols.length} folding ranges.`);

        for (const foldingRange of DEFAULT_ENABLED_FOLDING_RANGES) {
            await updateDecorationsInActiveEditor(
                vscode.window.activeTextEditor,
                symbols.filter(s => s.name.toLocaleLowerCase() === foldingRange.toLocaleLowerCase()),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                symbolsDecorationsType.get(`foldingRanges.${foldingRange.toLocaleLowerCase()}`)!
            );
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

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if (cfg.affectsConfiguration("separators")) {
			symbolsDecorationsType.forEach((value) => {
				value.above.dispose();
				value.below.dispose();
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


	vscode.commands.registerCommand("separators.toggleVisibility", () => toggleVisibility());
	vscode.commands.registerCommand("separators.selectSymbols", async () => {
		if (await selectSymbols()) {
			updateDecorations();
		}});

    vscode.commands.registerCommand("separators.selectFoldingRanges", async () => {
        if (await selectFoldingRanges()) {
            updateDecorations();
        }});

}

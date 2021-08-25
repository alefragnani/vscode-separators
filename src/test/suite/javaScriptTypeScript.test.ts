import * as assert from 'assert';
import { DocumentSymbol, Position, Range, SymbolKind } from 'vscode';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { Language } from '../../language/language';
import { JavaScriptTypeScriptLanguage } from '../../language/javaScriptTypeScript';

suite('JavaScriptTypeScript Test Suite', () => {
	let javaScriptTypeScript: Language;

	suiteSetup(() => {
		javaScriptTypeScript = new JavaScriptTypeScriptLanguage();
	});

	test('regular functions are not Callback', () => {
        const regularFunction = new DocumentSymbol("getBorderColor", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
		assert.strictEqual(javaScriptTypeScript.isCallback(regularFunction), false);
	});

	test('constructors are not Callback', () => {
        const constructor = new DocumentSymbol("constructor", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
		assert.strictEqual(javaScriptTypeScript.isCallback(constructor), false);
	});

	test('Callback functions are recognized', () => {
        const validCallbackStrict = new DocumentSymbol("symbols.filter() callback", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
        const validCallbackLonger = new DocumentSymbol("vscode.commands.registerCommand(\"separators.toggleVisibility\") callback", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
		assert.strictEqual(javaScriptTypeScript.isCallback(validCallbackStrict), true);
		assert.strictEqual(javaScriptTypeScript.isCallback(validCallbackLonger), true);
	});

});

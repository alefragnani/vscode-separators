import * as assert from 'assert';
import { DocumentSymbol, Position, Range, SymbolKind } from 'vscode';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { Language } from '../../language/language';
import { LuaLanguage } from '../../language/lua';

suite('Lua Test Suite', () => {
	let lua: Language;

	suiteSetup(() => {
		lua = new LuaLanguage();
	});

	test('regular functions are not Callback', () => {
        const regularFunction = new DocumentSymbol("testFunction", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
        assert.strictEqual(lua.isCallback(regularFunction), false);
	});

    test('Anonymous functions are not Callback', () => {
        const anonymousFunction = new DocumentSymbol("<Anonymous>", "", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
		assert.strictEqual(lua.isCallback(anonymousFunction), false);
	});

	test('Callback functions are recognized', () => {
        const validCallbackStrict = new DocumentSymbol("<Anonymous>", "-> function", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
        const validCallbackLonger = new DocumentSymbol("<Anonymous>", "l.reduce -> function (a, v)", SymbolKind.Function, 
            new Range(new Position(0, 0), new Position(10, 10)), 
            new Range(new Position(0, 0), new Position(10, 10)));
		assert.strictEqual(lua.isCallback(validCallbackStrict), true);
		assert.strictEqual(lua.isCallback(validCallbackLonger), true);
	});

});

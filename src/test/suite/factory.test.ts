import * as assert from 'assert';
import { JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS, LUA_LANGUAGE_IDS } from '../../constants';
import { LanguageFactory } from "../../language/factory";
import { JavaScriptTypeScriptLanguage } from '../../language/javaScriptTypeScript';
import { Language } from '../../language/language';
import { LuaLanguage } from '../../language/lua';

suite('Factory Test Suite', () => {

    test('does not return a Language if no language is provided', () => {
        const language = LanguageFactory.getLanguage("");

        assert.strictEqual(language, undefined);
    });

    test('does not return a Language if language is not supported', () => {
        const language = LanguageFactory.getLanguage("pascal");

        assert.strictEqual(language, undefined);
    });
    
    test('recognizes all JavaScriptTypeScript language Id', () => {
        
        const languages: Array<Language | undefined> = [];
        JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS.forEach(languageId => {
            const language = LanguageFactory.getLanguage(languageId);
            if (language) {
                languages.push(language);
            }
        });
        
        assert.strictEqual(languages.length, JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS.length);
    });

    test('recognizes all Lua language Id', () => {

        const languages: Array<Language | undefined> = [];
        LUA_LANGUAGE_IDS.forEach(languageId => {
            const language = LanguageFactory.getLanguage(languageId);
            if (language) {
                languages.push(language);
            }
        });

        assert.strictEqual(languages.length, LUA_LANGUAGE_IDS.length);
    });

    test('return a JavaScriptTypeScript Language', () => {
        const language = LanguageFactory.getLanguage(JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS[0]);

        assert.ok(language instanceof JavaScriptTypeScriptLanguage);
    });
    
    test('return a Lua Language', () => {
        const language = LanguageFactory.getLanguage(LUA_LANGUAGE_IDS[0]);

        assert.ok(language instanceof LuaLanguage);
    });
});
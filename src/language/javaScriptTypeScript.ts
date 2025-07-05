/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";
import { Language } from "./language";

export class JavaScriptTypeScriptLanguage implements Language {
    
    isCallback(symbol: DocumentSymbol): boolean {
        return symbol.name.endsWith(' callback');
    }

    isGetterSetter(symbol: DocumentSymbol): boolean {
        return symbol.name.startsWith('(get) ') || symbol.name.startsWith('(set) ');
    }
}

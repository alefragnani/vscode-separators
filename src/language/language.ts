/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";

export interface Language {
    isCallback(symbol: DocumentSymbol): boolean;
    isGetterSetter(symbol: DocumentSymbol): boolean;
}

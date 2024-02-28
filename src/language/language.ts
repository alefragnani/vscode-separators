/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";

export interface Language {
    isMultiLineCommentStart(lineText: string): boolean;
    isMultiLineCommentEnd(lineText: string): boolean;
    isSingleLineComment(lineText: string): boolean;
    supportsComments(): boolean;
    isCallback(symbol: DocumentSymbol): boolean;
}

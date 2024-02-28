/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol } from "vscode";

export interface Language {
    isMultiLineCommentStart(lineText: string): boolean;
    isMultiLineCommentEnd(lineText: string | undefined): boolean;
    isSingleLineComment(lineText: string | undefined): boolean;
    supportsComments(): boolean;
    isCallback(symbol: DocumentSymbol): boolean;
}

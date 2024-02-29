/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, workspace } from "vscode";
import { Language } from "./language";

export class GenericLanguage implements Language {
    
    isMultiLineCommentStart(lineText: string): boolean {
        const config = workspace.getConfiguration('separators.aboveComments').get<string>('multiLineCommentStartRegex', "^\\s*/*");
        const multiLineCommentStartRegex = new RegExp(config);
        return multiLineCommentStartRegex.test(lineText);
    }

    isMultiLineCommentEnd(lineText: string): boolean {
        const config = workspace.getConfiguration('separators.aboveComments').get<string>('multiLineCommentEndRegex', "\\*\\/\\s*$");
        const multiLineCommentEndRegex = new RegExp(config);
        return multiLineCommentEndRegex.test(lineText);
    }

    isSingleLineComment(lineText: string): boolean {
        const config = workspace.getConfiguration('separators.aboveComments').get<string>('singleLineCommentRegex', "^\\s*//");
        const singleLineCommentRegex = new RegExp(config);
        return singleLineCommentRegex.test(lineText);
    }

    supportsComments(): boolean {
        return true;
    }

    isCallback(symbol: DocumentSymbol): boolean {
        return false;
    }
}
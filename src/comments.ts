/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, TextEditor, workspace } from "vscode";
import { RegexComment } from "./comments/regexComment";
import { Container } from "./container";

export async function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol): Promise<number> {

    const isEnabled = workspace.getConfiguration('separators.aboveComments').get<boolean>('enabled', false);
    if (!isEnabled) {
        return documentSymbol.range.start.line;
    }

    if (Container.ruleConfig) {
        const regexComment = new RegexComment(Container.ruleConfig);
        return regexComment.shiftTopLineAboveComment(activeEditor, documentSymbol);
    }

    return documentSymbol.range.start.line;
}


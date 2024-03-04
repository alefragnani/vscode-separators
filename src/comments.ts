/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, TextEditor, workspace } from "vscode";
import { RegexComment } from "./comments/regexComment";
import { Container } from "./container";
import { Location } from "./constants";

export async function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol, documentSymbolAbove: DocumentSymbol): Promise<number> {

    const isEnabled = workspace.getConfiguration("separators").get<string>("location", Location.aboveTheSymbol) === Location.aboveTheComment;
    if (!isEnabled) {
        return documentSymbol.range.start.line;
    }

    if (Container.ruleConfig) {
        const regexComment = new RegexComment(Container.ruleConfig);
        return regexComment.shiftTopLineAboveComment(activeEditor, documentSymbol, documentSymbolAbove);
    }

    return documentSymbol.range.start.line;
}


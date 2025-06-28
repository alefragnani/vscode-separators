/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { TextEditor, workspace } from "vscode";
import { RegexComment } from "./regexComment";
import { Container } from "../container";
import { Location } from "../symbols/location";
import { SeparatorSymbol } from "../symbol";

export async function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: SeparatorSymbol, documentSymbolAbove: SeparatorSymbol): Promise<number> {

    const isEnabled = workspace.getConfiguration("separators").get<string>("location", Location.aboveTheSymbol) === Location.aboveTheComment;
    if (!isEnabled) {
        return documentSymbol.startLine;
    }

    if (Container.ruleConfig) {
        const regexComment = new RegexComment(Container.ruleConfig);
        return regexComment.shiftTopLineAboveComment(activeEditor, documentSymbol, documentSymbolAbove);
    }

    return documentSymbol.startLine;
}


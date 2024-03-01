/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { DocumentSymbol, TextEditor, workspace } from "vscode";
import { RulesProvider } from "./comments/rulesProvider";
import { RegexComment } from "./comments/regexComment";

export async function shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol): Promise<number> {

    const isEnabled = workspace.getConfiguration('separators.aboveComments').get<boolean>('enabled', false);
    if (!isEnabled) {
        return documentSymbol.range.start.line;
    }

    const ruleProvider = new RulesProvider();
    const ruleConfig = await ruleProvider.getRuleConfigForLanguage(<string>activeEditor.document?.languageId);
    if (ruleConfig) {
        const regexComment = new RegexComment(ruleConfig);
        return regexComment.shiftTopLineAboveComment(activeEditor, documentSymbol);
    }

    return documentSymbol.range.start.line;
}


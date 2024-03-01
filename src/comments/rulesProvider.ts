/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ExtensionContext, Uri, workspace } from "vscode";
import { RuleConfig } from "./config";
import { Container } from "../container";

const textDecoder = new TextDecoder('utf8');

export class RulesProvider {

    private _builtinRules: Thenable<RuleConfig[]>;
    private _userRules: RuleConfig[];

    constructor(context: ExtensionContext) {
        this._builtinRules = workspace.fs.readFile(Uri.joinPath(context.extensionUri, './rules.json')).then(bytes => JSON.parse(textDecoder.decode(bytes)));        
        this._userRules = workspace.getConfiguration("separators.aboveComments").get<RuleConfig[]>("rules", []);

        context.subscriptions.push(workspace.onDidChangeConfiguration(cfg => {
            if (cfg.affectsConfiguration("separators.aboveComments.rules")) {
                this._userRules = workspace.getConfiguration("separators.aboveComments").get<RuleConfig[]>("rules", []);
            }
        }));
    }
    
    public async getRuleConfigForLanguage(languageId: string): Promise<RuleConfig> {
        const rules = await this._builtinRules;
        rules.push(...this._userRules);

        return rules.find(c => c.languageIds.includes(languageId));
    }
}
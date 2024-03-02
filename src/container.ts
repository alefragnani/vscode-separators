/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ExtensionContext } from "vscode";
import { RulesProvider } from "./comments/rulesProvider";
import { RuleConfig } from "./comments/config";

export class Container {
    private static _extContext: ExtensionContext;
    private static _ruleConfig: RuleConfig;
  
    public static get context(): ExtensionContext {
      return this._extContext;
    }
  
    public static set context(ec: ExtensionContext) {
      this._extContext = ec;
    }

    private static _rulesProvider: RulesProvider;
    static get rulesProvider() {
        if (!this._rulesProvider) {
            this._rulesProvider = new RulesProvider(this.context);
        }

        return this._rulesProvider;
    }

    public static get ruleConfig(): RuleConfig {
      return this._ruleConfig;
    }

    public static set ruleConfig(config: RuleConfig) {
      this._ruleConfig = config;
    }
  }
  
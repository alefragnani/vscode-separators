/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands } from "vscode";

export function openSettings(symbol: string) {
    commands.executeCommand("workbench.action.openSettings", `separators.${symbol.toLocaleLowerCase()}`);
}

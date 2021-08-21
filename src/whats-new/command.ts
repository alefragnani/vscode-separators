/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands } from "vscode";
import { WhatsNewManager } from "../../vscode-whats-new/src/Manager";
import { Container } from "../container";
import { SeparatorsContentProvider, SeparatorsSocialMediaProvider } from "./contentProvider";

export function registerWhatsNew() {
    const provider = new SeparatorsContentProvider();
    const viewer = new WhatsNewManager(Container.context)
                        .registerContentProvider("alefragnani", "separators", provider)
                        .registerSocialMediaProvider(new SeparatorsSocialMediaProvider());
    viewer.showPageInActivation();
    Container.context.subscriptions.push(commands.registerCommand("separators.whatsNew", () => viewer.showPage()));
    Container.context.subscriptions.push(commands.registerCommand("_separators.whatsNew#contextMenu", () => viewer.showPage()));
}

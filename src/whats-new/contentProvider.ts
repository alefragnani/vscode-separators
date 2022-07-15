/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { 
    ChangeLogItem, 
    ChangeLogKind, 
    ContentProvider, 
    Header, 
    Image, 
    IssueKind, 
    SupportChannel,
    SocialMediaProvider} from "../../vscode-whats-new/src/ContentProvider";

export class SeparatorsContentProvider implements ContentProvider {

    public provideHeader(logoUrl: string): Header {
        return <Header> {logo: <Image> {src: logoUrl, height: 50, width: 50}, 
            message: `<b>Separators</b> adds a customizable line on top of each symbol in your source code, improving its readability, becoming easier to identify where you are and what you are looking for`};
    }

    public provideChangeLog(): ChangeLogItem[] {
        const changeLog: ChangeLogItem[] = [];

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "2.4.0", releaseDate: "March 2022" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Add <b>Web</b> support",
                id: 54,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Support Settings Categories API",
                id: 58,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Add CONTRIBUTING documentation",
                id: 57,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Bump devDependencies",
                id: 59,
                kind: IssueKind.Issue
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "2.3.0", releaseDate: "August 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Add support to <b>Lua</b> language in <b>ignoreCallbackInline</b> setting",
                id: 50,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Add separators for <b>Struct</b> symbol",
                id: 46,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: "License Update"
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "2.2.0", releaseDate: "June 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "New setting to configure <b>depth</b>/<b>level</b> of separators rendered",
                id: 24,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Language support documentation",
                id: 32,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "New setting to ignore <b>callback</b>/<b>inline</b> functions",
                id: 33,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.CHANGED,
            detail: {
                message: "Make <b>separators.enabledSymbols</b> setting customizable per language",
                id: 18,
                kind: IssueKind.Issue
            }
        });

        changeLog.push({ kind: ChangeLogKind.VERSION, detail: { releaseNumber: "2.1.0", releaseDate: "May 2021" } });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Virtual Workspaces</b>",
                id: 27,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.NEW,
            detail: {
                message: "Support <b>Workspace Trust</b>",
                id: 26,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Do not show welcome message if installed by Settings Sync",
                id: 29,
                kind: IssueKind.Issue
            }
        });
        changeLog.push({
            kind: ChangeLogKind.INTERNAL,
            detail: {
                message: "Security Alert: ini",
                id: 20,
                kind: IssueKind.PR,
                kudos: "dependabot"
            }
        });

        return changeLog;
    }

    public provideSupportChannels(): SupportChannel[] {
        const supportChannels: SupportChannel[] = [];
        supportChannels.push({
            title: "Become a sponsor on GitHub",
            link: "https://www.github.com/sponsors/alefragnani",
            message: "Become a Sponsor"
        });
        supportChannels.push({
            title: "Donate via PayPal",
            link: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted",
            message: "Donate via PayPal"
        });
        return supportChannels;
    }
}

export class SeparatorsSocialMediaProvider implements SocialMediaProvider {
    public provideSocialMedias() {
        return [{
            title: "Follow me on Twitter",
            link: "https://www.twitter.com/alefragnani"
        }];
    }
}

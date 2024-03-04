/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

export const DEFAULT_ENABLED_SYMBOLS = ["Classes", "Constructors", "Enums", "Functions", "Interfaces", "Methods", "Namespaces", "Structs"];

export const DEFAULT_GREENISH_COLOR = "#65EAB9";

export const JAVASCRIPT_TYPESCRIPT_LANGUAGE_IDS = ["javascript", "javascripreact", "typescript", "typescriptreact"];

export const LUA_LANGUAGE_IDS = ["lua"];

export enum Location {
    aboveTheSymbol = "aboveTheSymbol",
    aboveTheComment = "aboveTheComment",
    belowTheSymbol = "belowTheSymbol",
    surroundingTheSymbol = "surroundingTheSymbol"
}

export function shouldHaveSeparatorAbove(location: string): boolean {
    return location === Location.aboveTheSymbol || location === Location.aboveTheComment || location === Location.surroundingTheSymbol;
}

export function shouldHaveSeparatorBelow(location: string): boolean {
    return location === Location.belowTheSymbol || location === Location.surroundingTheSymbol;
}
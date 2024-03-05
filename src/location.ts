/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

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
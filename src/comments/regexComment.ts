/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { TextEditor, DocumentSymbol } from "vscode";
import { RuleConfig } from "./config";

export class RegexComment {
    private _config: RuleConfig;
    private _currentMultilineRule = 0;
    
   constructor(config: RuleConfig) {
       this._config = config       
    }
    
    // TODO [OK]: Multiline comments on the same line are not supported
    // TODO: Multiline comments with empty lines are not supported
    public shiftTopLineAboveComment(activeEditor: TextEditor, documentSymbol: DocumentSymbol): number {
        let lineAbove = documentSymbol.range.start.line - 1;
        let lineTextAbove = getLineTextAbove(activeEditor, lineAbove);

        if (lineAbove < 0) return 0;
        
        if (this.isSingleLineComment(lineTextAbove)) {
            while (this.isSingleLineComment(lineTextAbove)) {
                lineAbove--;
                lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
            }
            return lineAbove + 1;
        }
        
        if (this.isMultiLineCommentEnd(lineTextAbove)) {
            if (this.isMultiLineCommentStart(lineTextAbove)) {
                return lineAbove;
            }
            
            lineAbove--;
            lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
            let didFoundMultiLineCommentStart = this.isMultiLineCommentStart(lineTextAbove);
            while (!didFoundMultiLineCommentStart) {
                lineAbove--;
                lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
                
                if (lineTextAbove === undefined) break;
                
                didFoundMultiLineCommentStart = this.isMultiLineCommentStart(lineTextAbove);
            } 
            
            if (!didFoundMultiLineCommentStart) {
                return documentSymbol.range.start.line;
            }

            return lineAbove;   
        }
        
        return lineAbove + 1;
    }
    
    
    private isSingleLineComment(lineText: string): boolean {
        const singleLineCommentRegex = new RegExp(this._config.rules.singleLine);
        return singleLineCommentRegex.test(lineText);
    }
    
    
    private isMultiLineCommentStart(lineText: string): boolean {
        const multiLineCommentStartRegex = new RegExp(this._config.rules.multiLine[this._currentMultilineRule].start);
        return multiLineCommentStartRegex.test(lineText);
    }
    
    private isMultiLineCommentEnd(lineText: string): boolean {
        let isEndOfMultilineComment = false;

        for (let index = 0; index < this._config.rules.multiLine.length; index++) {
            const multiLineCommentEndRegex = new RegExp(this._config.rules.multiLine[index].end);
            isEndOfMultilineComment = multiLineCommentEndRegex.test(lineText);
            if (isEndOfMultilineComment) {
                this._currentMultilineRule = index;
                break;
            }
        }

        return isEndOfMultilineComment;
    }
}

function getLineTextAbove(activeEditor: TextEditor, lineAbove: number): string | undefined {
    if (lineAbove < 0) {
        return undefined;
    }
    return activeEditor.document.lineAt(lineAbove).text;
}


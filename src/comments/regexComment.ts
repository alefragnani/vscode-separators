/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the GPLv3 License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { TextEditor, DocumentSymbol } from "vscode";
import { RuleConfig } from "./config";

export class RegexComment {
    private _config: RuleConfig;
    
   constructor(config: RuleConfig) {
       this._config = config       
    }
    
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
            lineAbove--;
            lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
            let didFoundMultiLineCommentStart = this.isMultiLineCommentStart(lineTextAbove);
            while (!didFoundMultiLineCommentStart) {
                lineAbove--;
                lineTextAbove = getLineTextAbove(activeEditor, lineAbove);
                
                if (!lineTextAbove) break;
                
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
        const multiLineCommentStartRegex = new RegExp(this._config.rules.multiLine.start);
        return multiLineCommentStartRegex.test(lineText);
    }
    
    private isMultiLineCommentEnd(lineText: string): boolean {
        const multiLineCommentStartRegex = new RegExp(this._config.rules.multiLine.end);
        return multiLineCommentStartRegex.test(lineText);
    }
}

function getLineTextAbove(activeEditor: TextEditor, lineAbove: number): string | undefined {
    if (lineAbove < 0) {
        return undefined;
    }
    return activeEditor.document.lineAt(lineAbove).text;
}


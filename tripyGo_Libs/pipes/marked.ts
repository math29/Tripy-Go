/// <reference path="../../../../../typings/marked/marked.d.ts" />

import {Pipe} from 'angular2/core';
import * as marked from 'marked';
/*
 * parse markdown text to HTML
 * Usage:
 *   text | markdown
 * Example:
 *   # Titre1 |  markdown
*/

@Pipe({
  name: "markdown"
})
export class MarkdownPipe{
  transform(value, args){
    return marked.parse(value);
  }
}

/// <reference path="../../../../typings/marked/marked.d.ts" />

import {Pipe} from 'angular2/core';
import * as marked from 'marked';
/*
 * Filter log items which contains query
 * Usage:
 *   value | filterLog:query
 * Example:
 *   {{ 2 |  filterLog:DISCONNECTING}}
*/

@Pipe({
  name: "markdown"
})
export class MarkdownPipe{
  transform(value, args){
    return marked.parse(value);
  }
}

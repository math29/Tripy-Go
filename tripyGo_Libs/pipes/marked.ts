import {Pipe} from '@angular/core';

declare var marked;
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

import {Pipe} from '@angular/core';

/*
 * Filter log items which contains query
 * Usage:
 *   value | filterLog:query
 * Example:
 *   {{ 2 |  filterLog:DISCONNECTING}}
*/

@Pipe({
  name: "selectLevel"
})
export class SelectLevelPipe{
  transform(value, args){
    if(args == 'All'){
      return value;
    }
    return value.filter((item)=> item.level == args);
  }
}

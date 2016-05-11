import {Pipe} from 'angular2/core';

/*
 * Filter log items which contains query
 * Usage:
 *   value | filterLog:query
 * Example:
 *   {{ 2 |  filterLog:DISCONNECTING}}
*/

@Pipe({
  name: "filterLog"
})
export class FilterLogPipe{
  transform(value, args){
    return value.filter((item)=> item.message.indexOf(args)>=0);
  }
}

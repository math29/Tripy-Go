import {Pipe} from 'angular2/core';

@Pipe({
  name: "filter"
})

export class FilterPipe{
  transform(value, args){
    return value.filter((item)=> item.message.indexOf(args)>=0);
  }
}

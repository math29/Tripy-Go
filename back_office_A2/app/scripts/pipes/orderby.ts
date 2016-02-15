import {Pipe} from 'angular2/core';

@Pipe({
  name: "orderBy"
})

export class OrderByPipe{
  transform(value){
    return value;
  }
}

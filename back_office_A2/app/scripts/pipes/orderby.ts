import {Pipe} from 'angular2/core';

@Pipe({
  name: "orderBy"
})

export class OrderByPipe{
  transform(array: Array<string>, args: string): Array<string> {
    if (typeof args[0] === "undefined") {
      console.log('return');
      return array;
    }

    let direction   = args[0][0];
    let column      = args[0].slice(1);

    array.sort((a: any, b: any) => {

      let left    = a[column];
      let right   = b[column];

      console.log(left);
      console.log(right);
      return (direction === "-") ? right - left : left - right;
    });
    return array;
  }
}

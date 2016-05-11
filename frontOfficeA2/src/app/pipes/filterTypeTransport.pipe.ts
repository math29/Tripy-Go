import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({ name: 'typeTransport' })
export class filterTypeTransport implements PipeTransform {
	transform(allComparators: any, args: string[]) {
		console.log(args);
		if (allComparators){
			return allComparators.filter(comparator => {
				for (let i = 0; i < comparator.type.length; i++){
					if(comparator.type[0].name == "plane"){
						return true;
					}
				}
			});
		}
  	}
}
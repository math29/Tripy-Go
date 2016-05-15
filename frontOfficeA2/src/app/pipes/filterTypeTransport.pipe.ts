import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'typeTransport'
 })
export class filterTypeTransport implements PipeTransform {
	transform(allComparators: any, args: string[]) {
		let checked = args[0];

		if (allComparators){
			// Si aucun filtre
			if (checked.length == 0) {
				return allComparators.filter(comparator => true)
			}
			
			return allComparators.filter(comparator => {
				for (let i = 0; i < comparator.type.length; i++){
					console.log(args);
					if (checked.indexOf(comparator.type[0].name) > -1) {
						return true;
					}
				}
			});
		}
  	}
}
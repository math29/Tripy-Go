import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'typeTransport'
 })
export class filterTypeTransport implements PipeTransform {
	transform(allComparators: any, args: string[]) {
		let checked = args[0];

		if (allComparators){
			// Si aucun filtre
			if(!checked) {
				return allComparators.filter(comparator => true);
			}
			if (checked.length == 0) {
				return allComparators.filter(comparator => true)
			}

			return allComparators.filter(comparator => {
				for (let i = 0; i < comparator.transport.types.length; i++){
					if (checked.indexOf(comparator.transport.types[0].name) > -1) {
						return true;
					}
				}
			});
		}
  	}
}

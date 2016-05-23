import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rangeRate'
})
export class filterRangeRate implements PipeTransform {
	transform(allComparators: any, arg1: number[], arg2: number[]) {
		console.log(arg1);
		console.log(arg2);
		if (allComparators) {
			return allComparators.filter(comparator => {
				if (comparator.ergo_rate.score >= arg1[0] && comparator.ergo_rate.score <= arg1[1]
					&& comparator.ergo_rate.score >= arg2[0] && comparator.ergo_rate.score <= arg2[1]) {
					return true;
				}
			});
		}
	}
}

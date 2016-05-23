import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rangeRate'
})
export class filterRangeRate implements PipeTransform {
	transform(allComparators: any, arg1: number[], arg2: number[]) {
		if (allComparators) {
			return allComparators.filter(comparator => {

				if (comparator.transport.ergo_rate.score >= arg1[0] && comparator.transport.ergo_rate.score <= arg1[1]
					&& comparator.transport.ergo_rate.score >= arg2[0] && comparator.transport.ergo_rate.score <= arg2[1]) {
					return true;
				}
			});
		}
	}
}

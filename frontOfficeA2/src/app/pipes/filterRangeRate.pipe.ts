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
				if (comparator.transport.ergo_rate.score >= args[0][0] && comparator.transport.ergo_rate.score <= args[0][1]
					&& comparator.transport.ergo_rate.score >= args[1][0] && comparator.transport.ergo_rate.score <= args[1][1]) {
					return true;
				}
			});
		}
	}
}

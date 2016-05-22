import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rangeRate'
})
export class filterRangeRate implements PipeTransform {
	transform(allComparators: any, args: string[]) {
		if (allComparators) {
			return allComparators.filter(comparator => {
				if (comparator.ergo_rate.score >= args[0][0] && comparator.ergo_rate.score <= args[0][1]
					&& comparator.ergo_rate.score >= args[1][0] && comparator.ergo_rate.score <= args[1][1]) {
					return true;
				}
			});
		}
	}
}

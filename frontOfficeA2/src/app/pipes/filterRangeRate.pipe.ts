import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
	name: 'rangeRate'
})
export class filterRangeRate implements PipeTransform {
	transform(allComparators: any, args: string[]) {
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

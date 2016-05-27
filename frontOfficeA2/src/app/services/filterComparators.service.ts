import {Injectable} from '@angular/core';

@Injectable()
export class FilterComparatorsService {

    exec(allComparators, ergo_rate, content_rate, checked_types, order, orderDir) {
        allComparators = this.rateFilter(allComparators, ergo_rate, content_rate);
        allComparators = this.typeFilter(allComparators, checked_types);
        allComparators = this.order(allComparators, orderDir.concat(order));
        return allComparators;
    }

    // ***************************************
    // Rate Filter
    // ***************************************
    rateFilter(allComparators, arg1, arg2){
        if (allComparators) {
            return allComparators.filter(comparator => {
                if (comparator.transport.ergo_rate.score >= arg1[0] && comparator.transport.ergo_rate.score <= arg1[1]
                    && comparator.transport.content_rate.score >= arg2[0] && comparator.transport.content_rate.score <= arg2[1]) {
                    return true;
                }
            });
        }
    }

    typeFilter(allComparators: any, checked: string[]) {
        if (allComparators) {
            // Si aucun filtre
            if (!checked || checked.length == 0) {
                return allComparators.filter(comparator => true)
            }

            return allComparators.filter(comparator => {
                for (let i = 0; i < comparator.transport.types.length; i++) {
                    if (checked.indexOf(comparator.transport.types[i].name) > -1) {
                        return true;
                    }
                }
            });
        }
    }

    static _orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    order(input: any, [config = '+']): any {
        if (!Array.isArray(input)) return input;

        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';

            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property: string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return input.sort(function(a: any, b: any) {
                    return !desc
                        ? this.OrderBy._orderByComparator(a[property], b[property])
                        : -this.OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function(a: any, b: any) {
                for (var i: number = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = !desc
                        ? this.OrderBy._orderByComparator(a[property], b[property])
                        : -this.OrderBy._orderByComparator(a[property], b[property]);

                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}

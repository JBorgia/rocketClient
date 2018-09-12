import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], filter: any): any {
    return array && Object.keys(filter).length !== 0 ? array.filter(this.resolveType(filter)) : array;
  }

  private resolveType(filter: any): any {
    switch (typeof filter) {
        case 'boolean': return value => Boolean(value) === filter;
        case 'string': return value => !filter || (value ? ('' + value).toLowerCase().indexOf(filter.toLowerCase()) !== -1 : false);
        case 'object': return value => {
          for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
              if (!value.hasOwnProperty(key) && filter[key] === null) {
                return true;
              }
              if (!value.hasOwnProperty(key) && !Object.getOwnPropertyDescriptor(Object.getPrototypeOf(value), key) ||
                  !this.resolveType(filter[key])(typeof value[key] === 'function' ? value() : value[key])) {
                    return false;
              }
            }
          }
          return true;
        };
        default: return value => !filter || filter === value;
      }
  }
}

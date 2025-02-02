import { NgModule, Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
    transform(values: any[], filter: string): any {
        if (!values || !values.length) {
            return [];
        }
        if (!filter) {
            return values;
        }

        filter = filter.toUpperCase();

        if (filter && Array.isArray(values)) {
            const keys = Object.keys(values[0]);
            return values.filter(v => v && keys.some(k => v[k].toUpperCase().indexOf(filter) >= 0));
        }
    }
}



@NgModule({
    exports: [
        SearchPipe,
    ],
    declarations: [
        SearchPipe,
    ],
  })
  export class SearchPipeModule { }

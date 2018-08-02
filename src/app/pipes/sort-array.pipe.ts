
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortArray'
  })
  export class SortArray implements PipeTransform {
    transform(value: any[], reverse?: boolean): any {
      return reverse && value ? value.reverse() : value.sort();
    }
  }

@NgModule({
    exports: [
        SortArray,
    ],
    declarations: [
      SortArray,
    ],
  })
  export class SortArrayModule { }

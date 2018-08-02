
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderObjectBy'
  })
  export class OrderObjectByPipe implements PipeTransform {
    transform(value: any[], expression: any, reverse?: boolean): any {
      return reverse && value ? this.sortObject(value, expression).reverse() : this.sortObject(value, expression);
    }
  
    private sortObject(v: any[], e: any): any {
      if (v) {
        return v.sort((a: any, b: any): number => b[e] && a[e] ? a[e] > b[e] ? 1 : -1 : !b[e] && a[e] || !a[e] && !b[e] ? -1 : 1);
      }
    }
  }

@NgModule({
    exports: [
      OrderObjectByPipe,
    ],
    declarations: [
      OrderObjectByPipe,
    ],
  })
  export class OrderObjectByPipeModule { }

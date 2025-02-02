
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderrByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {

        return records.sort(function (a, b) {
            if (a[args.property] < b[args.property]) {
                return -1 * args.direction;
            } else if (a[args.property] > b[args.property]) {
                return 1 * args.direction;
            } else {
                return 0;
            }
        });
    }
}


@NgModule({
    exports: [
        OrderrByPipe,
    ],
    declarations: [
        OrderrByPipe,
    ],
  })
  export class OrderrByPipeModule { }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args: String): any[] {
    console.log("Tranform",value,args);
    
    const sortField = args.split(',')[0];
    const sortDirection = args.split(',')[1];


    let multiplier = 1
    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value = value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }

    }

    );
    return value;
  }

}

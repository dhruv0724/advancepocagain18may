import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString:string, propName:string): any[] {
    let resultArray = [];
    if(value.length===0 || filterString ==='' || propName === ''){
      return value;
    }

    resultArray = value.filter(e=>{return e[propName].toLowerCase().startsWith(filterString.toLowerCase());});
    return resultArray;

  }

}

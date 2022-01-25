import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copyright'
})
export class CopyrightPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const year = new Date().getFullYear();
    return "© " + year + " " + value + " All Rights Reserved.";
  }

}

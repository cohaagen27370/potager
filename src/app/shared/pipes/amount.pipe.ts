import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'Amount',
  standalone: true
})
export class AmountPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Medium' : return 'Moyen';
      case 'Full': return 'Plein';
      default:
        return 'Peu';
    }
  }

}

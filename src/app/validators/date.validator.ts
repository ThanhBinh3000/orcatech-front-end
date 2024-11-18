import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export function dateValidator(control: AbstractControl): Promise<any> | Observable<any> {
  return new Promise(resolve => {
    const dateRegex = new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/([0-9]{4})$');
    const valid = dateRegex.test(control.value);
    if (!valid && control.value != '') {
      resolve({ 'invalidDate': true });
    } else {
      resolve(null);
    }
  });
}

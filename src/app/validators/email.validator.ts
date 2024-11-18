import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export function emailValidator(control: AbstractControl): Promise<any> | Observable<any> {
  return new Promise(resolve => {
    const dateRegex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
    const valid = dateRegex.test(control.value);
    if (!valid && control.value != '') {
      resolve({ 'invalidEmail': true });
    } else {
      resolve(null);
    }
  });
}

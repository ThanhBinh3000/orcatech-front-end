import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export function phoneNumberValidator(control: AbstractControl): Promise<any> | Observable<any> {
  return new Promise(resolve => {
    const strongRegex = new RegExp('^(?:\\+?84|0)(?:\\d{9,10})$');
    const valid = strongRegex.test(control.value);
    if (!valid) {
      resolve({ 'invalidPhoneNumber': true });
    } else {
      resolve(null);
    }
  });
}

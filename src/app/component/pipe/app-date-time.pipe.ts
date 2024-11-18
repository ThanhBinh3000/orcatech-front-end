import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NgDatePipe } from '@angular/common';
import {convertDateFormat} from "../../utils/date.utils";

@Pipe({
  name: 'appDateTime'
})
export class AppDateTimePipe extends NgDatePipe implements PipeTransform {

  override transform(input: any, format?: any, timezone?: any): any {
    if (!(input instanceof Date)) {
      input = convertDateFormat(input);
    }
    if (!format) {
      format = "dd/MM/yyyy HH:mm"
    }
    if (!timezone) {
      timezone = "UTC+7";
    }
    return super.transform(input, format, timezone);
  }
}

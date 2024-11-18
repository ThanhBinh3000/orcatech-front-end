import { NativeDateAdapter } from '@angular/material/core';
import moment from "moment";

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    moment.locale('vi');
    return moment(date).format('DD/MM/YYYY');
  }
}

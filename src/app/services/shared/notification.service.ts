import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private _toastr: ToastrService
  ) {
  }

  error(title: string, message: any, timeOut: number = 6000) {
    this._toastr.error(message, title, {
      timeOut: timeOut,
      closeButton: true
    });
  }

  success(title: string, message: any, timeOut: number = 3000) {
    this._toastr.success(message, title, {
      timeOut: timeOut,
      closeButton: true
    });
  }

  info(title: string, message: any, timeOut: number = 60000) {
    this._toastr.info(message, title, {
      timeOut: timeOut,
      closeButton: true
    });
  }
}

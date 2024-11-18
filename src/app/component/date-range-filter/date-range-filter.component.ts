import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";
import {DatePipe} from "@angular/common";
import {DATE_RANGE} from "../../constants/config";

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrl: './date-range-filter.component.css'
})

export class DateRangeFilterComponent implements OnInit {
  constructor(private datePipe: DatePipe) {
  }

  // @ts-ignore
  dateForm: FormGroup;
  @Input() filterType: number = 0;
  @Input() fromDateControl: string = 'fromDate';
  @Input() toDateControl: string = 'toDate';
  @Input() isToday: boolean = false;
  @Output() filterTypeChange = new EventEmitter<object>();
  @Output() fromDateChange = new EventEmitter<object>();
  @Output() toDateChange = new EventEmitter<object>();
  protected readonly DATE_RANGE = DATE_RANGE;

  ngOnInit() {
    this.initDateRanges();
  }

  onFilterTypeChange(filterType: number) {
    this.filterType = filterType;
    this.filterTypeChange.emit({
      filterType: this.filterType,
      fromDateControl: this.fromDateControl,
      toDateControl: this.toDateControl
    });
    if (filterType == DATE_RANGE.BY_DATE) {
      let formattedDate = '';
      const fromDate = this.dateForm.get('pickerFromDate')?.value;
      const toDate = this.dateForm.get('pickerToDate')?.value;
      formattedDate = this.datePipe.transform(fromDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
      this.fromDateChange.emit({
        fromDate: formattedDate,
        fromDateControl: this.fromDateControl
      });
      formattedDate = this.datePipe.transform(toDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
      this.toDateChange.emit({
        toDate: formattedDate,
        toDateControl: this.toDateControl
      });
    }
  }

  onFromDateChange(fromDate: Date) {
    const toDate = this.dateForm.get('pickerToDate')?.value;
    let formattedDate = '';
    if (toDate && fromDate > toDate) {
      this.dateForm.get('pickerFromDate')?.setValue(toDate);
      formattedDate = this.datePipe.transform(toDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
    } else {
      formattedDate = this.datePipe.transform(fromDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
    }
    this.fromDateChange.emit({
      fromDate: formattedDate,
      fromDateControl: this.fromDateControl
    });
  }

  onToDateChange(toDate: Date) {
    const fromDate = this.dateForm.get('pickerFromDate')?.value;
    let formattedDate = '';
    if (fromDate && toDate < fromDate) {
      this.dateForm.get('pickerToDate')?.setValue(fromDate);
      formattedDate = this.datePipe.transform(fromDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
    } else {
      formattedDate = this.datePipe.transform(toDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
    }
    this.toDateChange.emit({
      toDate: formattedDate,
      toDateControl: this.toDateControl
    });
  }

  initDateRanges() {
    let toDate = moment().utcOffset(420).endOf('day').toDate();
    let fromDate =
      this.isToday
        ? moment().utcOffset(420).startOf('day').toDate()
        : new Date(toDate.getFullYear(), toDate.getMonth(), 1);

    this.dateForm = new FormGroup({
      pickerFromDate: new FormControl(fromDate),
      pickerToDate: new FormControl(toDate),
    });
    this.filterTypeChange.emit({
      filterType: this.filterType,
      fromDateControl: this.fromDateControl,
      toDateControl: this.toDateControl
    });
    this.fromDateChange.emit({
      fromDate: this.datePipe.transform(fromDate, 'dd/MM/yyyy HH:mm:ss') ?? '',
      fromDateControl: this.fromDateControl
    });
    this.toDateChange.emit({
      toDate: this.datePipe.transform(toDate, 'dd/MM/yyyy HH:mm:ss') ?? '',
      toDateControl: this.toDateControl
    });
  }
}

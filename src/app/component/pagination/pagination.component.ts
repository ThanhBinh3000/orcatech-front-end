import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Input() pageSizeOptions: { label: string, value: number }[] = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50},
    {label: '100', value: 100},
    {label: '--All--', value: 9000}
  ];
  @Input() pageSizeMax: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalRecord: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  ngOnInit() {
    this.ngOnChanges
  }

  ngOnChanges() {
    if (this.pageSizeMax > 0) {
      const allOptionIndex = this.pageSizeOptions.findIndex(option => option.value === 9000);
      if (allOptionIndex !== -1) {
        this.pageSizeOptions[allOptionIndex] = {label: String(this.pageSizeMax), value: this.pageSizeMax};
      }
    }
  }

  onPageChange(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }

  onPageSizeChange($event: any) {
    this.pageSizeChange.emit($event.value);
  }

  getPages(): { pages: number[], moreLeft: boolean, moreRight: boolean } {
    const totalPagesToShow = 9; // Số trang hiển thị tối đa
    const pages: number[] = [];
    const half = Math.floor(totalPagesToShow / 2);
    let start = this.currentPage - half;
    let end = this.currentPage + half;
    if (start <= 0) {
      start = 1;
      end = totalPagesToShow;
    }
    if (end > this.totalPages) {
      end = this.totalPages;
      start = this.totalPages - totalPagesToShow + 1;
      if (start <= 0) {
        start = 1;
      }
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    let moreLeft = start > 1;
    let moreRight = end < this.totalPages;
    return {pages, moreLeft, moreRight};
  }
}

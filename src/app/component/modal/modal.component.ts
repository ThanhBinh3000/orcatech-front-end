import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public param: any,
  ) {
  }

  ngOnInit() {
  }

  confirm() {
    if (this.param && this.param.onOk) {
      this.param.onOk().then(() => {
        this.dialogRef.close();
      }).catch((error:any) => {
        console.error('Error in onOk function:', error);
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}

import {Component, Inject, Injector} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-preview-image',
  templateUrl: './modal-preview-image.component.html',
  styleUrl: './modal-preview-image.component.css'
})
export class ModalPreviewImageComponent {
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<ModalPreviewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  closeModal(){
    this.dialogRef.close();
  }
}

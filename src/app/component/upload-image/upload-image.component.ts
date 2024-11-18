import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {UploadFileService} from "../../services/file/upload-file.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent extends BaseComponent implements OnInit {
  files: File[] = [];
  isMultiFile: boolean = false;

  constructor(
    injector: Injector,
    private _service: UploadFileService,
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInput: any,
  ) {
    super(injector, _service);
    this.formGroup = this.fb.group({
      title: [],
      description: [],
      folder: [],
      file: [],
      url: [],
      size: [],
      fileName: [],
      dataType: [],
      dataId: [],
    });
  }

  onSubmit() {
    console.log(this.files)
    this.dialogRef.close(this.files);
    // Gửi hình ảnh đến backend hoặc thực hiện xử lý tùy ý
  }

  ngOnInit(): void {
    console.log(this.dataInput);
    if (this.dataInput) {
      this.isMultiFile = this.dataInput.isMulti;
    }
  }

  onSelect(event: any) {
    if (this.isMultiFile) {
      this.files.push(...event.addedFiles);
    } else {
      this.files = [];
      this.files.push(...event.addedFiles);
    }
    console.log(this.files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}

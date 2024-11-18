import {Component, Injector, Input, OnInit} from '@angular/core';
import {UploadFileService} from "../../services/file/upload-file.service";
import {BaseComponent} from "../base/base.component";
import {ModalPreviewImageComponent} from "./modal-preview-image/modal-preview-image.component";

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrl: './preview-image.component.css'
})
export class PreviewImageComponent extends BaseComponent implements OnInit {
  @Input() width: string = '0px';
  @Input() heigh: string = '0px';
  @Input() pathImage: string = '';
  imageData: any

  constructor(
    injector: Injector,
    private _service: UploadFileService,
  ) {
    super(injector, _service);
  }

  ngOnInit(): void {
    if (this.pathImage) {
      this._service.getUrl(this.pathImage).subscribe(response => {
        const blob = new Blob([response], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(blob);
      });
    }
  }

  openModalViewImg(dataImg: any){
    const dialogRef = this.dialog.open(ModalPreviewImageComponent, {
      data: dataImg,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.searchPage();
      }
    });
  }
}

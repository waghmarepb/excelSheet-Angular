import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileUploadProgress: number;

  @Output() fileUploaded = new EventEmitter();
  @Input() uploadUrl = ''; // url to upload the file
  @Input() fileLabel = ''; // label to show with the input field
  @Input() acceptFileTypes = ''; // used to restricts the file extention
  @Input() multiple = false; // used to check whether accept multiple file
  constructor(
    private httpService: HttpService,

  ) { }
  uploading = false;
  documents = [];
  ngOnInit() {
  }

  /*
   * @function onFileUpload uploads the file to provided upload url
   * @param files array of files to upload
   */
  onFileUpload(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.uploading = true;

    this.httpService.filePost(this.uploadUrl, formData)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event) {
          this.uploading = false;
          this.fileUploaded.emit(event);
        }
      });
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';

import { HttpEventType } from '@angular/common/http';

import { HttpService } from 'src/app/_shared/services/http.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  modalRef: BsModalRef;
  message = 'Default';
  public uploadUrl = '/secure/doc';
  public userData;
  public user;
  public glcData;
  public peopleData;
  public studentData;
  uploading = false;
  param = {
    page: 1,
    count: 10,
    search: ''
  };

  public excelUpload: FormGroup;
  fileUploadProgress: number;
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private modalService: BsModalService,
    private utilService: UtilsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.getInitData();
    this.excelUpload = this.fb.group({
      file: ['', Validators.required]
    });
  }
  getInitData(): void {
    this.httpService.get('/secure/dashboard').subscribe((result: any) => {
      console.log(result);
      this.userData = result.userData;
      this.glcData = result.glcData;
      this.peopleData = result.peopleData;
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  confirm(): void {
    this.modalRef.hide();

    if (this.studentData) {
      this.uploading = true;
      this.httpService.post('/secure/glc', this.studentData)
        .subscribe((event: any) => {
          this.getInitData();
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event) {
            this.uploading = false;
          }
          this.utilService.successToaster('Records added successfully', 'Success');
        }, (err) => {
          this.uploading = false;
          this.studentData = '';
          this.getInitData();
        });
    } else {
      this.utilService.errorToaster('Please insert file', 'Error');
    }

    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.studentData = '';
    this.uploading = false;
    this.modalRef.hide();
  }

  setProfilePic(event) {
    console.log('event', event);
    this.studentData = event.data;
  }

  pageChanged(page) {
    this.param.page = page;
  }

}

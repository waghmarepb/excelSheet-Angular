import { Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpService } from '../../../_shared/services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit {
  public admin: boolean = false;
  public glcForm: FormGroup;
  public updateStatus: FormGroup;
  public glcId: any;
  public documents = [];
  public data: any;
  public isGlc = true;
  public afuConfig;
  public selectedFile;
  public formData: FormData;
  public glcDate;
  public baseUrl;
  public errorMessage: boolean = true;
  public loading1: boolean = false;
  public loading2: boolean = false;
  public loadingText: string;
  user: any;
  personId: any;
  uploading: boolean = false;
  fileUploadProgress: number = 0;

  constructor(private httpService: HttpService,
    private utilService: UtilsService,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.formData = new FormData();
    this.activateRoute.paramMap.subscribe((id: any) => {
      this.glcId = id.params.id
      this.getGLCDetails(this.glcId);
    });
    this.glcForm = this._formBuilder.group({
      remark: ['', Validators.required],
      file: ['']
    })
    this.updateStatus = this._formBuilder.group({
      status: ['', Validators.required]
    });
  }

  getGLCDetails(glcId) {
    this.httpService.get(`/secure/glc/${glcId}`).subscribe((result: any) => {
      this.data = result.docs;
      if (this.data.docs) {
        this.glcDate = this.data.updatedAt;
        this.glcForm.patchValue({
          'remark': this.data.remark
        });
        this.documents = this.data.docs;
      }
      if(this.data.status !== "Pending"){
        this.updateStatus.patchValue({'status':this.data.status})
      }
    });
  }

  onFileUpload(files: File[]) {
    this.formError.file = '';
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.uploading = true;
    this.httpService.filePost('/secure/doc', formData)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event) {
          this.documents.push(event.fileInfo);
          this.uploading = false;
          this.glcForm.get('file').setValue('');
        }
      })
  }
  removeUploadedFile(index) {
    this.documents.splice(index, 1);
    if (this.documents.length <= 0) {
      this.formError.file = this.validationMessages.file.required;
    } else {
      this.formError.file = '';
    }
  }
  updateGLC() {
    this.loading1 = true;
    this.loadingText = "Loading...";
    if (this.glcForm.valid && this.documents.length > 0) {

      const newData = this.glcForm.value;
      var glc = {
        'remark': newData.remark,
        'docs': this.documents
      }
      this.httpService.put(`/secure/glc/${this.glcId}`, glc).subscribe((result: any) => {
        if (result.status == "success") {
          this.utilService.successToaster("Success", "Record updated successfully");
          this.loading1 = false;
        } else {
          this.utilService.errorToaster('Error', 'Something went wrong');
        }
      },(err)=>{
        this.loading1 = false;
      });
    } else {
      this.loading1 = false;
      var group: FormGroup = this.glcForm;
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        this.formError[key] = '';
        if (abstractControl instanceof FormGroup) {

        } else {
          this.errorShowOnSubmit(abstractControl, key);
        }
        if ((this.documents.length <= 0)) {
          this.formError.file = this.validationMessages.file.required;
        }
      });
    }

  }

  onStatusUpdate() {
    this.loading2 = true;
    this.loadingText = "Loading...";
    if (this.updateStatus.valid && this.updateStatus.value.status !== this.data.status) {
      this.httpService.put(`/secure/glc/${this.glcId}`, this.updateStatus.value).subscribe((result: any) => {
        if (result.status == "success") {
          this.utilService.successToaster("Success", "Record updated successfully");
          this.loading2 = false;
          this.data.status = this.updateStatus.value.status;
          this.updateStatus.setValue(this.updateStatus.value.status);
          this.getGLCDetails(this.glcId);
          this.errorMessage = false;
        } else {
          this.utilService.errorToaster('Error', 'Something went wrong');
          this.errorMessage = false
          this.loading2 = false;
        }
      },);
    } else {
      //  this.utilService.errorToaster('Error', 'Something went wrong');
      this.loading2 = false;
      this.errorMessage = false;
    }
  }

  logValidationErrors(group: FormGroup = this.glcForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formError[key] = '';
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.errorShow(abstractControl, key);
      }
    });
  }
  errorShow(abstractControl: AbstractControl, key) {
    if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
      const message = this.validationMessages[key];
      for (const errorKey in abstractControl.errors) {
        if (errorKey) { this.formError[key] += message[errorKey] + ' '; }
      }
    }
  }
  errorShowOnSubmit(abstractControl: AbstractControl, key) {
    if (abstractControl && !abstractControl.valid) {
      const message = this.validationMessages[key];
      for (const errorKey in abstractControl.errors) {
        if (errorKey) { this.formError[key] += message[errorKey] + ' '; }
      }
    }
  }
  public validationMessages = {
    'remark': {
      'required': 'Transaction notes is required.',
    },
    'file': {
      'required': 'Atleast one proof file required.'
    }
  };
  public formError = {
    'remark': '',
    'file': ''
  };
}

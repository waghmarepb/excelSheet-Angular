import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { HttpService } from 'src/app/_shared/services/http.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public uploadUrl = '/secure/doc';
  public profilPicUrl = '';
  public user;
  public age;
  public userData;
  public userRegister: FormGroup;
  public uploadButton = false;
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private utilService: UtilsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.userRegister = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      picture: [''],
      website: [''],
      facebook: [''],
      google: [''],
      linkedin: [''],
      twitter: [''],
      github: [''],
      vk: ['']
    });
    this.getUserData();
  }


  updateProfile() {
    this.userRegister.value.picture = this.profilPicUrl;
    this.update(this.userRegister.value);
  }

  setProfilePic(event) {
    this.uploadButton = true;
    this.profilPicUrl = event['fileInfo']['file'];
    this.userData.picture = this.profilPicUrl;
  }
  uploadPicture() {
    this.update(this.userData);
  }
  getUserData() {
    this.httpService.get(`/secure/user/${this.user._id}`).subscribe((response: any) => {
      console.log('response', response);
      this.userData = response.docs;
      this.userRegister.patchValue(response.docs);
      // this.age = moment().diff(this.userData.dob, this.age, false)
      this.profilPicUrl = this.userData.picture;
    });
  }
  update(value) {
    this.httpService.put(`/secure/user/${this.user._id}`, value).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.utilService.successToaster('Success', 'Profile updated successfully');
          this.getUserData();
        } else {
          this.utilService.errorToaster('Error', 'Something went wrong');
        }
      },
      (error) => {
        console.log('response', error);

      });
  }
}

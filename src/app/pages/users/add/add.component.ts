import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../_shared/services/http.service'
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/utils.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public userRegister: FormGroup;
  public loading: boolean = false;
  public loadingText: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
    // Form Instance
    this.userRegister = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],//
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15),Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')]],
      admin: [false],
      website: [''],
      facebook: [''],
      google: [''],
      twitter: [''],
      github: [''],
      vk: ['']
    })
  }

  // Form Submit Event
  onSubmit() {
    this.loading = true;
    this.loadingText = "Loading...";
    if (this.userRegister.valid) {
      const userData = this.userRegister.value;
      this.httpService.post('/secure/users', userData).subscribe((data: any) => {
        if (data.status) {
          this.router.navigate(['/users/list']);
          this.utilService.successToaster('successfully', 'Record inserted')
          this.loading = false;
        }
      }, (err) => {
        this.utilService.errorToaster('Error', 'server error!')
        this.loading = false;
      })
    } else {
      this.loading = false;
      this.logValidationErrors(this.userRegister);
      this.utilService.errorToaster('Error', 'Please Fill all details')
    }
  }


  logValidationErrors(group: FormGroup = this.userRegister): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formError[key] = "";
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        if (!abstractControl.valid) {
          const message = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            console.log(errorKey);
            if (errorKey) {
              this.formError[key] += message[errorKey] + " ";
            }
          }
        }
      }
    });
  }

  public validationMessages = {
    firstName: {
      required: "First name is required"
    },
    lastName: {
      required: "Last name is required"
    },
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    },
    gender:{
      required: "Gender is required",
    },
    password: {
      required: "Password is required",
      maxlength: "Password must be less than 15 character",
      minlength: "Password must be greater than 6 character",
      pattern:'Password must be at least 1 numeric character at least 1 lowercase letter at least 1 uppercase letter at least 1 special character'
    },
    phone:{
      required:'Phone Number is required'
    },
  };
  public formError: any = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender:"",
    password: "",
  };
}

  import { Component, OnInit } from "@angular/core";
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
  import { HttpService } from "src/app/_shared/services/http.service";
  import { UtilsService } from "src/app/_shared/services/utils.service";
  import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  public checkPass = false;
  public userid: any;
  public linkExp: boolean;
  public submitted = false;
  public passwordChanged = false;
  public loading: boolean = false;
  public loadingText: string;

    constructor(
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private utilService: UtilsService,
      private activatedroute: ActivatedRoute,
      public router: Router
    ) {}

  ngOnInit() {
    this.getUserIdFromParam();
    this.passwordChanged = false;


    this.resetPasswordForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.maxLength(15), Validators.minLength(6),Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')]],
      confirmPassword: ["", Validators.required]
    },{ validator: this.MustMatch('password', 'confirmPassword')});
  }

  getUserIdFromParam() {
    this.activatedroute.paramMap.subscribe((id: any) => {

      this.userid = id.params.id;
      this.httpService
        .simplePost("/auth/tokenVerify", id.params)
        .subscribe((data: any) => {
          if (data.status === "success") {
          } else {
            this.linkExp = true
          }
        });
    });
  }
  submit() {
    this.submitted = true;
    this.loading = true;
    this.loadingText = "Loading...";
    if (this.resetPasswordForm.valid) {
      let data = {
        password: this.resetPasswordForm.value.confirmPassword,
        id: this.userid
      };
      this.httpService
        .simplePost("/auth/setNewPassword", data)
        .subscribe((data: any) => {
          if (data) {
            this.passwordChanged = true;
            this.utilService.successToaster("successfully", " Password changed");
            this.loading = false;
            // this.router.navigate(['/auth/login']);
          }
        },(err)=>{
          this.loading = false;
        })
    } else {
      this.loading=false
      this.utilService.errorToaster("Error!", "Enter all rquired details");
      this.logValidationErrors(this.resetPasswordForm);
      //  this.MustMatch('password', 'confirmPassword')
    }
  }

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
        }
        if (control.value !== matchingControl.value) {
          this.formError.confirmPassword = this.validationMessages.confirmPassword.mustMatch;
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }
    // form validation code
    logValidationErrors(group: FormGroup = this.resetPasswordForm): void {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        this.formError[key] = "";
        if (abstractControl instanceof FormGroup) {
          console.log("ab", abstractControl);
          this.logValidationErrors(abstractControl);
        } else {
          if (!abstractControl.valid) {
            const message = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              console.log("error key ", errorKey);
              if (errorKey) {
                this.formError[key] += message[errorKey] + " ";
              }
            }
          }
        }
      });
    }
    public validationMessages = {
      password: {
        required: "Password is required",
        maxlength: "Password must be less than 15 character",
        minlength: "Password must be greater than 6 character",
      },
      confirmPassword: {
        required: "Confirm Password is required",
        mustMatch: "Password didn't match",
        maxlength: "Password must be less than 15 character",
        minlength: "Password must be greater than 6 character"
      }
    };
    public formError: any = {
      password: "",
      confirmPassword: ""
    };
  }

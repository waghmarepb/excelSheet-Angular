import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "src/app/_shared/services/http.service";
import { UtilsService } from "../../../_shared/services/utils.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  public emailSent: boolean;
  public loading: boolean = false;
  public loadingText: string;
  public formError:any;
  constructor(
    private _formBuilder: FormBuilder,
    private httpService: HttpService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.formErrorInstance();
    this.emailSent = false;
    this.forgotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  submit() {
    if (this.forgotPasswordForm.invalid) {
      this.loading=false
      this.formErrorInstance();
      this.logValidationErrors(this.forgotPasswordForm);

    } else {
      this.formError='';
      this.loading = true;
      this.loadingText = "Loading...";
      this.httpService
        .simplePost("/auth/resetPassword", this.forgotPasswordForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === "success") {
            this.loading = false;
            this.utilService.successToaster(
              "Success",
              "E-mail sent successfully"
            );
          } else {
            this.utilService.errorToaster("Error", "Something went wrong");
          }

        },(err)=>{
          this.loading=false
        });
    }
  }

  // form validation code
  logValidationErrors(group: FormGroup = this.forgotPasswordForm): void {
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
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    }
  };
  formErrorInstance(){
    this.formError= {
      email: ""
    };

  }
}

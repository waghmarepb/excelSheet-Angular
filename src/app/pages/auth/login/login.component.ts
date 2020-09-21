import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMsg: boolean;
  loading: boolean = false;
  loadingText: string;

  constructor(
    private _formBuilder: FormBuilder,
    public _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.checkAlreadyLoggedAndRedirect();
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    this.errorMsg = true;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loading=false
      this.logValidationErrors(this.loginForm);
    }
    // stop the process here if form is invalid
    else {
      this.loading = true;
      this.loadingText = "Loading...";
      this.authService
        .login(this.loginForm.value)
        .then(data => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.errorMsg = false;
        });
    }
  }

  // form validation code
  logValidationErrors(group: FormGroup = this.loginForm): void {
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
        } else {
          console.log("key", key);
          this.formError[key] = "";
        }
      }
    });
  }
  public validationMessages = {
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    },
    password: {
      required: "Password is required",
      match: "Password must contain atleast",
      maxlength: "Password must be less than 15 character",
      minlength: "Password must be greater than 6 character"
    }
  };
  public formError: any = {
    email: "",
    password: ""
  };
}

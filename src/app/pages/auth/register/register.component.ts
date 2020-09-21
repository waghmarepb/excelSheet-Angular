import { HttpService } from "../../../_shared/services/http.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/_shared/services/utils.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public loading: boolean = false;
  public loadingText: string;
  constructor(
    private _formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.maxLength(15), Validators.minLength(6),Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')]],
      status: ["PENDING-ACTIVATION"]
    });
  }

  submit() {
    this.loading = true;
    this.loadingText = "Loading...";
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      this.loading=false
      this.logValidationErrors(this.registerForm);
    } else {

      this.httpService
        .simplePost("/users", this.registerForm.value)
        .subscribe((newUser: any) => {
          if (newUser.status === "success") {
            this.router.navigate(["/auth/login"]);
            this.utilsService.successToaster(
              "Success",
              "Welcome to Greenlight Check, Please check your email we send you an activation mail to activate your account "
            );
            this.loading = false;
          } else {
            this.utilsService.successToaster("Error", "Something went wrong");
          }
        },(err)=>{
          this.loading = false;
        });
    }
  }

  logValidationErrors(group: FormGroup = this.registerForm): void {
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
    password: {
      required: "Password is required",
      match: "Password must contain atleast",
      maxlength: "Password must be less than 15 character",
      minlength: "Password must be greater than 6 character",
      pattern:'Password must be at least 1 numeric character at least 1 lowercase letter at least 1 uppercase letter at least 1 special character'
    }
  };
  public formError: any = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
}

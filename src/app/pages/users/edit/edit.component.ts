import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/_shared/services/http.service";
import { UtilsService } from "src/app/_shared/services/utils.service";
import { AuthService } from "src/app/_shared/services/auth.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  public updateUser: FormGroup;
  public userId: any;
  public loading: boolean = false;
  public loadingText: string;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private utilService: UtilsService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUserIdFromParam();
    // Form Instance
    this.updateUser = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", Validators.required],
      admin: [""],
      website: [""],
      facebook: [""],
      google: [""],
      twitter: [""],
      github: [""],
      vk: [""]
    });
  }
  getUserIdFromParam() {
    this.activeRouter.paramMap.subscribe((id: any) => {
      this.userId = id.params.id;
      this.httpService
        .get(`/secure/user/${this.userId}`)
        .subscribe((user: any) => {
          this.updateUser.patchValue(user.docs);
        });
    });
  }

  onSubmit() {
    this.loading = true;
    this.loadingText = "Loading...";
    if (this.updateUser.valid) {
      this.httpService
        .put(`/secure/user/${this.userId}`, this.updateUser.value)
        .subscribe(
          (data: any) => {
            if (data.status) {
              this.router.navigate(["/users/list"]);
              this.utilService.successToaster("successfully", "Record updated");
              this.loading = false;
            }
          },
          err => {
            this.utilService.errorToaster("Error", "Please Fill all details");
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
      this.logValidationErrors(this.updateUser);
      this.utilService.errorToaster("Error", "Please Fill all details");
    }
  }
  logValidationErrors(group: FormGroup = this.updateUser): void {
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
      match: "Password must contain atleast",
      maxlength: "Password must be less than 15 character",
      minlength: "Password must be greater than 6 character"
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

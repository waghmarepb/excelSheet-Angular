import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../../_shared/services/http.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../../_shared/services/utils.service";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter
} from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/_shared/services/auth.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddComponent implements OnInit {
  peopleRegister: FormGroup;
  public user;
  public submitted = false;
  public urlPattern = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  public loading: boolean = false;
  public loadingText: string;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilsService,
    private authService: AuthService
  ) {}
  mailAddress(event) {
    if (event.target.checked) {
      let userAddressData: any = this.peopleRegister.get("physicalAddress")
        .value;
      this.peopleRegister.get("mailingAddress").setValue(userAddressData);
    } else {
      this.peopleRegister.get("mailingAddress").setValue({
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipcode: ""
      });
    }
  }
  ngOnInit() {
    this.user = this.authService.currentUser;
    this.peopleRegister = this._formBuilder.group({
      admin: [""],
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dob: ["", Validators.required],
      phone: ["", Validators.required],
      physicalAddress: this._formBuilder.group({
        line1: [""],
        line2: [""],
        city: [""],
        state: [""],
        zipcode: [""]
      }),
      mailingAddress: this._formBuilder.group({
        line1: [""],
        line2: [""],
        city: [""],
        state: [""],
        zipcode: [""]
      }),
      gender: ["", [Validators.required]],
      location: [""],
      website: ["", [Validators.pattern(this.urlPattern)]],
      picture: [""],
      facebook: ["", [Validators.pattern(this.urlPattern)]],
      twitter: ["", [Validators.pattern(this.urlPattern)]],
      google: ["", [Validators.pattern(this.urlPattern)]],
      linkedin: ["", [Validators.pattern(this.urlPattern)]],
      createdBy: this.user._id
    });
  }
  // Form Submit Event
  onSubmit() {
      this.loading=true;
    this.loadingText = "Loading...";
    this.submitted = true;
    if (this.peopleRegister.valid) {
      if (this.peopleRegister.value.admin == true) {
        this.peopleRegister.value.mailingAddress = this.peopleRegister.value.physicalAddress;
      }
      const peopleData = this.peopleRegister.value;
      this.httpService
        .post("/secure/peoples", peopleData)
        .subscribe((data: any) => {
          if (data.status === "success") {
            this.utilService.successToaster(
              "Success",
              "Record added successfully"
            );
            this.loading = false;
             this.router.navigate(["/people/list"]);
          } else {
            this.utilService.errorToaster("Error", "Something went wrong");
          }
        },(err)=>{
          this.loading = false;
        });
    } else {
      this.loading = false;
      this.logValidationErrors(this.peopleRegister);
      this.utilService.errorToaster("Error", "Enter all required fields");
    }
  }

  logValidationErrors(group: FormGroup = this.peopleRegister): void {
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
      minlength: "Password must be greater than 6 character"
    },
    dob: {
      required: " Date of Birth is required"
    },
    phone: {
      required: "Phone Number is required"
    },
    website: {
      pattern: " Not a valid URL"
    },
    facebook: {
      pattern: " Not a valid URL"
    },
    twitter: {
      pattern: " Not a valid URL"
    },
    google: {
      pattern: " Not a valid URL"
    },
    linkedin: {
      pattern: " Not a valid URL"
    },
    gender: {
      required: "Gender is required"
    }
  };
  public formError: any = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    website: "",
    facebook: "",
    twitter: "",
    google: "",
    linkedin: "",
    gender: ""
  };
}

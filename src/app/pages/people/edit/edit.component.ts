import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/_shared/services/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../_shared/services/auth.service";
import { UtilsService } from "../../../_shared/services/utils.service";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter
} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EditComponent implements OnInit {
  public peopleEdit: FormGroup;
  public user;
  public userDob: any;
  public peopleId;
  public urlPattern = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  public submitted = false;
  public loading: boolean = false;
  public loadingText: string;

  constructor(
    private httpService: HttpService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private utilService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {}

  mailAddress(event) {
    let userAddressData: any = this.peopleEdit.get("physicalAddress").value;
    this.peopleEdit.get("mailingAddress").setValue(userAddressData);
  }

  // Form Submit Event
  onSubmit() {
    this.loading = true;
    this.loadingText = "Loading...";
    this.submitted=true;
    this.peopleEdit.patchValue({ createdBy: this.user._id });
    if(this.peopleEdit.valid){
      this.httpService
        .put(`/secure/people/${this.peopleId.params.id}`, this.peopleEdit.value)
        .subscribe((data: any) => {
          if (data.status == "success") {
            this.utilService.successToaster("successfully", "Record Updated");
            this.loading = false;
            this.router.navigate(["/people/list"]);
          } else {
            this.utilService.errorToaster("Error", "Something went wrong");
          }
        },(err)=>{
          this.loading = false;
        });
    }else{
      this.loading = false;
      this.logValidationErrors(this.peopleEdit);
      this.utilService.errorToaster("Error", "Enter all required fields");
    }
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.getUserIdFromParam();
    this.peopleEdit = this._formBuilder.group({
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
      gender: [""],
      location: [""],
      website: ["", [Validators.pattern(this.urlPattern)]],
      picture: [""],
      facebook: ["", [Validators.pattern(this.urlPattern)]],
      twitter: ["", [Validators.pattern(this.urlPattern)]],
      google: ["", [Validators.pattern(this.urlPattern)]],
      linkedin: ["", [Validators.pattern(this.urlPattern)]],
      createdBy: [""]
    });
  }

  getUserIdFromParam() {
    this._route.paramMap.subscribe((peopelId: any) => {
      this.peopleId = peopelId;
      this.httpService
        .get(`/secure/people/${peopelId.params.id}`)
        .subscribe((user: any) => {
          this.userDob = user.people.dob;
          this.peopleEdit.patchValue(user.people);
          this.peopleEdit.controls.dob.setErrors(null);
          if (user.admin) {
            this.peopleEdit
              .get("mailingAddress")
              .patchValue(user.people.physicalAddress);
          }
        });
    });
  }
    //validation
  logValidationErrors(group: FormGroup = this.peopleEdit): void {
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
    dob:{
      required:' Date of Birth is required'
    },
    phone:{
      required:'Phone Number is required'
    },
    website: {
      pattern:' Not a valid URL'
    },
    facebook: {
      pattern:' Not a valid URL'
    },
    twitter: {
      pattern:' Not a valid URL'
    },
    google: {
      pattern:' Not a valid URL'
    },
    linkedin: {
      pattern:' Not a valid URL'
    },
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
  };
}

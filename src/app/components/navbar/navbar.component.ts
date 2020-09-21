import { Component, OnInit, ElementRef } from "@angular/core";
import { AuthService } from "src/app/_shared/services/auth.service";
import { ModalService } from "src/app/_shared/services/modal-service.service";
import { HttpService } from "src/app/_shared/services/http.service";
import { UtilsService } from "src/app/_shared/services/utils.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public user: any;
  allPeopelList: any;
  person: FormGroup;
  selected: String;


  constructor(
    private auth: AuthService,
    private modalService: ModalService,
    private httpService: HttpService,
    private utilService: UtilsService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
     this.getAllPeopelList();
    this.person = this.fb.group({
      per: [""]
    });
    this.user = this.auth.currentUser;
    console.log(this.user._id);
  }
  selectedUse(index) {
    console.log('index', index)
    this.router.navigate(['/people/details', index.item._id])
  }

  logoutUser() {
    this.auth.logout();
  }
  showModal() {
    this.modalService.openModal(
      this.modalService.modalComponents.changePassword
    );
  }
  getAllPeopelList() {
    this.httpService.get("/secure/peoples").subscribe((data: any) => {
      this.allPeopelList = data.docs;
      console.log(this.allPeopelList);
    }),
      () => {
        this.utilService.errorToaster("Error", "Something went wrong");
      };
  }
}

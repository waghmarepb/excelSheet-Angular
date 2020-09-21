import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_shared/services/http.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public allPeopelList;
  modalRef: BsModalRef;
  userId;
  param = {
    page: 1,
    count: 10,
    search: ''
  };
  public urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilsService,
    private modalService: BsModalService
  ) { }

  deleteAlartResponce() {
    console.log('hit');
    this.httpService.delete(`/secure/people/${this.userId}`).subscribe((data: any) => {
      if (data.status === 'success') {
        this.getAllPeopelList();
        this.utilService.successToaster('successfully', 'Record Deleted');
        this.modalRef.hide();
        this.getAllPeopelList();
      } else {
        this.utilService.errorToaster('Error', 'Something went wrong');
      }
      // tslint:disable-next-line:no-unused-expression
    }), (err) => {
      this.utilService.errorToaster('Error', 'Something went wrong');
    };
  }

  deleteperson(userId, deleteAlart) {
    this.userId = userId;
    this.modalRef = this.modalService.show(deleteAlart);
  }

  getAllPeopelList() {
    this.httpService.get('/secure/peoples', this.param).subscribe((data: any) => {
      this.allPeopelList = data.docs;
      // tslint:disable-next-line:no-unused-expression
    }), () => {
      this.utilService.errorToaster('Error', 'Something went wrong');
    };
  }


  pageChanged(page) {
    this.param.page = page;
    this.getAllPeopelList();
  }

  ngOnInit() {
    this.getAllPeopelList();
  }

}

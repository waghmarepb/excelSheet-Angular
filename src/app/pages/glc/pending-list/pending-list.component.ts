import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../_shared/services/http.service';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {

  public data;
  param = {
    page: 1,
    count: 10,
    search: ''
  }

  constructor(private httpService: HttpService) { }

  pageChanged(page) {
    console.log('page', page)
    this.param.page = page;
    this.getAllGlcList();
  }

getAllGlcList(){
  this.httpService.get(`/secure/glc/pending`,this.param).subscribe((result: any) => {
    this.data = result;
  });
}

  ngOnInit() {
      this.getAllGlcList();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private httpService: HttpService, private authService:AuthService) { }
  public glcData;
  param = {
    page: 1,
    count: 10,
    search: ''
  }


  pageChanged(page) {
    console.log('page', page)
    this.param.page = page;
    this.getAllGlclist();
  }

  getAllGlclist(){

    this.httpService.get(`/secure/glc/`, this.param).subscribe((result: any) => {
      this.glcData = result.docs;
     });
  }
  ngOnInit() {
    this.getAllGlclist()
  }
}

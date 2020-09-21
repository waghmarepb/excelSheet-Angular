import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  constructor(  private httpService: HttpService,
    private utilService: UtilsService,
    private activatedroute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((id: any) => {

        this.httpService
        .simplePost("/users/VerifyUser", id.params)
        .subscribe((data: any) => {
          if (data.status === "success") {
          }
        });
      
    })
  }

}

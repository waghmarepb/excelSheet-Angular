import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public users;
  param = {
    page: 1,
    count: 10,
    search: ''
  }
  constructor(   private router:Router,private httpService: HttpService,
    private utilService: UtilsService) { }

  ngOnInit() {
    this.getAllUserList();
  }
  deleteUser(id){
    this.httpService.delete(`/secure/user/${id}`).subscribe((data:any)=>{
      if(data.status == 'success'){
        this.utilService.successToaster('Success','Record Removed')
          this.getAllUserList();
      }else{
        this.utilService.errorToaster('Error','Record Removed Failed')
      }
    })
  }


  pageChanged(page) {
    console.log('page', page)
    this.param.page = page;
    this.getAllUserList();
  }

getAllUserList(){
  this.httpService.get("/secure/users",this.param).subscribe((user: any) => {
    this.users=user.docs
  });
}


}

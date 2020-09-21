import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

interface column {
  displayText: String,
  dataKey: String,
  sortable: boolean
  searchable: boolean,
  defaultSort : boolean
}

interface actionButton {
  key: string,
  displayText: string, 
  class: string,
  icon: string,
  type:  string,          //   nav / emit
  navUrl: string          //page/edit/{dataKey}/{}
  newWindow: boolean      //true / false
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})








export class TableComponent implements OnInit {
  public numberOfPages
  constructor(
    private httpService : HttpService
  ) { }


  
  dataList
  @Input() columns : Array<column> = [
    {
      displayText: 'NAME',
      dataKey: 'firstName',
      sortable: true,
      searchable: false,
      defaultSort : false
    },{
      displayText: 'EMAIL',
      dataKey: 'email',
      sortable: true,
      searchable: false,
      defaultSort : false
    },{
      displayText: 'ROLE',
      dataKey: 'role',
      sortable: true,
      searchable: false,
      defaultSort : false
    },{
      displayText: 'CREATED ON',
      dataKey: 'createdAt',
      sortable: true,
      searchable: false,
      defaultSort : false
    },{
      displayText: 'STATUS',
      dataKey: 'status',
      sortable: true,
      searchable: false,
      defaultSort : false
    }]
  @Output() actionButtons : Array<actionButton> = []
  @Input() apiLink : string = '/secure/users'
  @Input() apiParams = {}
  @Input() numberOfEntriesOnPage : number = 5
  pages = []
  currentPage : number = 1
  totalEntries : number = 9
  ngOnInit() {
    this.refreshTableData()
  }

  /**
   * @function refreshTableData used to get the data from th API 
   * by using provided API url and API params
   */
  refreshTableData(){
    let params = {...this.apiParams}
    this.httpService.get(this.apiLink, params).subscribe(
      data => {
        console.log('data', data)
        this.dataList = data['docs']
        console.log('this.dataList', this.dataList)
      },
      error => {
        console.log('error', error)
      }
    )
  }

  /**
   * @function setNumberOfPages sets the number of pages by 
   * dividing total entries by number of entries per pages 
   * it adds one to division if number is not divisible
   */
  setNumberOfPages(){
    let numberOfPages = 
      this.totalEntries / this.numberOfEntriesOnPage + 
      (+!!(this.totalEntries % this.numberOfEntriesOnPage))

    for (let page = 1; page <= numberOfPages; page++) {
      this.pages.push(
        {
          isActive : false,
          next : page == numberOfPages ? page : page + 1 ,
          page,
          previous : !!page ? page : page - 1
        }
      ) 
      
    }

  }


}

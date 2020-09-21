import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../_shared/services/http.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { UtilsService } from '../../../_shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public notesForm: FormGroup;
  public data: any;
  public notes;
  public glcStatus: boolean = false;
  public personId;
  public noteTime: any = [];
  public user;
  public isGlc:boolean;
  public loading: boolean = false;
  public loadingText: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private utilService: UtilsService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.activateRouter.paramMap.subscribe((paramMap: any) => {
      this.personId = paramMap.params.id;
      this.requestData(this.personId);
    });

    this.notesForm = this.fb.group({
      note: [''],
      createdOn: moment().format(),
      user: this.user._id
    });
  }
  onSubmit() {
    this.notesForm.value.createdOn = moment().format();
    this.notesForm.value.user =this.user._id;
    this.loading = true;
    this.loadingText = "Loading...";
    this.httpService.put(`/secure/people/note/${this.personId}`, this.notesForm.value).subscribe((result: any) => {
      if (result.status == "success") {
        this.utilService.successToaster('Success', 'Note added successfully')
        this.loading = false;
        this.requestData(this.personId);
        this.noteTime = [];
        this.notesForm.reset();
      } else {
        this.utilService.errorToaster('Error', 'Something went wrong');
      }
     
    },(err)=>{
      this.loading = false;
    })
  }
  requestGLC() {
    this.loading = true;
    this.loadingText = "Loading...";
    let value = {
      person: this.personId,
      user: this.user._id,
      status: 'Pending',
      type: 'background',
    }
    this.httpService.post('/secure/glc', value).subscribe((result: any) => {
      this.glcStatus = true;
        this.utilService.successToaster('Success', 'Your request has been submitted successfully')
        this.loading = false;
      this.requestData(this.personId);
    },(err)=>{
      this.loading = false;
    })
  }

  requestData(personId) {
    this.httpService.get(`/secure/people/${personId}`).subscribe((result: any) => {

      this.data = result;
      this.notes = this.data.people.notes;
      this.notes.forEach(element => {
        this.noteTime.push(moment(element.createdOn).fromNow());
      });
      if (result.GLC.length > 0) {
        let count = 0;
        for (let i = 0; i < result.GLC.length; i++) {
          if (result.GLC[i].status === 'Completed') { count += 1; }
        }
        if (count !== result.GLC.length) { this.glcStatus = true }
      }
    });
  }
}

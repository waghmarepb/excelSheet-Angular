import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
/**
 * Component ChangePasswordComponent is used to aloow user to change his password
 */
export class ChangePasswordComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private httpService : HttpService,
    private utilService : UtilsService

  ) { }

  closeModal = new EventEmitter()
  changePassword : FormGroup
  ngOnInit() {
    this.changePassword = this.fb.group({
      oldPassword : ['',[Validators.required]],
      newPassword : ['', [Validators.required]],
      confirmNewPassword : ['', [Validators.required]]
    }, {validators : [this.validateNewPassword]})

  }

  /**
   * @function submit is used to update the password by submitting the provided data
   */
  submit(){
    // this.changePassword
    this.httpService
    .put(`/secure/user/changepassword`, this.changePassword.value)
    .subscribe((response)=>{
      console.log('response', response)
      this.utilService.successToaster("Success", response['message'])
      this.close()
    },
    (err)=>{
      if(!!err.error['currentPasswordIncorrect'])
        this.f('oldPassword').setErrors({currentPasswordIncorrect : true})
      console.log('err', err)
    })
  }

  /**
   * @function close used to inform modal service to close the modal
   */
  close(){
    this.closeModal.emit({close : true})
  }

  /**
   * @function validateNewPassword is used to check whether entered passwords are same or not
   */
  validateNewPassword = (group)=> {
    if(!!group.value.confirmNewPassword && !!group.value.newPassword)
      return (group.value.confirmNewPassword === group.value.newPassword) ? 
      null : { passwordNotMatch : true } 
    return null
  }

  /**
   * @function f returns the requested control of changePassword form
   * @param control is the name of requested control
   */
  f(control){
    return this.changePassword.controls[control]
  }

}

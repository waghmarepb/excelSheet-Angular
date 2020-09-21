import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ChangePasswordComponent } from '../layouts/modal-components/change-password/change-password.component';



@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef : BsModalRef
  modalComponents = {
    'changePassword' : ChangePasswordComponent
  }
  constructor(
    private modalService: BsModalService,
  ) { }


  /**
   * @function openModal opens the provided entry component as modal
   * component needs to have colseModal EventEmitter to inform when to close the modal
   * @param component
   */
  openModal(component) {
    let modalRef : BsModalRef= this.modalService.show(component, { ignoreBackdropClick : true });
    modalRef.content.closeModal.subscribe((data)=>{
      if(data['close']){
        modalRef.hide()
        modalRef.content.closeModal.unsubscribe()
      }
    })
  }
}

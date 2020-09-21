import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private ls = localStorage;

  constructor(
    private toastr: ToastrService
  ) { }


  /**
   * Helper method to check is Token exist in app or not.
   */
  isTokenExist(): boolean {
    // console.log('isTokenExist')
    if (this.localStorageGet('token')) { return true; }
    return false;
  }
  /**
    * Local Storage Services
    * setLocalStorage will set the localStorage
    * will be stored in string format
    * so we will first convert json to string
    * @param key: name of localStorage objecta
    * @param value: data supposed to be added to that object
    */
  public localStorageSet(key, value) {
    this.ls.setItem(key, JSON.stringify(value));
  }

  /**
    * getLocalStorage will return the localStorage
    * will be returned in json format
    * @param name: name of localStorage object
    */
  public localStorageGet(key) {
    return JSON.parse(this.ls.getItem(key));
  }

  /*
   * Helper method to remove the Item from localstorage.
   * @param name
   */
  public localStorageRemove(key) {
    this.ls.removeItem(key);
  }

  /**
   * Clear localstorage data
   */
  public localStorageClear() {
    this.ls.clear();
  }



  // /**
  //  * Toaster message for - success, info, warning, error
  //  */

  successToaster(message, title) {
    return this.toastr.success(title, message);
  }

  infoToaster(message, title) {
    return this.toastr.info(title, message);
  }

  warningToaster(message, title) {
    return this.toastr.warning(title, message);
  }

  errorToaster(message, title) {
    return this.toastr.error(title, message);
  }

  // /**
  //  * SweetAlerts - to show alert of success,error
  //  */
  // // errorSweetAlerts(title, text, footer?) {
  // //   Swal.fire({
  // //     type: 'error',
  // //     title: title,
  // //     text: text,
  // //     footer: footer || ''
  // //   })
  // // }

  // // successSweetAlerts(title, text, footer?) {
  // //   Swal.fire({
  // //     type: 'success',
  // //     title: title,
  // //     text: text,
  // //     footer: footer || ''
  // //   })
  // // }

  // // confirmSweetAlerts(title, text, confirmButtonText) {
  // //   return Swal.fire({
  // //     title: title,
  // //     text: text,
  // //     type: 'warning',
  // //     showCancelButton: true,
  // //     confirmButtonColor: '#3085d6',
  // //     cancelButtonColor: '#d33',
  // //     confirmButtonText: confirmButtonText
  // //   }).then((result) => {
  // //     console.log('result', result)
  // //     return result;
  // //   })
  // // }
}

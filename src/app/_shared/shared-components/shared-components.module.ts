import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TableComponent } from '../components/table/table.component';

const exportedComponents = [
  ButtonComponent,
  FileUploadComponent,
  TableComponent,

];
@NgModule({
  declarations: [...exportedComponents],
  imports: [
    CommonModule
  ],
  exports: exportedComponents
})
export class SharedComponentsModule { }

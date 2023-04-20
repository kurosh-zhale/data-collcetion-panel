import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { TableComponent } from './components/table/table.component';
import { AddProjectComponent } from './components/shared-forms/add-project/add-project.component';
@NgModule({
  declarations: [
    SelectComponent,
    CheckBoxComponent,
    PaginationComponent,
    ModalComponent,
    DynamicComponentDirective,
    TableComponent,
    AddProjectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    SelectComponent,
    CheckBoxComponent,
    PaginationComponent,
    ModalComponent,
    TableComponent,
    AddProjectComponent,
  ],
  providers: [SharedService],
})
export class SharedModule {}

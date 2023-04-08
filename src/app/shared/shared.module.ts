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

@NgModule({
  declarations: [
    SelectComponent,
    CheckBoxComponent,
    PaginationComponent,
    ModalComponent,
    DynamicComponentDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    SelectComponent,
    CheckBoxComponent,
    PaginationComponent,
    ModalComponent,
  ],
  providers: [SharedService],
})
export class SharedModule {}

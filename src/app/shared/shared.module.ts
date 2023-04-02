import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [SelectComponent, CheckBoxComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [SelectComponent, CheckBoxComponent, PaginationComponent],
  providers: [SharedService],
})
export class SharedModule {}

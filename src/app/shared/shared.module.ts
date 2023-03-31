import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckBoxComponent } from './components/check-box/check-box.component';

@NgModule({
  declarations: [SelectComponent, CheckBoxComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SelectComponent,CheckBoxComponent],
})
export class SharedModule {}

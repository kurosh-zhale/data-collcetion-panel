import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './component/select/select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule],
  exports: [SelectComponent],
})
export class SharedModule {}

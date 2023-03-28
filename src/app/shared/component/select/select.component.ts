import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('data-list') dataList: any[] = [];
  @Input('place-holder') placeHolder: string = '';

  @Output('onSelect') selectEvent: EventEmitter<string> =
    new EventEmitter<string>();

  selected = false;

  selectedValue = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  onFocus() {
    this.selected = !this.selected;
  }

  onSelect(value: string) {
    this.selected = false;
    this.selectedValue = value;
    this.selectEvent.emit(this.selectedValue);
  }
}

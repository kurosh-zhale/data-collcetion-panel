import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('data-list') dataList: { name: string; value: any }[] | null = [];
  @Input('place-holder') placeHolder: string = '';

  @Output('onSelect') selectEvent: EventEmitter<any> = new EventEmitter<any>();

  selected = false;

  selectedValue: any = null;

  selectedName: string = '';

  constructor() {}

  ngOnInit(): void {}

  onFocus() {
    this.selected = !this.selected;
  }

  onSelect(value: { name: string; value: any }) {
    this.selected = false;
    this.selectedValue = value.value;
    this.selectedName = value.name;
    this.selectEvent.emit(this.selectedValue);
  }
}

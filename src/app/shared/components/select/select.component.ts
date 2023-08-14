import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('data-list') data: any[] = [];
  @Input('icon') icon: string | undefined;
  public dataList: {
    name: string;
    value: number;
    icon: string | undefined;
  }[] = [];
  @Input('place-holder') placeHolder: string = '';

  @Output('onSelect') selectEvent: EventEmitter<any> = new EventEmitter<any>();

  selected = false;

  selectedValue: any = null;

  selectedName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.map_data();
  }

  onFocus() {
    this.selected = !this.selected;
  }

  private map_data() {
    this.data.map(
      (data: string | number | boolean | null | undefined, index: number) => {
        if (data) {
          const remaped_data: {
            name: string;
            value: number;
            icon: string | undefined;
          } = {
            name: data.toString(),
            value: index,
            icon: this.icon,
          };

          this.dataList.push(remaped_data);
        }
      }
    );
  }

  onSelect(value: { name: string; value: any }) {
    this.selected = false;
    this.selectedValue = value.value;
    this.selectedName = value.name;
    this.selectEvent.emit(this.selectedValue);
  }
}

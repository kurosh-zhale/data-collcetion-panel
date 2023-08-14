import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @ViewChild('select') private select: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('select_box') private select_box:
    | ElementRef<HTMLDivElement>
    | undefined;
  @Input('data-list') public data: Data[] | DataObject[] = [];
  @Input('place-holder') public placeHolder: string = 'select';
  @Output('onSelect') public selectEvent: EventEmitter<any> =
    new EventEmitter<any>();
  private index_value: boolean = true;
  public dataList: DataObject[] = [];
  public selected = false;
  public selectedValue: Data | undefined;
  public selectedName: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.map_data();
  }

  private map_data() {
    this.data.map((data: Data | DataObject, index: number) => {
      let remaped_data: {
        name: string;
        value: Data;
      };

      if (data) {
        if (typeof data !== 'object') {
          let dataString: string = data.toString();
          if (this.index_value) {
            remaped_data = {
              name: dataString,
              value: index,
            };
          } else {
            remaped_data = {
              name: dataString,
              value: data,
            };
          }
        } else {
          remaped_data = {
            name: data.name,
            value: data.value,
          };
        }
        this.dataList.push(remaped_data);
      }
    });
  }

  private initiate_select_box() {
    const top: number | undefined =
      this.select?.nativeElement.getBoundingClientRect().y;
    const left: number | undefined =
      this.select?.nativeElement.getBoundingClientRect().x;
    setTimeout(() => {
      if (top && left && this.select_box) {
        this.select_box?.nativeElement.setAttribute(
          'style',
          `top:${top + 8}px; left:${left}px`
        );
      }
    }, 0);
  }

  public onFocus() {
    this.selected = !this.selected;
    if (this.selected) this.initiate_select_box();
  }

  public onSelect(value: DataObject) {
    this.selected = false;
    this.selectedValue = value.value;
    this.selectedName = value.name;
    this.selectEvent.emit(this.selectedValue);
  }
}

type Data = string | number | boolean;
type DataObject = { name: string; value: Data };

import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('data-list') dataList: any[] = [];
  @Input('place-holder') placeHolder: string = '';

  selected = false;

  selectedValue = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log(Boolean(''));
    
  }

  onFocus() {
    this.selected = !this.selected;
  }

  onSelect(value:string) {
    this.selected = false;
    this.selectedValue = value
  }
}

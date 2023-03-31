import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input('checked') checked: boolean = false;
  @Input('description') desc: string = '';
  @Output('onClick') clickEvent : EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  emitValue(){
    this.checked = !this.checked;
    this.clickEvent.emit(this.checked);
  }
}

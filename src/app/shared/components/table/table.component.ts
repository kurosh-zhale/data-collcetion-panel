import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { unsubscribe } from '../../utils/unsubscriber';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('data-list') dataList: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  @Output('click-event') click: EventEmitter<string> = new EventEmitter<string>();

  headers: string[] = [];

  tableData: any[] = [];

  private subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.set_data();
    this.modify_headers();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private set_data() {
    let subscription = this.dataList.subscribe((list) => {
      this.headers = Object.keys(list[0]).filter((keys) => keys !== 'id');
      this.tableData = list;
    });

    this.subscriptions.push(subscription);
  }

  private modify_headers() {
    this.headers.map((header: string) => {
      if (header.includes('_')) return header.replace('_', ' ');
      else return header;
    });
  }

  on_click(rowID:string) {
    this.click.emit(rowID);
  }
}

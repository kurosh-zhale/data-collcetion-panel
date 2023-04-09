import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { unsubscribe } from '../../utils/unsubscriber';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('data-list') dataList: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );
  headers: string[] = [];

  tableData: any[] = [];

  private subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.get_headers();
    this.modify_headers();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  get_headers() {
    let subscription = this.dataList
      .pipe(
        map((list) => {
          list.map((data: any, i: number) => {
            if (i === 0) this.headers = Object.keys(data);
          });
          return list;
        })
      )
      .subscribe((list) => (this.tableData = list));

    this.subscriptions.push(subscription);
  }

  modify_headers() {
    this.headers.map((header: string) => {
      if (header.includes('_')) return header.replace('_', ' ');
      else return header;
    });
  }
}

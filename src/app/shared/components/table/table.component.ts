import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('headers') headers: any[] = [];
  @Input('data-list') dataList: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}

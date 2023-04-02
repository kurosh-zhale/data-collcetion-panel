import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  mode:'grid'|'table' = 'grid';

  constructor() { }

  ngOnInit(): void {
  }

}

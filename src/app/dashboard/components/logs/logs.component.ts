import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  mode: 'grid' | 'table' = 'grid';

  dataList: BehaviorSubject<any> = new BehaviorSubject([]);

  subscriptions:Subscription[]=[];

  constructor(private dashServ: DashboardService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }
}

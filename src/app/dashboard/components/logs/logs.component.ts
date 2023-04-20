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
    this.get_data();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  get_data() {
    let subscription = this.dashServ
      .get_dataitems()
      .pipe(
        map(({ dataitems }: any, index) =>
          dataitems.map(
            ({ create_date, description, filename, modify_date }: any) => {
              return {
                create_date: new Date(create_date).toLocaleDateString(),
                description,
                filename,
                modify_date: new Date(modify_date).toLocaleDateString(),
              };
            }
          )
        )
      )
      .subscribe((data) => this.dataList.next(data));

      this.subscriptions.push(subscription);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [AuthenticationService],
})
export class SideBarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dashServ: DashboardService,
    private authServ: AuthenticationService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  logout() {
    let subscription: Subscription = this.authServ
      .sign_out()
      .subscribe(() => this.router.navigate(['../auth']));
    this.subscriptions.push(subscription);
  }
}

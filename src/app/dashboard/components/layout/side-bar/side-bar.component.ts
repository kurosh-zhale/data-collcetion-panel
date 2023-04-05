import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router, private dashServ: DashboardService) {}

  extended: boolean = false;

  ngOnInit(): void {}

  navigate(route: string) {
    if (route === 'settings' || route === 'auth') {
      this.router.navigate([route]);
    } else {
      this.router.navigate(['./dashboard/' + route]);
    }
  }

  logout() {
    this.dashServ.logout().then(() => this.navigate('auth'));
  }

  extend() {
    this.extended = !this.extended;
  }
}

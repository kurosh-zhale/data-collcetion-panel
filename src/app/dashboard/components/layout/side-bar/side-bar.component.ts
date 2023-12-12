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

  ngOnInit(): void {}

  logout() {
    this.dashServ.logout().then(() => this.router.navigate(['../auth']));
  }
}

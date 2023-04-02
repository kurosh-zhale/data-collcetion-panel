import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(route: string) {
    if (route === 'dashboard') {
      this.router.navigate([route]);
    } else this.router.navigate(['../settings' + route]);
  }
}

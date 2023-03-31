import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {}

  extended: boolean = false;

  ngOnInit(): void {}

  navigate(route: string) {
    if (route === 'setting') {
      this.router.navigate([route]);
      console.log(1);
    } else {
      this.router.navigate(['./dashboard/' + route]);
      console.log(2);
    }
  }

  extend() {
    this.extended = !this.extended;
  }
}

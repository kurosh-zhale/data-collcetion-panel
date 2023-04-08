import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  project_name: FormControl<string | null> = new FormControl<string>('', [
    Validators.required,
  ]);

  private subscriptions: Subscription[] = [];
  constructor(private dashServ: DashboardService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private reload_page() {
    this.router
      .navigateByUrl('dashboard/logs', { skipLocationChange: true })
      .then(() => this.router.navigate(['dashboard/projects']));
  }

  submit() {
    this.project_name.updateValueAndValidity();
    if (this.project_name.valid) {
      let subscription = this.dashServ
        .add_project(this.project_name.value)
        .subscribe(() => this.reload_page());

      this.subscriptions.push(subscription);
    }
  }
}

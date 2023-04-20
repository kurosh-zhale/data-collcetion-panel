import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { SettingsService } from '../../services/settings.service';
import { AddProjectComponent } from 'src/app/shared/components/shared-forms/add-project/add-project.component';

@Component({
  selector: 'app-single-organization',
  templateUrl: './single-organization.component.html',
  styleUrls: ['./single-organization.component.scss'],
})
export class SingleOrganizationComponent implements OnInit {
  @ViewChild('modal') private modal!: ModalComponent;

  members: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  projects: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  subscriptions: Subscription[] = [];

  constructor(private settingsServ: SettingsService) {}

  ngOnInit(): void {
    this.get_members();
    this.get_projects();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private get_members() {
    let subscription = this.settingsServ.get_members().subscribe();

    this.subscriptions.push(subscription);
  }

  private get_projects() {
    let subscription = this.settingsServ
      .get_organizations()
      .pipe(
        map(({ providers }: any) => {
          return providers.map((provider: any) => {
            return {
              name: provider.name,
              short_form: provider.short_form,
              creation_date: provider.create_date,
              last_modification: provider.modify_date,
              emai: provider.email,
              active: provider.is_active,
            };
          });
        })
      )
      .subscribe((providers: any) => this.projects.next(providers));

    this.subscriptions.push(subscription);
  }

  open_modal(type: 'members' | 'projects') {
    if (type === 'members') {
      this.modal.open();
    } else if (type === 'projects') {
      this.modal.open(AddProjectComponent);
    }
    console.log(type);
    
  }
}

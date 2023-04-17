import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements OnInit {
  organizations = new BehaviorSubject<any>([]);

  @ViewChild('modal') modal!:ModalComponent;

  constructor(private settingsServ: SettingsService) {}

  ngOnInit(): void {
    this.get_organizations();
  }

  private get_organizations() {
    this.settingsServ
      .get_organizations()
      .pipe(
        map(({ providers }: any) => {
          return providers.map((provider: any) => {
            return {
              name: provider.name,
              creation_date: new Date(
                provider.create_date
              ).toLocaleDateString(),
              modify_date: new Date(provider.modify_date).toLocaleDateString(),
            };
          });
        })
      )
      .subscribe((data: any) => this.organizations.next(data));
  }

  openModal(){
    this.modal.open(AddOrganizationComponent);
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './routes/settings-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { SettingsService } from './services/settings.service';
import { AddOrganizationComponent } from './components/organizations/add-organization/add-organization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleOrganizationComponent } from './components/single-organization/single-organization.component';

@NgModule({
  declarations: [LayoutComponent, SideBarComponent, ProfileComponent,OrganizationsComponent, AddOrganizationComponent, SingleOrganizationComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule,ReactiveFormsModule],
  providers:[SettingsService]
})
export class SettingsModule {}

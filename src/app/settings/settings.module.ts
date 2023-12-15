import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './routes/settings-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsService } from './services/settings.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, SideBarComponent, ProfileComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [SettingsService],
})
export class SettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './routes/dashboard-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { ToolBarComponent } from './components/layout/tool-bar/tool-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PinsComponent } from './components/pins/pins.component';

@NgModule({
  declarations: [LayoutComponent, SideBarComponent, ToolBarComponent, HomeComponent, SearchComponent, ProjectsComponent, PinsComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}

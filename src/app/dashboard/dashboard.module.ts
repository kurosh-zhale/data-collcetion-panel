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
import { SharedModule } from '../shared/shared.module';
import { LogsComponent } from './components/logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from './services/dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    ToolBarComponent,
    HomeComponent,
    SearchComponent,
    ProjectsComponent,
    PinsComponent,
    LogsComponent,
    AddProjectComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}

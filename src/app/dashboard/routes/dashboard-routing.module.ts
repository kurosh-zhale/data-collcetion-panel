import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { LogsComponent } from '../components/logs/logs.component';
import { SearchComponent } from '../components/search/search.component';
import { PinsComponent } from '../components/pins/pins.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'pins',
        component: PinsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

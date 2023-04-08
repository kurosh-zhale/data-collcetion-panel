import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AddProjectComponent } from './add-project/add-project.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projectsList: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  @ViewChild('modal') modal!: ModalComponent;

  constructor(private dashServ: DashboardService) {}

  ngOnInit(): void {
    this.get_projects();
  }

  get_projects() {
    return this.dashServ
      .get_projects()
      .pipe(
        map(({ projects }: any) => {
          return projects.map(
            ({ name, create_date, modify_date, owner, description }: any) => {
              return {
                name,
                description,
                create_date: new Date(create_date).toLocaleDateString(),
                modify_date: new Date(modify_date).toLocaleDateString(),
                owner,
              };
            }
          );
        })
      )
      .subscribe((data) => this.projectsList.next(data));
  }

  openModal() {
    this.modal.open(AddProjectComponent);
  }
}

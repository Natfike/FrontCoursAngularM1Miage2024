import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { assignment } from './assignment.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list'
import { MatListItem } from '@angular/material/list';
import { AssignmentDetailComponent } from "./assignment-detail/assignment-detail.component";
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";
import { AssignmentsService } from '../shared/assignments.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, FormsModule, MatInputModule,
    MatDatepickerModule, MatFormFieldModule, MatButtonModule, MatToolbarModule,
    MatIcon, MatSidenavModule, MatDivider, MatList, MatListItem, AssignmentDetailComponent, AddAssignmentComponent,
    RouterOutlet, RouterLink, MatCardModule, MatPaginator],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})



export class AssignmentsComponent implements OnInit {
  titre = "Mon appplication sur les Assignments !";
  ajoutActive = false;
  nomDevoir: string = "";
  dateDeRendu = new Date();
  opened = false;
  assignmentSelectionne: assignment | null = null;
  formVisible = false;
  assignments!: assignment[];

  page:number = 1;
  limit:number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;


  constructor (private assignmentService:AssignmentsService, 
              private router: Router
   ){}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(){
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Données reçues")
    });
  }

  changementPage(event: PageEvent, paginator1:MatPaginator, paginator2:MatPaginator){
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    paginator1.pageIndex = event.pageIndex;
    paginator2.pageIndex = event.pageIndex;
    paginator1.pageSize = event.pageSize;
    paginator2.pageSize = event.pageSize;

    this.getAssignments();
  }

  onSubmit(event: any) {
    const newassignment = new assignment();
    newassignment.nom = this.nomDevoir;
    newassignment.dateDeRendu = this.dateDeRendu;
    newassignment.rendu = false;

    this.assignments.push(newassignment);
  }

  assignmentToDelete(assigment:assignment){
    this.assignmentSelectionne = null;
  }

  assignmentClique(assignment:assignment){
    this.assignmentSelectionne = assignment;
  }

}

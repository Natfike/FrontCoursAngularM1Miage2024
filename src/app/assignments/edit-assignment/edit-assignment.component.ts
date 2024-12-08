import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
   MatCardModule
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})

export class EditAssignmentComponent implements OnInit {
  assignment: assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
 
  constructor(
    private assignmentService: AssignmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
 
  ngOnInit(): void { 
    const id = +this.activatedRoute.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignment = assignment);
  }


  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
         this.router.navigate(['/home']);
      });
  }
 }
 
 
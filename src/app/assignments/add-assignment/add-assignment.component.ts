import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule,
    MatFormFieldModule, MatButtonModule, MatCardModule, RouterLink,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})

export class AddAssignmentComponent implements OnInit{


  nomDevoir:string = "";
  dateDeRendu = new Date()
  
  constructor(private assignmentService: AssignmentsService, private router:Router){}

  ngOnInit(): void{}

  onSubmit(event: any){
    const newAssignment = new assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    this.assignmentService.addAssignment(newAssignment)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

}

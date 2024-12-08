import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButton, RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})

export class AssignmentDetailComponent implements OnInit {

  constructor(private assignmentService: AssignmentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  assignmentTransmis: assignment | undefined;

  ngOnInit(): void { 
    const id = +this.activatedRoute.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
    console.log(this.assignmentTransmis);
  }

  onClick(assigment: assignment) {
    this.assignmentService.deleteAssignment(assigment)
      .subscribe(message => {
        this.router.navigate(['/home']);
  });
  }

  
  onClickEdit(){
    this.router.navigate(["/assignment", this.assignmentTransmis?.id, 'edit'],
      {queryParams:{nom:this.assignmentTransmis?.nom}, fragment:'edition'}
    )
  }

  isAdmin(){
    return this.authService.admin;
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis != null) {
      this.assignmentTransmis.rendu = true;
      this.assignmentService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(['/home']);
    })
    }
  }
}

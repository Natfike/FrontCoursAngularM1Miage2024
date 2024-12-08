import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AssignmentsService } from './shared/assignments.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AssignmentsComponent, MatSlideToggleModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog,
    private assignmentService: AssignmentsService
  ) {}

  title = 'Application de gestion des devoirs à rendre';
  opened = false;

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '450px',
      disableClose: false,
    });
  }

  peuplerDB(){
    this.assignmentService.peuplerDB()
      .subscribe(res => {
        console.log("La bd à été peuplée, tout les assignments ont été ajoutés");
        this.router.navigate(['/home'], {replaceUrl: true});
        window.location.reload();
      })
  }

}
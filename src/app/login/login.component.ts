import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router, 
    private authService:AuthService,
    private dialogRef:MatDialogRef<LoginComponent>
  ) {}

  username:string = "";
  password:string = "";

  onSubmit(event:any){
    this.authService.logIn(this.username, this.password);
    if (this.authService.loggedIn){
      this.dialogRef.close();
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  loginCredential =  [
    {
      username: 'login',
      password: 'login123',
      admin: false
    },
    {
      username: 'admin',
      password: 'admin123',
      admin: true
    }
  ]

  loggedIn = false;
  admin = false;

  logIn(username:string, password:string){
    const credentials = this.loginCredential.find(user => user.username === username && user.password === password);
    if (credentials){
      if (credentials.admin){
        this.admin = true;
      }
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logOut(){
    this.loggedIn = false;
  }

  isAdmin(){
    const isUserAdmin = new Promise((resolve, reject)=>{
      resolve(this.loggedIn)
    });
    return isUserAdmin;
  }

}

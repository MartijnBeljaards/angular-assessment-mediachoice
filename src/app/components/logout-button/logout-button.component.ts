import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <button class="logout" (click)="logout()">Logout</button>
  `,
  styles: `
    .logout {
      float: right;
    }
  `
})
export class LogoutButtonComponent {

  constructor(private loginService: LoginService, private router: Router) { }
  
  logout(): void { 
    console.log("LOGOUT TRIGGER!");
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    this.router.navigate(['/login']);
  }
}
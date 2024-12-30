import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})

export class LoginPage {
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  // check if the isLoggedIn value is true in the login.service.ts file
  // (= check if there has been an succesful login before when coming on the login page)
  ngOnInit(): void {
    if (this.loginService.checkLoginStatus()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(event: Event, username: string, password: string) {
    event.preventDefault(); // Prevent error when submitting

    // 1: login with username + password (in html)
    // 2: pass username to login.service.ts (= this.loginService)
    this.loginService.login(username, password).subscribe(
      () => {
        if (this.loginService.isLoggedIn) {
          this.router.navigate([this.loginService.redirectUrl]);
        }
        
        if (this.loginService.triggeredValidationMessage !== null) {
          this.message = this.loginService.triggeredValidationMessage;
        }
      }
    );
  }
}

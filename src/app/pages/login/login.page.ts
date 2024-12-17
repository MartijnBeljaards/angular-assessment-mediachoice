import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})

export class LoginPage {

  public loginForm!: FormGroup
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(event: Event) {
    event.preventDefault(); // Prevent error when submitting ("Cannot match any routes. URL Segment: 'submit'")
    console.log("Form submitted...");

    if (this.loginForm.valid) {
      console.log("Submitted values are valid: ", this.loginForm.value);
    } else {
      console.log("Not valid values :(", this.loginForm.value);
    }

    this.loginService.login().subscribe(
      () => {
        console.log("Check", this.loginService.isLoggedIn);
        if (this.loginService.isLoggedIn) {
          this.router.navigate([this.loginService.redirectUrl]);
        }
      }
    )
  }
}

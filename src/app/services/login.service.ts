import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import mockSuccess from '../server/login-success.json';
import mockFailed from '../server/login-failed.json';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }

  isLoggedIn: boolean = false;
  triggeredValidationMessage: string|null = null;
  redirectUrl: string|null = '/home';

  login(username: string, password: string): Observable<{success: boolean, message: string}> {
    let mockSuccessResult: boolean;
    let validationMessage: string;

    console.log("username service = ", username);
    console.log("password service = ", password);
    console.log("json success", mockSuccess);
    console.log("json failed", mockFailed);

    // 3: compare passed username with .json file (if statement)
    // 4: get "success" variable from matching json file (= true, false)
    
    // normally you get ONE json response, and read THAT success value (= either true or false)
    if(username === mockSuccess.data.username) {
      // NOTE: username in json is with a CAPITAL LETTER!!
      mockSuccessResult = mockSuccess.success;
      validationMessage = mockSuccess.resultMessages[0].message;
    } else if (username === mockFailed.data.username) {
      mockSuccessResult = mockFailed.success;
      validationMessage = mockFailed.resultMessages[0].message;
    } else {
      mockSuccessResult = false;
      validationMessage = "This username does not exist in the provided mock-data.";
    }
      
    // 5: pass the boolean as isLoggedIn value back to login.page.ts
    return of({success: mockSuccessResult, message: validationMessage}).pipe(
      delay(1000),
      tap((result) => {
        console.log("SUCCES = ", result.success);
        this.isLoggedIn = result.success;
        console.log("VALIDATION MESSAGE = ", result.message);
        this.triggeredValidationMessage = result.message;
        // save isLoggedIn state in localstorage:
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
      })
    );
  }

  checkLoginStatus(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }
}

/* 

  - login action
    - isLoggedIn = true 
      - go to home page 
      - save state in localstorage --> logged in = dont show login screen (automatic login) 
    - isLoggedIn = false
      - DON'T route to home page! 
      - give validation message ("resultMessages.message" in .json)
  */
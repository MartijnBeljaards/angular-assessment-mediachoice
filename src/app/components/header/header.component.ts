import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-header',
  imports: [LogoutButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

}

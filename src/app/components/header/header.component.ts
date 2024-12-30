import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-header',
  imports: [LogoutButtonComponent],
  template: `
    <header>
      <span>Q90</span>
      <app-logout-button />
    </header>
  `,
  styles: `
    header {
      padding: 0.5rem;
      background-color: #141C37;
      color: #ffffff;
    }
  `
})

export class HeaderComponent {

}

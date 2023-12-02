import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <div class="card flex justify-content-center">
      <p-button label="Check" icon="pi pi-check"></p-button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Angular Start Chat';
}

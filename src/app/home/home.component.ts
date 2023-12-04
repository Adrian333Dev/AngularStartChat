import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService } from '@shared/data-access';
import { MessageListComponent } from './ui';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="container">
      <p-button
        label="Add Message"
        (click)="messageService.addMessage()"
      ></p-button>
      <app-message-list [messages]="messageService.messages()" />
    </div>
  `,
  imports: [MessageListComponent, ButtonModule],
})
export default class HomeComponent {
  messageService = inject(MessageService);
}

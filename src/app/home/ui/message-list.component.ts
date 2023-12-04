import { Component, Input } from '@angular/core';
import { Message } from '@shared/models';

@Component({
  standalone: true,
  selector: 'app-message-list',
  template: `
    <ul class="gradient-bg">
      @for (message of messages; track message.created){
      <li>
        <div class="avatar animate-in-primary">
          <img
            style="width: 100px; height: 100px; object-fit: cover;"
            src="https://api.dicebear.com/7.x/bottts/svg?seed={{
              message.author.split(' ').join('')
            }}"
          />
        </div>
        <div class="message animate-in-secondary">
          <small>{{ message.author }}</small>
          <p>
            {{ message.content }}
          </p>
        </div>
      </li>
      }
    </ul>
  `,
})
export class MessageListComponent {
  @Input({ required: true }) messages!: Message[];
}

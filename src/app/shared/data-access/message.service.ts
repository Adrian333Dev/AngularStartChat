import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { connect } from 'ngxtension/connect';
import { collection, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';

import { FIRESTORE } from '@app.config';
import { Message } from '@shared/models';

interface MessageState {
  messages: Message[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore = inject(FIRESTORE);

  // sources
  messages$ = this.getMessages();

  // state
  private state = signal<MessageState>({
    messages: [],
    error: null,
  });

  // selectors
  messages = computed(() => this.state().messages);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    const nextState$ = merge(
      this.messages$.pipe(
        tap((messages) => console.log(messages)),
        map((messages) => ({ messages }))
      )
    );

    connect(this.state).with(nextState$);
  }

  private getMessages() {
    const messagesCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );

    return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>;
  }

  async addMessage() {
    const messagesCollection = collection(this.firestore, 'messages');

    const firstNames = [
      'Alice',
      'Bob',
      'Carol',
      'Dave',
      'Eve',
      'Frank',
      'Grace',
      'Heidi',
      'Ivan',
      'Judy',
      'Mallory',
      'Oscar',
      'Peggy',
      'Sybil',
      'Trent',
      'Victor',
      'Walter',
    ];
    const lastNames = [
      'Smith',
      'Jones',
      'Brown',
      'Taylor',
      'Davies',
      'Evans',
      'Wilson',
      'Thomas',
      'Roberts',
      'Johnson',
      'Lewis',
      'Walker',
      'Robinson',
      'Wood',
      'Thompson',
      'White',
      'Watson',
      'Jackson',
      'Wright',
      'Green',
    ];
    const messages = [
      'Good question - I am still trying to figure that out!',
      'I work in an office',
      "Full time student and rockin' it!",
      'I am a traveler',
      'Inner and outer peace',
      'A compassionate world',
      'Personal growth',
      'Finding true love',
      'Understanding other people',
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    await addDoc(messagesCollection, {
      author: `${firstName} ${lastName}`,
      content: `${message} by ${firstName} ${lastName}`,
      created: new Date().toISOString(),
    });
  }
}

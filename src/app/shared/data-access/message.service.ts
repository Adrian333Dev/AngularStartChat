import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { connect } from 'ngxtension/connect';
import { collection, query, orderBy, limit } from 'firebase/firestore';
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
}

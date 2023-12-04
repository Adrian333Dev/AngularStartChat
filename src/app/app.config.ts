import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  initializeFirestore,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import { prodEnv } from '@environments';
import { routes } from './app.routes';

const app = initializeApp(prodEnv.firebase);

export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    const auth = getAuth();
    if (prodEnv.useEmulators)
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    return auth;
  },
});

export const FIRESTORE = new InjectionToken('Firebase firestore', {
  providedIn: 'root',
  factory: () => {
    let firestore: Firestore;
    if (prodEnv.useEmulators)
      (firestore = initializeFirestore(app, {})),
        connectFirestoreEmulator(firestore, 'localhost', 8080);
    else firestore = getFirestore();
    return firestore;
  },
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};

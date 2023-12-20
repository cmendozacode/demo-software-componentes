import { NgZone } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';

export function AngularFirestoreProjectHFPE(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseProjectHFPE, 'firebase-project-HFPE', false, null, platformId, zone, null);
}

export function AngularFirestoreProjectHFEB(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseProjectHFEB, 'firebase-project-HFEB', false, null, platformId, zone, null);
}

export function AngularFirestoreProjectHFCH(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseProjectHFCH, 'firebase-project-HFCH', false, null, platformId, zone, null);
}

export function AngularFirestoreProjectHFMX(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseProjectHFMX, 'firebase-project-HFMX', false, null, platformId, zone, null);
}
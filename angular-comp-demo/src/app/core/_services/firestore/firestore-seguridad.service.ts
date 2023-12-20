import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreSeguridadService {

  constructor(private firestore: AngularFirestore) { }

  public getBitacoraCambioHoras(collection: string,formFilter:any) {
    return this.firestore.collection(collection, ref =>ref.where('fechaMovil','>=', formFilter.fechaIni)
    .where('fechaMovil','<=',formFilter.fechaFin)).valueChanges();
  }

}

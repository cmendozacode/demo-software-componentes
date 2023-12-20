import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { environment } from '../../../../../src/environments/environment';

interface DocWithId {id: string;}

@Injectable({
  providedIn: 'root'
})
export class FirestoreManoObraService {

  private readonly nodoFirestore:string = ""//environment.firebaseConfig/*.nodoTareo*/+"";
  private readonly nodoFirestorePacking:string = ""//environment.firebaseConfig/*.nodoTareoPacking*/+"";
  constructor(private firestore: AngularFirestore) { }

  public getTareoSupervisorFecha(tipo:number,fecha:number,grupo:string,supervisor:string) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking, ref => 
      ref.where('fechaCreacion','==', fecha)
      .where('legajoSupervisor',"==",supervisor)
      .where('codGrupoTrabajo',"==",grupo)).valueChanges()
  }

  public getTareoCountFecha(tipo:number,fecha:number,empresaFilter:number) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking, ref => 
      ref.where('empresaId','==',empresaFilter)
      .where('fechaCreacion','==', fecha)
      .orderBy('supervisorId')).get()
  }

  public getTrabajadoresPlanilla<T extends DocWithId>(tipo:number,dateFilter:number,empresaFilter:number,subCollection: string) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking, ref => 
      ref.where('fechaCreacion','==', dateFilter)
      .where('empresaId','==',empresaFilter)).snapshotChanges()
      .pipe(map(this.convertSnapshots),
        map((documents: T[]) =>
          documents.map(document => {
            return this.firestore
             .collection(`${tipo===1?this.nodoFirestore:this.nodoFirestorePacking}/${document.id}/${subCollection}`,refs => refs.where('tieneRestriccion','==',false))
              .snapshotChanges()
              .pipe(map(this.convertSnapshots),
                map(subdocuments =>
                  Object.assign(document, { [subCollection]: subdocuments })
                )
              );
          })
        ),
        flatMap(combined => combineLatest(combined))
      );
  }

  public getTrabajadoresPlanillaNew<T extends DocWithId>(tipo:number,dateFilter:number,empresaFilter:number,subCollection: string) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking , ref => 
      ref.where('fechaCreacion','==', dateFilter)
      .where('empresaId','==',empresaFilter)).get()
      .pipe(map(this.convertSnapshotsX),
        map((documents: T[]) =>
          documents.map(document => {
            return this.firestore
             .collection(`${tipo===1?this.nodoFirestore:this.nodoFirestorePacking}/${document.id}/${subCollection}`,refs => refs.where('tieneRestriccion','==',false).where('status','==',true))
              .get()
              .pipe(map(this.convertSnapshotsX),
                map(subdocuments => Object.assign(document, { [subCollection]: subdocuments }))
              );
          })
        ),
        flatMap(combined => combineLatest(combined))
      );
  }

  public getTrabajadoresPlanillaPaginated<T extends DocWithId>(tipo:number,dateFilter:number,empresaFilter:number,subCollection: string,cantidad:number) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking , ref => 
      ref.where('empresaId','==',empresaFilter)
      .where('fechaCreacion','==', dateFilter)
      .orderBy('supervisorId')
      .limit(cantidad)).get()
      .pipe(map(this.convertSnapshotsX),
        map((documents: T[]) =>
          documents.map(document => {
            return this.firestore
             .collection(`${tipo===1?this.nodoFirestore:this.nodoFirestorePacking}/${document.id}/${subCollection}`,refs => refs.where('tieneRestriccion','==',false).where('status','==',true))
              .get()
              .pipe(map(this.convertSnapshotsX),
                map(subdocuments => Object.assign(document, { [subCollection]: subdocuments }))
              );
          })
        ),
        flatMap(combined => combineLatest(combined))
      );
  }

  public getTrabajadoresPlanillaPaginatedNext<T extends DocWithId>(tipo:number,dateFilter:number,empresaFilter:number,subCollection: string,cantidad:number,documentoPrevio:any) {
    return this.firestore.collection(tipo===1?this.nodoFirestore:this.nodoFirestorePacking , ref => 
      ref.where('empresaId','==',empresaFilter)
      .where('fechaCreacion','==', dateFilter)
      .orderBy('supervisorId')
      .startAfter(documentoPrevio).limit(cantidad)).get()
      .pipe(map(this.convertSnapshotsX),
        map((documents: T[]) =>
          documents.map(document => {
            return this.firestore
             .collection(`${tipo===1?this.nodoFirestore:this.nodoFirestorePacking}/${document.id}/${subCollection}`,refs => refs.where('tieneRestriccion','==',false).where('status','==',true))
              .get()
              .pipe(map(this.convertSnapshotsX),
                map(subdocuments => Object.assign(document, { [subCollection]: subdocuments }))
              );
          })
        ),
        flatMap(combined => combineLatest(combined))
      );
  }

  convertSnapshots<T>(snaps) {
    return <T[]>snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };
    });
  }

  convertSnapshotsX<T>(snaps) {
    return <T[]>snaps.docs.map(snap => {
      return {
        id: snap.id,
        ...snap.data()
      };
    });
  }
}
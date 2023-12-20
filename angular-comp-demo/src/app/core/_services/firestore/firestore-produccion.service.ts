import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { environment } from '../../../../../src/environments/environment';

@Injectable({providedIn: 'root'})
export class FirestoreProduccionService {

  private readonly nodoFirestore:string = ""//environment.firebaseConfig.nodoCosecha+"";
  constructor(private firestore: AngularFirestore) { }

  public getProduccionCampo(filters: any) {
    if(filters.grupo>0){
      return this.firestore.collection(this.nodoFirestore, ref => 
        ref.where('fechaRegistro','>=', filters.fechaIni)
        .where('fechaRegistro','<=',filters.fechaFin)
        .where('empresaId',"in",filters.empresas)
        .where('cultivoId',"==",filters.cultivo)
        .where('grupoId',"==",filters.grupo)
        .orderBy('fechaRegistro')).valueChanges();
    }else{
      return this.firestore.collection(this.nodoFirestore, ref => 
        ref.where('fechaRegistro','>=', filters.fechaIni)
        .where('fechaRegistro','<=',filters.fechaFin)
        .where('empresaId',"in",filters.empresas)
        .where('cultivoId',"==",filters.cultivo)
        .orderBy('fechaRegistro')).valueChanges();
    }
  }

  public getProduccionCampoByZona(filters: any) {
    if(filters.grupo>0){
      return this.firestore.collection(this.nodoFirestore, ref => 
        ref.where('fechaRegistro','>=',filters.fechaIni)
        .where('fechaRegistro','<=',filters.fechaFin)
        .where('empresaId',"in",filters.empresas)
        .where('moduloZona',"==",filters.zona)
        .where('grupoId',"==",filters.grupo)
        .where('cultivoId',"==",filters.cultivo)
        .orderBy('fechaRegistro')).valueChanges();
    }else{
      return this.firestore.collection(this.nodoFirestore, ref => 
        ref.where('fechaRegistro','>=', filters.fechaIni)
        .where('fechaRegistro','<=',filters.fechaFin)
        .where('empresaId',"in",filters.empresas)
        .where('moduloZona',"==",filters.zona)
        .where('cultivoId',"==",filters.cultivo)
        .orderBy('fechaRegistro')).valueChanges();
    }
  }

  public getProduccionCampoByFilter(fecha:number,empresa:number,cultivo:number,grupo:number) {
    return this.firestore.collection(this.nodoFirestore, ref => 
      ref.where('fechaRegistro','==', fecha)
      .where('empresaId',"==",empresa)
      .where('cultivoId',"==",cultivo)
      .where('grupoId',"==",grupo)).get()
  }

  public getProduccionCampoByGrupoFecha(fecha:number,grupo:number,supervisor:number) {
    return this.firestore.collection(this.nodoFirestore, ref => 
      ref.where('fechaRegistro','==', fecha)
      .where('supervisorId',"==",supervisor)
      .where('grupoId',"==",grupo)).get()
  }

  public addProduccionCampoByDoc(data:any){
    return this.firestore.collection(this.nodoFirestore).add(data)
  }

  public updProduccionCampoByDoc(data:any){
    return this.firestore.collection(this.nodoFirestore).doc(data._id).set({ cantidad: data.cantidad, kilos:data.kilos }, { merge: true });
  }

  public delProduccionCampoByDoc(data:any){
    return this.firestore.collection(this.nodoFirestore).doc(data._id).delete();
  }




  public getProduccionCampoCorporativo(filters:any){
    // environment.firebaseConfig = this.getFbConfig(filters.empresaID)
    console.log("ENV",environment)
    const nodoFirestore = ""//environment.firebaseConfig.nodoCosecha
    console.log(nodoFirestore)
    switch(filters.empresaID){
      case 1://HFEB
        filters.empresas = [filters.empresaID] 
        filters.cultivo = 9
        break
      case 3://HFPE
        filters.empresas = [8] 
        filters.cultivo = 1
        break
      default:
        filters.empresas = []
        filters.cultivo = 0
        break
    }
    console.log("Filtros=",filters)
    return this.firestore.collection(nodoFirestore, ref => 
      ref.where('fechaRegistro','>=', filters.fechaIni)
      .where('fechaRegistro','<=',filters.fechaFin)
      .where('empresaId',"in",filters.empresas)
      .where('cultivoId',"==",filters.cultivo)
      .orderBy('fechaRegistro')).valueChanges();    
  }

  public getFbConfig(empresaID:number):any{
    var fbConfig:any = {}
    const nodoTest = "" // "_test"
    const fbConfigHFPE = {
      apiKey: "AIzaSyCj2n_QByKW6Cb7tfV6CwjxNWMrUCW_IlI",
      authDomain: "DEMOWEB-5bce3.firebaseapp.com",
      databaseURL: "https://DEMOWEB-5bce3.firebaseio.com",
      projectId: "DEMOWEB-5bce3",
      storageBucket: "DEMOWEB-5bce3.appspot.com",
      messagingSenderId: "14073094419",
      nodoTareo: 'planillas_tareocampo',
      nodoTareoPacking: 'planillas_tareopacking',
      nodoCosecha: 'registros_cosecha'
    };

    const fbConfigHFEB = {
      apiKey: 'AIzaSyBSU2-Yy9ljbqfycxYzbpPtndZOXTpzRTA',
      authDomain: 'DEMOWEBhfolmos.firebaseapp.com',
      projectId: 'DEMOWEBhfolmos',
      storageBucket: 'DEMOWEBhfolmos.appspot.com',
      messagingSenderId: '481096254766',
      appId: '1:481096254766:web:54ed7ec658d3700e39a6bf',
      measurementId: 'G-04Z50QM2X3',
      nodoTareo: 'planillas_tareocampo',
      nodoTareoPacking: 'planillas_tareopacking',
      nodoCosecha: 'registros_cosecha',
    }

    //1 Olmos 2 Mexico 3 Peru 4 Chile
    switch(empresaID){
      case 1:
        fbConfig = fbConfigHFEB
        break
      case 3:
        fbConfig = fbConfigHFPE
        break
      default:
        fbConfig = {}
        break
    }

    fbConfig.nodoTareo += nodoTest
    fbConfig.nodoTareoPacking += nodoTest
    fbConfig.nodoCosecha += nodoTest

    return fbConfig;
  }


}
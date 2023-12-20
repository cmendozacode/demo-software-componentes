
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

    private readonly nodoFirestore:string = "registros_cosecha"

  constructor(
    @Inject('firebaseProjectHFPE') private firebaseProjectHFPE: AngularFirestore,
    @Inject('firebaseProjectHFEB') private firebaseProjectHFEB: AngularFirestore,
    @Inject('firebaseProjectHFCH') private firebaseProjectHFCH: AngularFirestore,
    @Inject('firebaseProjectHFMX') private firebaseProjectHFMX: AngularFirestore,
  ) { }

  public getProduccionCampoCorporativo(filters:any){
    console.log("Filtros: ", filters)
    switch(+filters.empresas[0]){
        case 1://HFEB
        //   filters.empresas = [filters.empresaID] 
        //   filters.cultivo = 9

          return this.firebaseProjectHFEB.collection(this.nodoFirestore, ref => 
            ref.where('fechaRegistro','>=', filters.fechaIni)
            .where('fechaRegistro','<=',filters.fechaFin)
            .where('empresaId',"in",filters.empresas)
            .where('cultivoId',"==",filters.cultivo)
            .orderBy('fechaRegistro')).valueChanges();  
          break
        case 8://HFPE
        //   filters.empresas = [8] 
        //   filters.cultivo = 1

          return this.firebaseProjectHFPE.collection(this.nodoFirestore, ref => 
            ref.where('fechaRegistro','>=', filters.fechaIni)
            .where('fechaRegistro','<=',filters.fechaFin)
            .where('empresaId',"in",filters.empresas)
            .where('cultivoId',"==",filters.cultivo)
            .orderBy('fechaRegistro')).valueChanges();  
          break
        default:
          filters.empresas = []
          filters.cultivo = 0
          break
    } 
  }

  public getProduccionCampoCorporativoAll(filters:any){
    console.log("Filtros: ", filters)
    const cultivoID = filters.cultivo
    /*
    101 Arandano
    102 Frambuesa
    103 Mora
    104 Cereza
    105 Frutilla
    */
    switch(filters.codEmpresa){
        case "HFEB":
          // filters.empresas = [1] 
          // filters.cultivo = 9
          if(cultivoID > 0){
            if(cultivoID === 101){
              filters.cultivo = 9
            }else{
              filters.cultivo = 0
            }
            // console.log("Filtros: ", filters)
            return this.firebaseProjectHFEB.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();   
          }else{
            return this.firebaseProjectHFEB.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              // .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();  
          }
          break
        case "HFPE":
          // filters.empresas = [8] 
          // filters.cultivo = 1
          if(cultivoID > 0){
            if(cultivoID === 101){
              filters.cultivo = 1
            }else if(cultivoID === 102){
              filters.cultivo = 18
            }else if(cultivoID === 103){
              filters.cultivo = 27
            }else{
              filters.cultivo = 0
            }
            // console.log("Filtros: ", filters)
            return this.firebaseProjectHFPE.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();  
          }else{
            return this.firebaseProjectHFPE.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              // .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();              
          }
          break
        case "HFCH":
          // filters.empresas = [1,5,6,7,8,9,10,11,13,14] 
          // filters.cultivo = 9
          if(cultivoID > 0){
            if(cultivoID === 101){
              filters.cultivo = 9
            }else if(cultivoID === 102){
              filters.cultivo = 12
            }else if(cultivoID === 104){
              filters.cultivo = 13
            }else if(cultivoID === 105){
              filters.cultivo = 14
            }else{
              filters.cultivo = 0
            }
            // console.log("Filtros: ", filters)
            return this.firebaseProjectHFCH.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();              
          }else{
            return this.firebaseProjectHFCH.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              // .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();  
          }
          break
        case "HFMX":
          // filters.empresas = [1,5,6,7,8,9,10,11,13,14] 
          // filters.cultivo = 9
          if(cultivoID > 0){
            if(cultivoID === 101){
              filters.cultivo = 9
            }else if(cultivoID === 102){
              filters.cultivo = 12
            }else if(cultivoID === 103){
              filters.cultivo = 13
            }else{
              filters.cultivo = 0
            }
            // console.log("Filtros: ", filters)
            return this.firebaseProjectHFMX.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();
          }else{
            return this.firebaseProjectHFMX.collection(this.nodoFirestore, ref => 
              ref.where('fechaRegistro','>=', filters.fechaIni)
              .where('fechaRegistro','<=',filters.fechaFin)
              // .where('empresaId',"in",filters.empresas)
              // .where('cultivoId',"==",filters.cultivo)
              .orderBy('fechaRegistro')).valueChanges();
          }
          break
        default:
          filters.empresas = []
          filters.cultivo = 0
          break
    } 
  }
}

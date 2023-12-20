import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CustomStorageService {

  public currentKey:String = null;
  private keySession :string = environment.authTokenKey;

  constructor(){
    this.currentKey = this.loadTokenSession();
  }

  loadTokenSession():String {
      if (localStorage.getItem(this.keySession) === null) {
        return null;
      }else{
        return localStorage.getItem(this.keySession);
      }
  }

  setCurrentToken(key:String) {
      this.currentKey = key;
      localStorage.setItem(this.keySession, JSON.stringify(this.currentKey));
  }

  removeCurrentToken() {
      localStorage.removeItem(this.keySession);
      this.currentKey = null;
  }

  isAuthenticated():boolean {
      return (this.loadTokenSession() != "errorToken") ? true : false; 
  }
}

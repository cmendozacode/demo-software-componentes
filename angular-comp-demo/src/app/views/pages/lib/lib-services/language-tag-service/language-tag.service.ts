import { Component, OnInit, Input,  SimpleChanges, ViewChild , Output, EventEmitter,Injectable  } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

import { locale as enLang } from '../../../../../core/_config/i18n/en';
import { locale as esLang } from '../../../../../core/_config/i18n/es';

@Injectable({
    providedIn: 'root',
  })
export class languageTagService implements OnInit {

 
    fullTags:any;  

    itemControl:any;
    currentLanguage :string ="es";
    jsonDataLanguageTags:any;


    constructor(private httpClient:HttpClient        
        ) {}
    

    ngOnInit() {
        this.fullTags = {};
        this.fullTags['es'] = esLang;
        this.fullTags['en'] = enLang;

      

        console.log('Objeto Estructura');

        this.jsonDataLanguageTags = this.fn_get_language_tags('es');
        console.log(this.jsonDataLanguageTags);
        
      }

      ngOnChanges(changes: SimpleChanges) {
    
        console.log('Objeto Estructura Changes');
        this.jsonDataLanguageTags = this.fn_get_language_tags('es');
        console.log(this.jsonDataLanguageTags);
        
        
      }



   public  fn_get_language_tags(language_code:string):Promise<any>{

         var response =  this.httpClient.//get<any[]>('locale/'+language_code+'/langlogin.json');
        request(
            "GET",
            '../../../../../core/_config/i18n/'+language_code+'.ts', 
            {
                responseType:"json"

            }).toPromise()
            .then((data)=>{
                  console.log(data);
                  return data;
            })
            .catch((err)=>{
                console.log(err);
                return err;
            });
            
         return response;
      }


      public  fn_get_language_tags_ts(language_code:string):any
      {
          this.jsonDataLanguageTags = {};

          if(language_code == 'es'){this.jsonDataLanguageTags = esLang;}
          if(language_code == 'en'){this.jsonDataLanguageTags = enLang;}

          return  this.jsonDataLanguageTags;
      }  


}

// Angular
import { Component , OnInit,OnDestroy,ChangeDetectorRef} from '@angular/core';
import {  AuthService } from '../../../../core/auth';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { EmpresaModel } from '../../../../core/_models/cosecha/empresa.model';
import { select, Store } from '@ngrx/store';
import {  currentEmpresa, currentUser, User } from '../../../../core/auth';
import { AppState } from '../../../../core/reducers';
import { random } from 'lodash';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy { 

	usuario$: Observable<User> = this.store.pipe(select(currentUser));
	empresa$: Observable<EmpresaModel> = this.store.pipe(select(currentEmpresa));

	subscriptions: Subscription[] = [];
	currentUserData:any;
	currentSede:any;
	currentSoftwareProductConfig:any;

	constructor(private cd: ChangeDetectorRef,private store: Store<AppState> ,private auth: AuthService) {}

	ngOnInit() {

         //Load Data User
		 var userObject_txt =  localStorage.getItem("sd_user_data");
		 if(userObject_txt != null && userObject_txt != undefined && userObject_txt != 'undefined' && userObject_txt != '')
		 {	this.currentUserData = JSON.parse(userObject_txt);  }
         
		 //Load Data Software Config
		 var software_products_config_txt =  localStorage.getItem("sd_software_products");
		 if(software_products_config_txt != null && software_products_config_txt != undefined && software_products_config_txt != 'undefined' && software_products_config_txt != '')
		 {	this.currentSoftwareProductConfig = JSON.parse(software_products_config_txt);  }
	 

		 this.subscriptions.push(
			combineLatest([this.empresa$, this.usuario$]).subscribe(([resEmpresa, resUsuario]) => {
			 		
              //Datos Cargados de ToolBar
			   this.currentSede = resEmpresa;
			    

			  this.cd.detectChanges();
  
			}),
			);
	  
 
	  this.cd.detectChanges();
	}

	ngAfterViewInit(): void {   
         //Datos Cargados de ToolBar
		 console.log('Datos en toolbar after');
		 console.log(this.currentSede);
		 console.log(this.currentUserData);
		 console.log(this.currentSoftwareProductConfig);
	}


	ngOnDestroy() {
		this.subscriptions.forEach((e) => e.unsubscribe());
	}

	fn_goToDEMOWEB()
	{
        //Evaluar Consulta:
		  
		var listSoftware = this.currentSoftwareProductConfig['sys_software_product'];
		var listSoftwareSize = Object.keys(listSoftware).length;
        var objSoftware = {};
		var objSoftwareConfig = null;
          
		for(var i=0; i<listSoftwareSize; i++ ){ 
			var eConfig= listSoftware[i];
			if(eConfig['code'] == 'DEMOWEB')
			{ objSoftware = eConfig; break; }		 
	    }

		var listSoftwareConfig = objSoftware['config'];
		var listSoftwareConfigSize =  Object.keys(listSoftwareConfig).length;
		for(var i=0; i<listSoftwareConfigSize; i++ ){ 
			var eConfig= listSoftwareConfig[i];
			if(eConfig['parameter_05'] == this.currentSede['empresaKeyCode'])
			{ objSoftwareConfig = eConfig; break; }			
		}


		//var requestBody = {"object_parameters":{ "user_name":"admin"},"sql_connection_string":"Driver={ODBC Driver 17 for SQL Server};Server=tcp:10.45.0.218,1433;Database=BDGenesys;Uid=u_desarrollo;Pwd=d3s4rr0ll0Y4pu$;Encrypt=yes;TrustServerCertificate=yes;Connection Timeout=30;"}
		var objRequestBody = {"object_parameters":{ "user_name": this.currentUserData['user_name']},"sql_connection_string":objSoftwareConfig['parameter_02']};
		var objHeader = {'user_name':this.currentUserData['user_name'],'company_id':''+this.currentUserData['company_id'],'user_token_session':this.currentUserData['token_session']};


		if(objSoftwareConfig != null && objSoftwareConfig['parameter_02'] != null && objSoftwareConfig['parameter_02'] != undefined)
		{
        //Load Datos
        var objResult=   Promise.resolve()
        .then((res) => {  

		var objResponse = this.auth.getSoftwareGetAuthDEMOWEB(objRequestBody, objHeader).toPromise().then(
				response => {

				    var lsize = Object.keys(response).length;
                    if(lsize>0)
					{
                      var objRemoteUser = response[0];
					  return objRemoteUser;
					}
					else{ alert('Lo sentimos pero no se logro encontrar sus credenciales para este sistema'); }
 
				});

			return objResponse;
        })
		.then((res) => {  	

			var objRemoteUser = res;

			if(objRemoteUser != null && objRemoteUser['vc_usuw_login'] != null && objRemoteUser['vc_usuw_login'] != undefined)
			{
				var objectAuth = {};

				  objectAuth['username'] = objRemoteUser['vc_usuw_login'];
				  objectAuth['password'] = objRemoteUser['user_password'];
				  objectAuth['keycode']  = Math.random();
			 
			    var objectAuth_txt = JSON.stringify(objectAuth);
				var objectAuth_encoded = window.btoa(objectAuth_txt);

				var externalSystemUrl = '';
				externalSystemUrl = objSoftwareConfig['parameter_01']+objectAuth_encoded;
				

				window.open(externalSystemUrl, "_blank");

			}



		})
        .catch((err) => {
          console.log(err.message); // something bad happened      
        });

     	}
		else
		{ alert('Lo sentimos pero esta configurado aun este acceso Correctamente'); }

        //alert('Llamada a Funcion');

	}

}

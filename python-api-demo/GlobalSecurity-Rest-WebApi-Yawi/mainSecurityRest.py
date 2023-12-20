import json
import os

from data_structure.system_data_structures import system_data_structures

from data_connector.microsoft_sql import microsoft_sql_connector

from BusinessObject.generic_object import GenericObjectBO
from BusinessObject.userBO import UserBO
from BusinessObject.logon import LogonBO

import base64

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from rest import generic

from mangum import Mangum

app = FastAPI()
router = APIRouter()



origins = ["http://localhost","http://localhost:4200,*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
    



app.include_router(generic.router, prefix='/SeguridadRestAPI/root', tags=['root'])




#lambda_handler = Mangum(app=app)


def lambda_handler(event, context):
    
    
    httpMethod                = event['httpMethod']
    httpHeaders               = event['headers']
    httpqueryStringParameters = event['queryStringParameters']
    httpBody                  = event['body']
    #httpBody  = json.loads(event['body'])
    httpBodyJson = None
    

    
    if httpBody :
        httpBodyJson  = json.loads(httpBody)
      
    
    reponseObject = None
    
    
    print(httpMethod)
    print(httpHeaders)
    print(httpqueryStringParameters)
    print(httpBody)
    
    ##LOAD GLOBAL VARIABLES
    
    #VAR : Desde Enviroment
    sqlconnection         = os.environ["DATABASE_AGRILYTICS"]
    str_login_object_name       = "security_user_logon"
    str_login_token_object_name = "security_user_token_session_ms" 
    str_table_index_object_name = "dbsecurity_table_indices"
    str_database_region         = "us-east-1"
    
    valueTokenValidFlag  = False
    
    
    #VAR : HttpRequest
    object_name        = httpHeaders['object_name'] if 'object_name'  in httpHeaders else None
    user_token_session = httpHeaders['user_token_session'] if 'user_token_session'  in httpHeaders else None
    http_method_name   = httpHeaders['custom_method'] if 'custom_method'  in httpHeaders else None
    
    
    #Ejecutar Metodo Login
    if http_method_name == 'login' and httpBodyJson is not None:
        print("login")
        
        object_data_connector = LogonBO(sqlconnection,str_table_index_object_name,str_database_region,str_login_object_name,str_login_token_object_name)
        
        object_parameters     = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
        
        reponseObject = object_data_connector.fn_auth_login(object_parameters)
    
    

    
    
    #Evaluar Token Sesion
    
    if user_token_session is not None and valueTokenValidFlag == False :
        print("token")
        
        object_data_connector_token = LogonBO(sqlconnection,str_table_index_object_name,str_database_region,str_login_object_name,str_login_token_object_name)
        
        vv_user_name = httpHeaders['user_name'] if 'user_name'  in httpHeaders else None
        vn_company_id = httpHeaders['company_id'] if 'company_id'  in httpHeaders else None
        
        
        if vv_user_name  is not None and vn_company_id is not None:
            object_parameters = {}
            object_parameters['user_name'] = vv_user_name
            object_parameters['company_id'] = vn_company_id
            object_parameters['token_value'] = user_token_session
            logonUserTokenData, valueTokenFoundFlag, valueTokenValidFlag = object_data_connector_token.fn_validate_user_session_token(object_parameters)

    
    
    print("Antes de Evaluar Flag")
    
    #Respuesta si el token de usuario ya no es valido
    if user_token_session is not None and valueTokenValidFlag == False :
        print("Invalid token")
        return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,user_token_session,custom_method,user_name,company_id,object_name',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        'body': 'El Token no es valido o ya vencio' 
        }

    
    
    #Ejecutar Metodo Get Systems by Subscription
    if http_method_name == 'securitysubscription' and httpBodyJson is not None and valueTokenValidFlag:
        print("securitysubscription")
        
        object_data_connector = LogonBO(sqlconnection,str_table_index_object_name,str_database_region,str_login_object_name,str_login_token_object_name)
        
        object_parameters     = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
        
        reponseObject = object_data_connector.fn_auth_login_subscription(object_parameters,"system_subscription")
    
        
   
   
    
    #Ejecutar Metodo Get Grants Structure
    if http_method_name == 'securitygrants' and httpBodyJson is not None and valueTokenValidFlag:
        print("securitygrants")
        object_data_connector = LogonBO(sqlconnection,str_table_index_object_name,str_database_region,str_login_object_name,str_login_token_object_name)
        
        object_parameters     = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
        
        reponseObject = object_data_connector.fn_auth_login_software(object_parameters,"security_user_grants")
        
    

    
    
    #Ejecutar Metodos - Genericos
    if http_method_name is None and httpBodyJson is not None and valueTokenValidFlag:
        print("regular request")
        
        if object_name in ["security.user_all","security_user_logon"]:
            object_data_connector = UserBO(object_name,sqlconnection)
        else:
            object_data_connector = GenericObjectBO(object_name,sqlconnection)
            
    
        if httpMethod  in ['GET','DELETE']:
            object_parameters      = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
            object_where_condition = httpBodyJson["where_condition"] if "where_condition" in httpBodyJson else None
            reponseObject  = object_data_connector.fn_rest_object(httpMethod,object_parameters,object_where_condition)
        
        if httpMethod  in ['POST']:
            object_parameters      = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
            reponseObject  = object_data_connector.fn_rest_object(httpMethod,object_parameters)
        
                
        if httpMethod  in ['PUT']:
            object_parameters      = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
            object_put_parameters  = httpBodyJson["object_put_parameters"] if "object_put_parameters" in httpBodyJson else {}
            object_where_condition = httpBodyJson["where_condition"] if "where_condition" in httpBodyJson else None
            flag_select            = httpBodyJson["flag_select"] if "flag_select" in httpBodyJson else False
            
            reponseObject  = object_data_connector.fn_rest_object(httpMethod,object_parameters,object_put_parameters,object_where_condition,flag_select)        
    
    
    
    
    
    
    # TODO implement
    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,user_token_session,custom_method,user_name,company_id,object_name',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        'body': reponseObject
    }
    
    

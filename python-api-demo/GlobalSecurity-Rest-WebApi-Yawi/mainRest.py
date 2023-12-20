import json
import os

from data_structure.system_data_structures import system_data_structures

from data_connector.microsoft_sql import microsoft_sql_connector

from BusinessObject.generic_object import GenericObjectBO
import base64

 
def lambda_handler(event, context):
    
    
    
    httpMethod                = event['httpMethod']
    httpHeaders               = event['headers']
    httpqueryStringParameters = event['queryStringParameters']
    httpBody                  = event['body']
    #httpBody  = json.loads(event['body'])
    httpBodyJson = None
    

    
    if httpBody :
        httpBodyJson  = json.loads(httpBody)
      
    
    reponseObject = {}
    
    
    print(httpMethod)
    print(httpHeaders)
    print(httpqueryStringParameters)
    print(httpBody)
    
    ##LOAD GLOBAL VARIABLES
    
    #VAR : Desde Enviroment
    sqlconnection = os.environ["DATABASE_AGRILYTICS"]
    
    #VAR : HttpRequest
    object_name   = httpHeaders['object_name']
    
    
    
    #Ejecutar Metodos
    if httpBodyJson is not None:
        
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
        'body': reponseObject
    }
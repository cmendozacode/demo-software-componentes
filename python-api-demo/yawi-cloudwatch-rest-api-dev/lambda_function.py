import json
import os
import time
import copy
import sys
import io
import os
import logging
import boto3


from datetime import timedelta
from datetime import datetime
from dateutil.tz import tzlocal


from data_structure.system_data_structures import system_data_structures
from data_connector.aws_athenas import aws_athenas_sql_connector
from data_connector.dynamodb import dynamodb_connector

from BusinessObject.generic_object import GenericObjectBO
import base64


def lambda_handler(event, context):
    # TODO implement
    
    httpMethod                = event['httpMethod']
    httpHeaders               = event['headers']
    httpqueryStringParameters = event['queryStringParameters']
    httpBody                  = event['body']
    
    httpBodyJson = None
    reponseObject = None

    if httpBody :
        httpBodyJson  = json.loads(httpBody)
    
    
    
    #VAR : HttpRequest
    object_name        = httpHeaders['object_name'] if 'object_name'  in httpHeaders else None
    #object_name        = 'cloudwatch_metricas_qry'
    http_method_name   = httpHeaders['custom_method'] if 'custom_method'  in httpHeaders else None
    tmphttpMethod      = httpHeaders['http_method'] if 'http_method'  in httpHeaders else None
    
    if tmphttpMethod is not None: 
        httpMethod = tmphttpMethod
           
    objOutputLocation     = os.environ['S3_BUCKET_PATH_ATHENA_QUERY']
    #objOutputLocation = "s3://yawi-cloudwatch-logs-dev/output_athena_query/query/"
    object_data_connector = GenericObjectBO(object_name,None,None,None,objOutputLocation)
    
        
    if httpMethod  in ['GET']:
        print(httpMethod)
        object_parameters      = httpBodyJson["object_parameters"] if "object_parameters" in httpBodyJson else {}
        object_where_condition = httpBodyJson["where_condition"] if "where_condition" in httpBodyJson else None
        print('Datos Parametros::')
        print(object_parameters)
        print(object_where_condition)
        
        reponseObject          = object_data_connector.fn_rest_object(httpMethod,object_parameters,object_where_condition)
        
    
    
    # TODO implement
    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,user_token_session,custom_method,user_name,company_id,object_name,http_method',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        'body': reponseObject
    }
    
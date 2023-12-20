import json
import os

from data_structure.system_data_structures import system_data_structures

from data_connector.microsoft_sql import microsoft_sql_connector
from data_connector.dynamodb import dynamodb_connector

from BusinessObject.generic_object import GenericObjectBO
import base64

 
def lambda_handler(event, context):
    
    
    #load cadena de conexion
    sqlconnection       = os.environ["DATABASE_AGRILYTICS"]
    
    objDataSysStructure = system_data_structures()
    
    
    #varObj1 = objDataSysStructure.fun_get_structure('security.system_information_all')
    #varObj2 = objDataSysStructure.fun_get_structure('system_information_v')
    #varObj3 = objDataSysStructure.fun_get_structure('[dbo].[Empresa]')
    
    #print(varObj1)
    #print(varObj2)
    
    #Parametros
    #vvMethod = 'GET'
    #parameters_obj = {'id':4, 'code':'SYSBASE01'}
    #parameters_obj = {'created_date':['2021-11-01T11:30:00.000Z','2021-11-02T08:30:00.000Z']}
    #object_name = 'security.system_information_all'
    
    #object_data_connector = GenericObjectBO(object_name,sqlconnection)
    #print("Antes de ingresar ") 
    #responseData = object_data_connector.fn_rest_object(vvMethod,parameters_obj)
    print("")  
    print("#SELECT TEST DATA")  
    print("")
    
    #print(responseData)
    
    #Dynamo TEST
    varObjDyna = objDataSysStructure.fun_get_structure('dbsecurity_company_dynamo')
    obj_connector_dy = dynamodb_connector(varObjDyna,"dbsecurity_table_indices","us-east-1")
    
    #INSERT
    parameters_obj = {"id":0,"code":"PEOPLESAKE", "name":"Peoplesake", "legal_name":"Peoplesake", "company_number":"4444","fiscal_address":"","country":"CHILE","city":"Santiago", "status":True,"start_date":"2021-12-01", "created_by":"cmendoza","created_date":"2021-11-01 12:30"}
    objInsert = obj_connector_dy.fn_execute_insert(parameters_obj)
    
    print("#OBJETO DATOS INSERT")  
    print(objInsert)
    
    #UPDATE
    #parameters_put_obj = { "legal_name":"Hortifrut UPDATE", "company_number":"4444 55","fiscal_address":"sara maGDUGAL", "last_updated_by":"cmendoza","last_updated_date":"2021-11-21 12:30"}
    parameters_obj = {"id":1}  #,"code":"HORTIFRUT"}
    
    #curItemKeys, curItemPut, var_put  = obj_connector_dy.fn_get_put(parameters_put_obj,parameters_obj,None)
    #print("#OBJETO DATOS UPDATE OBJECTS")
    #print(curItemKeys)
    #print(curItemPut)
    #print(var_put)
    #print("-")
    #objUpdate = obj_connector_dy.fn_execute_update(parameters_put_obj,parameters_obj,None,False)
    
    #print("#OBJETO DATOS UPDATE")  
    #print(objUpdate)   
    
    
    #print("#OBJETO DATOS SELECT 6")  
    #parameters_obj = {"id":1 }
    #parameters_obj = {"code":"HORTIFRUT"}
    
    #var_query,curItemSelect, var_where , curItemWhere ,flagQuery,var_where_keys, curItemWhere_keys = obj_connector_dy.fn_get_query(parameters_obj,None)
    
    #print("#OBJETO DATOS SELECT PARAMETROS")
    #print(var_query)
    #print(curItemSelect)
    #print(var_where)
    #print(curItemWhere)
    #print(flagQuery)
    #print(var_where_keys)
    #print(curItemWhere_keys)
    
    
    #objQuery = obj_connector_dy.fn_execute_select_query(parameters_obj,None)
    
    #print("#OBJETO DATOS SELECT RESULTADOS")
    #print(objQuery)
    
    print("#OBJETO DATOS DELETE PARAMETROS")
    objDelete = obj_connector_dy.fn_execute_delete(parameters_obj,None)
    print(objDelete)
    
    
    
    #TESTs
    #Token => x-api-key : KYBSSvr2pe7iXO1c0xJjX27gCl9nY8ij93naFGdy
    
    #GET 1
    object_name = "security.system_information_all"
    body_json = {"object_parameters":{"created_date":["2021-11-01T11:30:00.000Z","2021-11-02T08:30:00.000Z"]}}
    
    #GET 2 
    object_name = "[dbo].[Empresa]"
    body_json = {"object_parameters":{"empresa_id":[1,3] }}
    
    #POST 1
    object_name = "security.system_information_all"
    body_json = {"object_parameters":{"id":1,"code":"SYSBASE09", "name":"Sistema Base 44", "description":"", "status":1, "created_by":"cmendoza","created_date":"2021-11-02 12:30"}}
        
    #PUT 1   
    object_name = "security.system_information_all"
    body_json = {"object_parameters":{"id":4,"code":"SYSBASE01", "status":1} , "object_put_parameters":{"name":"Sistema Base UPDATE09", "description":"descripcion 9",  "last_updated_by":"cmendoza","last_updated_date":"2021-11-04 17:30"}, "flag_select":True}
        
    #DELETE 1
    object_name = "security.system_information_all"
    body_json = {"object_parameters":{"id":24}}
    
    #GET QUERY RAW
    object_name = "empresa_raw1"
    body_json = {"object_parameters":{"empresa_id":6 }}
      
    
    
    #parameters_obj = {'id':1, 'code':'data01', 'name':'%dataparam%'}
    
    #obj_connector = microsoft_sql_connector(varObj1,sqlconnection)
 
    #print("#INSERT")  
    #var_select,var_where = obj_connector.fn_get_query(parameters_obj,None)
    #print(var_select)
    #print(var_where)
 
    #print("#POST")    
    #var_insert,var_values = obj_connector.fn_get_post(parameters_obj)
    
    #print(var_insert)
    #print(var_values)  
    
        
        
    #Test query     
    #parameters_obj_v3 = {"empresa_id":[1,3] }
    #obj_connector_v3 = microsoft_sql_connector(varObj3,sqlconnection)
    
    #print("data 3: Txt ") 
    #dataresult_v3_script = obj_connector_v3.fn_get_query(parameters_obj_v3,"AND")
    #print(dataresult_v3_script)
    
    #print("data 3: ")
    #dataresult_v3 = obj_connector_v3.fn_execute_select_query(parameters_obj_v3,"AND")
    #print("data result 3: ")
    #print(dataresult_v3)  
    
    #Select RAW
    #sql_raw_txt = "SELECT empresa_id,nombre,group_empresa_id,emp_code FROM [dbo].[Empresa] where empresa_id = ?;"
    #dataresult_v3 = obj_connector_v3.fn_execute_select_raw_query(sql_raw_txt,[7])
    #print("data result RAW Query: ")
    #print(dataresult_v3)    
    
    
    
    #insesrt data
    #parameters_obj_insert_v1 = {"id":1,"code":"SYSBASE02", "name":"Sistema Base 2", "description":"", "status":1, "created_by":"cmendoza","created_date":"2021-11-02 12:30"}
    #print("#INSERT DATA")    
    #var_insert,var_values = obj_connector.fn_get_post(parameters_obj_insert_v1)
    #print(var_insert)
    #print(var_values)   
    #dataresult_insert = obj_connector.fn_execute_insert(parameters_obj_insert_v1)
    #print(dataresult_insert)
    
    
    #print("")  
    #print("#UPDATE DATA")  
    #print("")
    #parameters_obj_update_data = {"name":"Sistema Base UPDATE01", "description":"descripcion 1",  "last_updated_by":"cmendoza","last_updated_date":"2021-11-02 12:30"}
    #parameters_obj_update_where = {"id":4,"code":"SYSBASE01", "status":1}
    
    #print("#PUT")
    #var_put,var_where = obj_connector.fn_get_put(parameters_obj_update_data,parameters_obj_update_where,None)
    #print(var_put)
    #print(var_where)     
    #dataresult_update = obj_connector.fn_execute_update(parameters_obj_update_data,parameters_obj_update_where,None)
    #print(dataresult_update)
     
    
    #print("")  
    #print("#UPDATE DATA 2")  
    #print("")
    #parameters_obj_update_where2 = {"id":22}
    #dataresult_update2 = obj_connector.fn_execute_update(parameters_obj_update_data,parameters_obj_update_where2,None,True)
    #print(dataresult_update2)    
    
    
    #print("")   
    #print("#DELETE DATA")  
    #print("")
    
    #parameters_obj_delete_where = {"id":24}
    #print("#DELETE")
    #var_delete,var_where = obj_connector.fn_get_delete(parameters_obj_delete_where,None)
    #print(var_delete)
    #print(var_where)
    #dataresult_delete = obj_connector.fn_execute_delete(parameters_obj_delete_where,None)
    #print(dataresult_delete)
     
    
    #print("")   
    #print("#PROCEDURE DATA")  
    #print("")
    #parameters_obj_procedure = {"vn_empresa_id":5,"vv_result":"vv_result"}
    #varObj4 = objDataSysStructure.fun_get_structure('prc_test_process')
    #obj_connector_prc = microsoft_sql_connector(varObj4,sqlconnection)
    
    #var_procedure = obj_connector_prc.fn_get_procedure_script(parameters_obj_procedure)
    #print(var_procedure)
    #print("")
    
    #dataresult_procedure = obj_connector_prc.fn_execute_sql_procedure(parameters_obj_procedure)
    #print("ExportDato PRC BEGIN")
    #print(dataresult_procedure)
    #print("ExportDato PRC END")
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

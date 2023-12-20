
from typing import Iterable, Optional
from data_connector.microsoft_sql import microsoft_sql_connector
from data_connector.dynamodb import dynamodb_connector

from data_structure.system_data_structures import system_data_structures


class data_connector():
    
    def __init__(self, obj_name, str_connection: Optional[str] = None, str_table_index: Optional[str] = None, str_region: Optional[str] = None):
        
        super(data_connector,self).__init__()

        objDataSysStructure = system_data_structures()
        print("aki vamos")
        print(obj_name)
        self.data_structure = objDataSysStructure.fun_get_structure(obj_name)
        print(self.data_structure)
        self.str_connection = str_connection
        self.obj_cur_data_connection = None
        
        if self.data_structure['connector'] == "microsoft_sql":
            self.obj_cur_data_connection = microsoft_sql_connector(self.data_structure,self.str_connection)

        if self.data_structure['connector'] == "dynamodb":
            self.obj_cur_data_connection = dynamodb_connector(self.data_structure,str_table_index,str_region)
         
    
    
    #SET DATOS STRUCTURE
    def fn_set_data_structure(self, obj_data_structure ): 
        
        self.data_structure = obj_data_structure
        
    def fn_get_data_structure(self ): 
        
        return self.data_structure 
        
    
            
    #GET FUNCTION   
    def fn_get_function(self,obj_parameters, type_condition: Optional[str] = "AND"):

        obj_response = None
        
        if self.data_structure['connector'] == "microsoft_sql":
            if self.data_structure['type'] in ["table","query"]:
                obj_response = self.obj_cur_data_connection.fn_execute_select_query(obj_parameters,type_condition)
            
            if self.data_structure['type'] in ["procedure"]:
                obj_response = self.obj_cur_data_connection.fn_execute_sql_procedure(obj_parameters)
                
            if self.data_structure['type'] in ["queryraw"]:
                obj_response = self.obj_cur_data_connection.fn_execute_select_raw_query(obj_parameters)    
        
        
        if self.data_structure['connector'] == "dynamodb":
            if self.data_structure['type'] in ["table","query"]:
                obj_response = self.obj_cur_data_connection.fn_execute_select_query(obj_parameters,type_condition)
            
        
        
        return obj_response
        
        
            
    #POST FUNCTION   
    def fn_post_function(self,obj_parameters):
        
        obj_response = None
        
        if self.data_structure['connector'] == "microsoft_sql":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_insert(obj_parameters)
        
            if self.data_structure['type'] in ["procedure"]:
                obj_response = self.obj_cur_data_connection.fn_execute_sql_procedure(obj_parameters)           
 
        if self.data_structure['connector'] == "dynamodb":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_insert(obj_parameters)        
        
        return obj_response
            
    
    
            
    #PUT FUNCTION   
    def fn_put_function(self,obj_parameters,obj_put_parameters, type_condition: Optional[str] = "AND",flag_select: Optional[bool] = False):
        
        obj_response = None
        
        if self.data_structure['connector'] == "microsoft_sql":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_update(obj_put_parameters,obj_parameters,type_condition,flag_select)
        
        if self.data_structure['connector'] == "dynamodb":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_update(obj_put_parameters,obj_parameters,type_condition,flag_select)
        
                        
 
        return obj_response
        
    
    #DELETE FUNCTION   
    def fn_delete_function(self,obj_parameters, type_condition: Optional[str] = "AND"):
        
        obj_response = None
        
        if self.data_structure['connector'] == "microsoft_sql":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_delete(obj_parameters,type_condition)
        
        if self.data_structure['connector'] == "dynamodb":
            if self.data_structure['type'] in ["table"]:
                obj_response = self.obj_cur_data_connection.fn_execute_delete(obj_parameters,type_condition)
                
        
        return obj_response
        
        
 
    
    
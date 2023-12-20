import json
import base64
from datetime import datetime
from datetime import timedelta
from typing import Iterable, Optional
from data_connector.data_connector import data_connector
from BusinessObject.generic_object import GenericObjectBO
from BusinessObject.userBO import UserBO

import random

import copy

from data_structure.system_data_structures import system_data_structures


class RemoteQueryBO():
    
    def __init__(self):
        super(RemoteQueryBO,self).__init__()
        
        self.objDataSysStructure = system_data_structures()
    
    
    def fn_get_query_sql(self,object_body,  str_object_name: Optional[str] = None):
        
        reponseObject = None
        
        object_parameters      = object_body["object_parameters"] if "object_parameters" in object_body else {}
        object_where_condition = object_body["where_condition"] if "where_condition" in object_body else None
        str_connection         = object_body["sql_connection_string"] if "sql_connection_string" in object_body else None
        
        if str_connection is not None:
            
            self.str_connection  = str_connection
            self.str_object_name = str_object_name
        
            #Generate Token
            object_data_connector = GenericObjectBO(self.str_object_name,self.str_connection)
        
            reponseObject  = object_data_connector.fn_rest_object('GET',object_parameters,object_where_condition)        
        
        return reponseObject
        

import json
from data_connector.data_connector import data_connector

class GenericObjectBO():
    
    def __init__(self, *args):
        super(GenericObjectBO,self).__init__()
        
        self.obj_data_connector = None
        flagParam = False
        maxNroParams = 0
        for Idx, curParm in enumerate(args):
            maxNroParams = Idx
            flagParam = True
            
        if flagParam :
            self.obj_data_connector = data_connector(*args)
            
    
    #SET DATOS STRUCTURE
    def fn_set_data_structure(self, obj_data_structure ): 
        
        self.obj_data_connector.fn_set_data_structure( obj_data_structure )
    
    def fn_get_data_structure(self ): 
        
        return self.obj_data_connector.fn_get_data_structure()        
            
        
    def fn_rest_object(self,pRestMethod,*args):
        
        responseRestBase = None
        
        responseRestBase = self.fn_rest_object_internal(pRestMethod,*args)
        
        #Convertir a JSON
        responseRest = json.dumps(responseRestBase) 
        
        return responseRest        

    
        
    def fn_rest_object_internal(self,pRestMethod,*args):

        responseRestBase = None
        
        flagParam = False
        for Idx, curParm in enumerate(args):
            flagParam = True
        
        #Seleccion de Metodos
        if pRestMethod == "GET" and flagParam:
            responseRestBase = self.obj_data_connector.fn_get_function(*args)
            
        if pRestMethod == "POST" and flagParam:
            responseRestBase = self.obj_data_connector.fn_post_function(*args)
            
        if pRestMethod == "PUT" and flagParam:
            responseRestBase = self.obj_data_connector.fn_put_function(*args)                        
            
        if pRestMethod == "DELETE" and flagParam:
            responseRestBase = self.obj_data_connector.fn_delete_function(*args)             
        
        
        
        return responseRestBase


import json
import base64
from data_connector.data_connector import data_connector

class UserBO():
    
    def __init__(self, *args):
        super(UserBO,self).__init__()
        
        self.obj_data_connector = None
        flagParam = False
        maxNroParams = 0
        for Idx, curParm in enumerate(args):
            maxNroParams = Idx
            flagParam = True
            
        if flagParam :
            self.obj_data_connector = data_connector(*args)
            


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
            
            obj_parameters  = self.fn_encode_password(args[0])
            l_args = list(args)
            l_args[0] = obj_parameters
            t_args = tuple(l_args)
            responseRestBase = self.obj_data_connector.fn_get_function(*t_args)
            listResponseRestBase = []
            for curItem in responseRestBase:
                curItem = self.fn_decode_password(curItem)
                curItem["password"] = "..."
                listResponseRestBase.append(curItem)
            responseRestBase = listResponseRestBase
            
        if pRestMethod == "POST" and flagParam:
            obj_parameters   = self.fn_encode_password(*args) # Tiene aqui un solo Parametro: obj_parameters
            responseRestBase = self.obj_data_connector.fn_post_function(obj_parameters)
            
        if pRestMethod == "PUT" and flagParam:
            obj_put_parameters  = self.fn_encode_password(args[1]) # Los Datos de Actualizacion estan en el  Segundo Parametro: obj_put_parameters
            l_args = list(args)
            l_args[1] = obj_put_parameters
            t_args = tuple(l_args)
            responseRestBase = self.obj_data_connector.fn_put_function(*t_args)                        
            
        if pRestMethod == "DELETE" and flagParam:
            responseRestBase = self.obj_data_connector.fn_delete_function(*args)             
        

        return responseRestBase
        
        
        
    def fn_encode_password(self, object_user):
        
        if 'password' in object_user and object_user['password'] is not None :
            
            message_pswrd = object_user['password']
            message_bytes = message_pswrd.encode('ascii')
            base64_bytes = base64.b64encode(message_bytes)
            base64_message = base64_bytes.decode('ascii')
        
            object_user['password'] = base64_message
        
        return object_user


    def fn_decode_password(self, object_user):
        
        if 'password' in object_user and object_user['password'] is not None :
            
            message_coded_pswrd = object_user['password']
            message_coded_bytes = message_coded_pswrd.encode('ascii')
            message_bytes = base64.b64decode(message_coded_bytes)
            message = message_bytes.decode('ascii')
        
            object_user['password'] = message
        
        return object_user
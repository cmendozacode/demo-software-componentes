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


class LogonBO():
    
    def __init__(self, str_connection: Optional[str] = None, str_table_index: Optional[str] = None, str_region: Optional[str] = None, str_login_object_name: Optional[str] = None, str_login_token: Optional[str] = None):
        super(LogonBO,self).__init__()
        
        self.str_connection    = str_connection
        self.str_table_index   = str_table_index
        self.str_region        = str_region
        
        self.str_login_object_name = str_login_object_name
        self.str_login_token = str_login_token
        
        self.objDataSysStructure = system_data_structures()
        

    def fn_auth_login(self, obj_parameters):
        
        var_login_object_name = self.str_login_object_name
        var_login_token       = self.str_login_token
        
        #Recover Data de Usuario
        logonUserData = None
        object_data_connector = UserBO(var_login_object_name,self.str_connection,self.str_table_index,self.str_region)
        object_data_connector_token = None
        
        listUserData          = object_data_connector.fn_rest_object_internal("GET",obj_parameters,None)
        lsizeuser             = len(listUserData)
        lsizetoken  = 0
        obj_token_parameters  = {}
        
        valueTokenFoundFlag = False
        valueTokenValidFlag = False
        logonUserTokenData  = None
        
        if lsizeuser > 0:

            #Generate Token
            object_data_connector_token = GenericObjectBO(var_login_token,self.str_connection,self.str_table_index,self.str_region)
            
            #User Data
            logonUserData  = listUserData[0]
            obj_token_parameters  = {}
            obj_token_parameters['user_name']  = logonUserData['user_name']
            obj_token_parameters['company_id'] = logonUserData['company_id']
            logonUserTokenData, valueTokenFoundFlag, valueTokenValidFlag = self.fn_get_user_current_token(object_data_connector_token, obj_token_parameters)

        else:
            logonUserData = {}
            logonUserData['token_session'] = ''
            logonUserData['auth_status'] = False
            logonUserData['auth_message'] = 'wrong_user_or_password'
            responseRest = json.dumps(logonUserData) 
        
            return responseRest
        
        
        
        valueToken = ""
        
        if valueTokenFoundFlag and valueTokenValidFlag:
            valueToken          = logonUserTokenData['token_value']
        else:
            valueToken          = self.fn_generate_user_token(object_data_connector_token,logonUserData,valueTokenFoundFlag,valueTokenValidFlag)
            
        
        logonUserData['token_session'] = valueToken
        logonUserData['auth_status'] = True
        
        
        #Convertir a JSON
        responseRest = json.dumps(logonUserData) 
        
        return responseRest
        
        


    #Token Validate Current Token
    def fn_validate_user_session_token(self, obj_user_data):
        
        object_data_connector = GenericObjectBO(self.str_login_token,self.str_connection,self.str_table_index,self.str_region)
        
        logonUserTokenData, valueTokenFoundFlag, valueTokenValidFlag = self.fn_get_user_current_token(object_data_connector, obj_user_data)
        
        return logonUserTokenData, valueTokenFoundFlag, valueTokenValidFlag 




    #Token Current Datos   
    def fn_get_user_current_token(self, object_data_connector, obj_token_parameters):
        
        valueTokenFoundFlag = False
        valueTokenValidFlag = False
        logonUserTokenData  = None
        
        vd_start_date   = None
        vd_end_date     = None
        vd_current_date = datetime.utcnow() - timedelta(hours=5, minutes=0)
        
        listUserTokenData   = object_data_connector.fn_rest_object_internal("GET",obj_token_parameters,None)
        lsizetoken = len(listUserTokenData)

        if lsizetoken > 0:
            valueTokenFoundFlag = True
            logonUserTokenData  = listUserTokenData[0]
            vd_start_date = datetime.strptime(logonUserTokenData['start_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
            vd_end_date   = datetime.strptime(logonUserTokenData['end_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        
        if vd_start_date is not None and vd_current_date > vd_start_date and vd_current_date < vd_end_date:
            valueTokenValidFlag = True
            
        return logonUserTokenData, valueTokenFoundFlag, valueTokenValidFlag
        
    
    
    
    
    #Token Datos   
    def fn_generate_user_token(self,object_data_connector, obj_parameters, valueTokenFoundFlag, valueTokenValidFlag):
        
        vvtoken_session = ""
        
        #random.seed(1)  #Esto es Para obligar a dar 1 mismo valor todas las veces
        
        vvtoken_session = self.fn_encode_text( str(random.random()) )
        
        obj_response_data = None
        obj_data  = {}
        obj_data['token_value']  = vvtoken_session
        
        vd_current_date = datetime.utcnow() - timedelta(hours=5, minutes=0)
        
        vd_start_date = vd_current_date
        vd_end_date   = vd_current_date + timedelta(hours=12, minutes=0)
        
        vd_start_date_txt = vd_start_date.strftime('%Y-%m-%dT%H:%M:00.000Z')
        vd_end_date_txt   = vd_end_date.strftime('%Y-%m-%dT%H:%M:00.000Z') 
        
        obj_data['start_date']  = vd_start_date_txt
        obj_data['end_date']  = vd_end_date_txt
        
        if valueTokenFoundFlag == False :
            obj_data['user_name']   = obj_parameters['user_name']
            obj_data['company_id']  = obj_parameters['company_id']
            obj_data['created_by']  = obj_parameters['user_name']
            obj_data['created_date']  = vd_current_date
            
            obj_response_data = object_data_connector.fn_rest_object_internal("POST",obj_data)
            
        else:
            obj_where_data  = {}
            obj_where_data['user_name']   = obj_parameters['user_name']
            obj_where_data['company_id']  = obj_parameters['company_id']
            
            obj_data['last_updated_by']    = obj_parameters['user_name']
            obj_data['last_updated_date']  = vd_current_date
            
            obj_response_data = object_data_connector.fn_rest_object_internal("PUT",obj_where_data,obj_data)
        
        
        return vvtoken_session
        
        
    
    
        
    def fn_encode_text(self, text_value):
        
        message_text  = text_value
        message_bytes = message_text.encode('ascii')
        base64_bytes  = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')

        return base64_message
        
        
        
    
    
    #Recuperar Permisos y seguridad se Sistema de Informacion    
    def fn_auth_login_subscription(self, obj_parameters, obj_grant_name):
        
        vn_user_id             = None
        vn_company_id          = None
        
        object_subscription = {}

        if 'user_id' in obj_parameters and 'company_id' in obj_parameters :
            vn_user_id             = obj_parameters['user_id']
            vn_company_id          = obj_parameters['company_id']    
    
    
        if vn_user_id is None or vn_company_id is None :
            object_subscription['sys_subscription'] = None
            return object_subscription
        
        
        obj_structure_grants  = self.objDataSysStructure.fun_get_structure(obj_grant_name)
        object_data_connector = GenericObjectBO(self.str_login_token,self.str_connection,self.str_table_index,self.str_region)         
        
        
        #Recuperar Datos Relacionados
        
        #01 Recuperar : sys_subscription
        objCurrentName        = obj_structure_grants['sys_subscription']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)    
    
    
        #Parametros
        obj_cur_parameters = {}
        obj_cur_parameters['company_id'] = vn_company_id
        obj_cur_parameters['status']  = True
        obj_sys_subscription = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sys_subscription = len(obj_sys_subscription)
    
        object_subscription['sys_subscription'] = obj_sys_subscription
        
        
        #02 Recuperar : sys_software_product_license
        objCurrentName = obj_structure_grants['sys_software_product_license']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)
        obj_sys_software_product_license = []
        if lsize_obj_sys_subscription > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['subscription_id']     = [curItem['id'] for curItem in obj_sys_subscription]
            obj_cur_parameters['status'] = True
            obj_sys_software_product_license    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sys_software_product_license = len(obj_sys_software_product_license)
        #object_subscription['sys_software_product_license'] = obj_sys_software_product_license
        
        
        
        #03 Recuperar : sys_subscription_software_product_config
        objCurrentName = obj_structure_grants['sys_subscription_software_product_config']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)
        obj_sys_subscription_software_product_config = []
        if lsize_obj_sys_software_product_license > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['software_product_license_id']     = [curItem['id'] for curItem in obj_sys_software_product_license]
            obj_cur_parameters['status'] = True
            obj_sys_subscription_software_product_config    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sys_subscription_software_product_config = len(obj_sys_subscription_software_product_config)
        #object_subscription['sys_subscription_software_product_config'] = obj_sys_subscription_software_product_config
        
        
        
        #04 Recuperar : sys_software_product_license_asg
        objCurrentName = obj_structure_grants['sys_software_product_license_asg']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)
        obj_sys_software_product_license_asg = []
        if lsize_obj_sys_subscription_software_product_config > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['software_product_license_id']     = [curItem['id'] for curItem in obj_sys_software_product_license]
            #obj_cur_parameters['user_id'] = vn_user_id
            obj_cur_parameters['status'] = True
            obj_sys_software_product_license_asg    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sys_software_product_license_asg = len(obj_sys_software_product_license_asg)
        #object_subscription['sys_software_product_license_asg'] = obj_sys_software_product_license_asg
        
        
        
        #05 Recuperar : sys_software_product
        objCurrentName = obj_structure_grants['sys_software_product']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)
        
        #Lista de Sistemas
        list_software_systemsIds = []
        if lsize_obj_sys_software_product_license > 0:
            list_software_systemsIds = [curItem['software_product_id'] for curItem in obj_sys_software_product_license]
             
        if lsize_obj_sys_software_product_license_asg > 0:
            list_software_systemsIds = [curItem['software_product_id'] for curItem in obj_sys_software_product_license_asg]
            
        lsize_list_software_systemsIds = len(list_software_systemsIds)
        obj_sys_software_product = []
        if lsize_list_software_systemsIds > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['id']     = list_software_systemsIds
            obj_cur_parameters['status'] = True
            obj_sys_software_product    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)


        for curItem in obj_sys_software_product:
            lconfig = []
            for curItemConfig in obj_sys_subscription_software_product_config:
                if curItem['id'] == curItemConfig['software_product_id']:
                    lconfig.append(curItemConfig)
            curItem['config'] = lconfig
         
        object_subscription['sys_software_product'] = obj_sys_software_product
        
        
        #Convertir a JSON
        responseRest = json.dumps(object_subscription)
        
        return responseRest
        


    
    
    
    
    
    
    #Recuperar Permisos y seguridad se Sistema de Informacion    
    def fn_auth_login_software(self, obj_parameters, obj_grant_name):
        
        vn_user_id             = None
        vn_software_product_id = None
        vn_company_id          = None
        
        object_response_security = {}

        if 'user_id' in obj_parameters and 'software_product_id' in obj_parameters and 'company_id' in obj_parameters :
            vn_user_id             = obj_parameters['user_id']
            vn_software_product_id = obj_parameters['software_product_id']
            vn_company_id          = obj_parameters['company_id']
        
        if vn_user_id is None or vn_software_product_id is None  or vn_company_id is None :
            object_response_security['sys_software_menu_final'] = None
            return object_response_security
        
        
        obj_structure_grants  = self.objDataSysStructure.fun_get_structure(obj_grant_name)
        object_data_connector = GenericObjectBO(self.str_login_token,self.str_connection,self.str_table_index,self.str_region) 
        
        
        
        
        #Recuperar Datos Relacionados
        
        #01 Recuperar : sec_group_user_item
        objCurrentName        = obj_structure_grants['sec_group_user_item']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)

        #Parametros
        obj_cur_parameters = {}
        obj_cur_parameters['user_id'] = vn_user_id
        obj_cur_parameters['status']  = True
        obj_sec_group_user_item = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sec_group_user_item = len(obj_sec_group_user_item)
        
        
        
        #02 Recuperar : sec_group_user
        objCurrentName = obj_structure_grants['sec_group_user']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)
        obj_sec_group_user = []
        if lsize_obj_sec_group_user_item > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['id']     = [curItem['group_user_id'] for curItem in obj_sec_group_user_item]
            obj_cur_parameters['status'] = True
            obj_sec_group_user    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsize_obj_sec_group_user = len(obj_sec_group_user)
        object_response_security['sec_group_user'] = obj_sec_group_user


        #03 Recuperar : sec_role_group_user_asg
        objCurrentName = obj_structure_grants['sec_role_group_user_asg']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        obj_sec_role_group_user_asg = []
        if lsize_obj_sec_group_user > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['group_user_id']       = [curItem['id'] for curItem in obj_sec_group_user]
            obj_cur_parameters['company_id']          = vn_company_id
            obj_cur_parameters['software_product_id'] = vn_software_product_id
            obj_cur_parameters['status']   = True
            obj_sec_role_group_user_asg    = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)        
        lsize_obj_sec_role_group_user_asg  = len(obj_sec_role_group_user_asg)
        
        
        #04 Recuperar : sec_software_role
        objCurrentName = obj_structure_grants['sec_software_role']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        obj_sec_software_role = []
        if lsize_obj_sec_role_group_user_asg > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['id']       = [curItem['software_role_id'] for curItem in obj_sec_role_group_user_asg]
            #obj_cur_parameters['company_id']          = vn_company_id
            obj_cur_parameters['software_product_id'] = vn_software_product_id
            obj_cur_parameters['status']        = True
            obj_sec_software_role  = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)        
        lsize_obj_sec_software_role = len(obj_sec_software_role)
        
        object_response_security['sec_software_role'] = obj_sec_software_role
        

        #05 Recuperar : sec_software_role_grant
        objCurrentName = obj_structure_grants['sec_software_role_grant']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        obj_sec_software_role_grant = []
        if lsize_obj_sec_software_role > 0:
            #Parametros
            obj_cur_parameters = {}
            obj_cur_parameters['software_role_id']    = [curItem['id'] for curItem in obj_sec_software_role]
            #obj_cur_parameters['company_id']         = vn_company_id
            obj_cur_parameters['software_product_id'] = vn_software_product_id
            obj_cur_parameters['status']        = True
            obj_sec_software_role_grant  = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)        
        lsize_obj_sec_software_role_grant = len(obj_sec_software_role_grant)
        
        #object_response_security['sec_software_role_grant'] = obj_sec_software_role_grant
 
        ListModuleIdsRoleGrant = []
        ListMenuIdsRoleGrant = []
        
        for curItemGrant in obj_sec_software_role_grant:
            if curItemGrant['software_module_id'] is not None:
                ListModuleIdsRoleGrant.append(curItemGrant['software_module_id'])
            if curItemGrant['software_menu_id'] is not None:
                ListMenuIdsRoleGrant.append(curItemGrant['software_menu_id'])

        lsizeListModuleIdsRoleGrant = len(ListModuleIdsRoleGrant)
        lsizeListMenuIdsRoleGrant   = len(ListMenuIdsRoleGrant)

        


        #06 Recuperar : sys_software_module 
        objCurrentName = obj_structure_grants['sys_software_module']
        object_data_connector = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        
        #Parametros
        obj_sys_software_module = []
        lsize_obj_sys_software_module = 0
        if lsizeListModuleIdsRoleGrant > 0:
            
            obj_cur_parameters = {}
            obj_cur_parameters['id']    = ListModuleIdsRoleGrant
            #obj_cur_parameters['company_id']         = vn_company_id
            obj_cur_parameters['software_product_id'] = vn_software_product_id
            obj_cur_parameters['status']        = True
            obj_sys_software_module  = object_data_connector.fn_rest_object_internal("GET",obj_cur_parameters,None)        
        
        lsize_obj_sys_software_module = len(obj_sys_software_module)

        #object_response_security['sys_software_module'] = obj_sys_software_module

        
        
        #07 Recuperar : sys_software_menu
        objCurrentName = obj_structure_grants['sys_software_menu']
        object_data_connector_menu = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        
        
        #Parametros
        obj_cur_parameters = {}
        #obj_cur_parameters['company_id']   = vn_company_id
        obj_cur_parameters['software_product_id'] = vn_software_product_id
        obj_cur_parameters['status']        = True
        
        
        #Consulta de Menus Asociados al Modulo
        obj_sys_software_menu_baseModule = []
        lsize_obj_sys_software_menu_baseModule = 0
        if lsize_obj_sys_software_module > 0:
            obj_cur_parameters['id']    = [curItem['software_menu_id'] for curItem in obj_sys_software_module]
            #obj_cur_parameters['company_id']   = vn_company_id
            obj_sys_software_menu_baseModule    = object_data_connector_menu.fn_rest_object_internal("GET",obj_cur_parameters,None)        
        lsize_obj_sys_software_menu_baseModule = len(obj_sys_software_menu_baseModule)
        
        
        #Consulta de Menus Asociados al Modulo pero por Roles y Permisos
        obj_sys_software_menu_roleGrantModule = []
        lsize_obj_sys_software_menu_roleGrantModule = 0
        if lsizeListMenuIdsRoleGrant > 0:
            obj_cur_parameters['id']    = ListMenuIdsRoleGrant
            obj_sys_software_menu_roleGrantModule = object_data_connector_menu.fn_rest_object_internal("GET",obj_cur_parameters,None) 
        lsize_obj_sys_software_menu_roleGrantModule =  len(obj_sys_software_menu_roleGrantModule)
        
        
        #object_response_security['sys_software_menu_base'] = obj_sys_software_menu_baseModule
        #object_response_security['sys_software_menu_role'] = obj_sys_software_menu_roleGrantModule
        
        
        
        #08 Recuperar : sys_software_menu_line
        objCurrentName = obj_structure_grants['sys_software_menu_line']
        object_data_connector_menu_item = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region)        
        
        #09 Recuperar : sys_software_function
        objCurrentName = obj_structure_grants['sys_software_function']
        object_data_connector_sys_function = GenericObjectBO(objCurrentName,self.str_connection,self.str_table_index,self.str_region) 


        #Parametros
        obj_cur_parameters = {}
        #obj_cur_parameters['company_id']         = vn_company_id
        obj_cur_parameters['software_product_id'] = vn_software_product_id
        obj_cur_parameters['status']        = True
        
        ListMenuIdsModules = []
        lsizeMenu = 0
        objCurrentResult_menubase = []
        if lsize_obj_sys_software_menu_baseModule > 0:
            ListMenuIdsModules = [curItem['id'] for curItem in obj_sys_software_menu_baseModule]
            obj_cur_parameters['software_menu_id']   = ListMenuIdsModules
            objCurrentResult_menubase    = object_data_connector_menu_item.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsizeMenu = len(objCurrentResult_menubase)


        ListMenuIdsModulesRole = []
        lsizeMenuModule = 0
        objCurrentResult_menuRole = []
        if lsize_obj_sys_software_menu_roleGrantModule > 0:
            ListMenuIdsModulesRole = [curItem['id'] for curItem in obj_sys_software_menu_roleGrantModule]
            obj_cur_parameters['software_menu_id']   = ListMenuIdsModulesRole
            objCurrentResult_menuRole    = object_data_connector_menu_item.fn_rest_object_internal("GET",obj_cur_parameters,None)
        lsizeMenuModule = len(objCurrentResult_menuRole)
        
        
        
        #OBTENCION RECURSIVA DE NODOS DE MENU
        
        #List ID Menus and List Functions
        ListMenuIds = []
        ListFunctionsIds = []
        
        
        objCurrentResult_nested_menuBase = []
        if lsizeMenu > 0:
            objCurrentResult_nested_menuBase = self.fn_recursive_get_software_menu(object_data_connector_menu,object_data_connector_menu_item,object_data_connector_sys_function,obj_cur_parameters,  objCurrentResult_menubase,lsizeMenu,0)
            #object_response_security['sys_software_menu_base'] = objCurrentResult_nested_menuBase
        
        
        obj_menu_final = None
        objCurrentResult_nested_menuRole = []
        if lsizeMenuModule > 0:
            objCurrentResult_nested_menuRole = self.fn_recursive_get_software_menu(object_data_connector_menu,object_data_connector_menu_item,object_data_connector_sys_function,obj_cur_parameters,  objCurrentResult_menuRole,lsizeMenuModule,0)
            #object_response_security['sys_software_menu_role'] = objCurrentResult_nested_menuRole
        
            #Evaluar Permisos Finales
            objCurrentResult_nested_menuEval = copy.deepcopy(objCurrentResult_nested_menuBase)
            obj_menu_final = self.fn_consolidate_menu_permition(objCurrentResult_nested_menuEval, objCurrentResult_nested_menuRole,len(objCurrentResult_nested_menuBase),0,[])
            
            
            
            
            #Consolidar Modulo, Menu y Menu Principal
            obj_list_final_menu = copy.deepcopy(obj_sys_software_menu_baseModule)
            for curMenu in obj_list_final_menu:
                litems = []
                for curMenuItem in obj_menu_final:
                    if curMenu['id'] == curMenuItem['software_menu_id'] :
                        litems.append(curMenuItem)
                        
                curMenu['software_menu_items'] = litems

            
            
            obj_list_final_module = copy.deepcopy(obj_sys_software_module)
            for curModule in obj_list_final_module:
                for curMenu in obj_list_final_menu:
                    if curModule['software_menu_id'] == curMenu['id'] :
                        curModule['software_menu'] = curMenu
                        continue
                        
                
            
            
            object_response_security['sys_software_menu_final'] = obj_list_final_module
        else:
            if lsizeMenu > 0:
                #Consolidar Modulo, Menu y Menu Principal
                obj_list_final_menu = copy.deepcopy(obj_sys_software_menu_baseModule)
                for curMenu in obj_list_final_menu:
                    litems = []
                    for curMenuItem in objCurrentResult_nested_menuBase:
                        if curMenu['id'] == curMenuItem['software_menu_id'] :
                            litems.append(curMenuItem)
                            continue
                    curMenu['software_menu_items'] = litems
                    
            
            
                obj_list_final_module = copy.deepcopy(obj_sys_software_module)
                for curModule in obj_list_final_module:
                    for curMenu in obj_list_final_menu:
                        if curModule['software_menu_id'] == curMenu['id'] :
                            curModule['software_menu'] = curMenu
                            continue
                
                    
                
                
                object_response_security['sys_software_menu_final'] = obj_list_final_module
            
        
        #Convertir a JSON
        responseRest = json.dumps(object_response_security)
        
        return responseRest
        
    
    
    
    
   
    
    
    #Comparacion de Menus y Obtencion de Menu Principal
    def fn_consolidate_menu_permition(self,obj_menu_standar, obj_menu_grants, lsize, idx, obj_menu_final):
        
        lsizegrant = len(obj_menu_grants)
        
        if lsize > idx:
            curMenuItem = obj_menu_standar[idx]
            if curMenuItem is not None and curMenuItem['software_sub_menu_id'] is not None:
                objResultValidation = self.fn_get_menu_section(obj_menu_grants,lsizegrant,0,curMenuItem['software_sub_menu_id'],'menu')
                if objResultValidation is None:

                    lsizeSubMenu = len(curMenuItem['software_sub_menu'])
                    listSubMenu_result = self.fn_consolidate_menu_permition(curMenuItem['software_sub_menu'], obj_menu_grants, lsizeSubMenu , 0, obj_menu_final)

                    if listSubMenu_result is None:
                        listSubMenu_result = []
                    
                    listSubMenu = []
                    for curItemSubMenu in listSubMenu_result:
                        if curItemSubMenu is not None:
                            listSubMenu.append(curItemSubMenu)
                    lsizeSubMenu = len(listSubMenu)
                    if lsizeSubMenu > 0:
                        curMenuItem['software_sub_menu'] = listSubMenu
                    else:
                        obj_menu_standar[idx] = None
                    
                    
            if curMenuItem is not None and curMenuItem['software_function_id'] is not None:
                objResultValidation = self.fn_get_menu_section(obj_menu_grants,lsizegrant,0,curMenuItem['software_function_id'],'function')
                if objResultValidation is None:
                    obj_menu_standar[idx] = None
            
            return self.fn_consolidate_menu_permition(obj_menu_standar, obj_menu_grants, lsize, idx+1, obj_menu_final) 
        else:

            listSubMenu_result = obj_menu_standar
            if listSubMenu_result is None:
                listSubMenu_result = []
            listSubMenu = []
            for curItemSubMenu in listSubMenu_result:
                if curItemSubMenu is not None:
                    listSubMenu.append(curItemSubMenu)
            lsizeSubMenu = len(listSubMenu)

            obj_response = None
            if lsizeSubMenu > 0:
                obj_response = listSubMenu
            return obj_response
        
        
    
        
    def fn_get_menu_section(self,obj_data_menu_items, lsize, idx, searchId , objType ):
        
        if lsize > idx:
            curMenuItem = obj_data_menu_items[idx]
            if curMenuItem['software_sub_menu_id'] is not None:
                if curMenuItem['software_sub_menu_id'] == searchId and objType == 'menu':
                    return curMenuItem
                else:
                    obj_data_sub_menu_items = curMenuItem['software_sub_menu']
                    lsize_obj_data_sub_menu_items = len(obj_data_sub_menu_items)
                    return self.fn_get_menu_section(obj_data_sub_menu_items,lsize_obj_data_sub_menu_items,0, searchId, objType)
                    
            if curMenuItem['software_function_id'] is not None:
                if curMenuItem['software_function_id'] == searchId and objType == 'function' :
                    return curMenuItem
            
            return self.fn_get_menu_section(obj_data_menu_items, lsize, idx+1, searchId, objType)    
        else:
            return None
        
    
        
    
    
    #Consulta Recursiva de Items de Menu
    def fn_recursive_get_software_menu(self,object_data_connector_menu,object_data_connector_menu_item, object_data_connector_sys_function, obj_parameters, obj_data_menu_items, lsize, idx):
        
        if lsize > idx:
            
            curMenuItem = obj_data_menu_items[idx]
            
            if curMenuItem['software_sub_menu_id'] is not None:
                
                #Validar si el Menu a Consultar esta Activo
                obj_cur_parameters = {}
                obj_cur_parameters['software_menu_id']    = [curMenuItem['software_sub_menu_id']]
                obj_cur_parameters['software_product_id'] = obj_parameters['software_product_id']
                obj_cur_parameters['status']        = True
                
                objCurrentResult_menu = object_data_connector_menu.fn_rest_object_internal("GET",obj_cur_parameters,None)
                lsizemenu = len(objCurrentResult_menu)
                
                #Si el menu esta activo, recuperar su Detalle Activo.
                if lsizemenu > 0:
                    obj_cur_parameters = {}
                    obj_cur_parameters['software_menu_id']    = [curMenuItem['software_sub_menu_id']]
                    obj_cur_parameters['software_product_id'] = obj_parameters['software_product_id']
                    obj_cur_parameters['status']        = True
                    objCurrentResult_subMnu = object_data_connector_menu_item.fn_rest_object_internal("GET",obj_cur_parameters,None)
                
                    lsizeSubMnu = len(objCurrentResult_subMnu)
                
                    obj_data_software_sub_menu = self.fn_recursive_get_software_menu(object_data_connector_menu,object_data_connector_menu_item, object_data_connector_sys_function, obj_cur_parameters, objCurrentResult_subMnu, lsizeSubMnu, 0)
                    obj_data_menu_items[idx]['software_sub_menu'] = obj_data_software_sub_menu
                else:
                    obj_data_menu_items[idx]['software_sub_menu'] = []
            
            if curMenuItem['software_function_id'] is not None:
                obj_cur_parameters = {}
                obj_cur_parameters['id']    = [curMenuItem['software_function_id']]
                obj_cur_parameters['software_product_id'] = obj_parameters['software_product_id']
                obj_cur_parameters['status']        = True
                objCurrentResult_function = object_data_connector_sys_function.fn_rest_object_internal("GET",obj_cur_parameters,None)
                lsizefunctions = len(objCurrentResult_function)
                curFunction = objCurrentResult_function[0] if lsizefunctions > 0 else None

                obj_data_menu_items[idx]['software_function'] = curFunction
        

            
            return self.fn_recursive_get_software_menu(object_data_connector_menu,object_data_connector_menu_item, object_data_connector_sys_function, obj_parameters, obj_data_menu_items, lsize, idx+1)
        
        else:
            return obj_data_menu_items
        
      
      
    #Consulta Recursiva de Items de Menu
    def fn_recursive_get_ids_menu_function(self, obj_data_menu_items,lsize,idx, listMenuIds, listMenuFunctionsIds):

        if lsize > idx:
            
            curMenuItem = obj_data_menu_items[idx]
            
            if curMenuItem['software_sub_menu_id'] is not None:
                
                listMenuIds.append(curMenuItem['software_sub_menu_id'])
                obj_sub_menu_items = curMenuItem['software_sub_menu']
                lsize_sub_menu_items = len(obj_sub_menu_items)
                
                listCurSubMenuIds, listCurMenuFunctionsIds = self.fn_recursive_get_ids_menu_function( obj_sub_menu_items,lsize_sub_menu_items,0, [], [])
                
                listMenuIds.extend(listCurSubMenuIds)
                listMenuFunctionsIds.extend(listCurMenuFunctionsIds)
                
            if curMenuItem['software_function_id'] is not None:
                
                listMenuFunctionsIds.append(curMenuItem['software_function_id'])
                
            return self.fn_recursive_get_ids_menu_function(obj_data_menu_items, lsize, idx+1, listMenuIds, listMenuFunctionsIds)
            
        else:
            return listMenuIds , listMenuFunctionsIds
            
            


    def fn_auth_signup(self, obj_parameters):
        
        #01 Crear Organization : sec_group_user_item
        
        
        var_login_object_name = self.str_login_object_name
        var_login_token       = self.str_login_token
                    
        return 
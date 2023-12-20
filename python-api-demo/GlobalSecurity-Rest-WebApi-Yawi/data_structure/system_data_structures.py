
## OPCIONES DE DATOS POR VARIABLE
# type --> int , long , varchar , float , datetime ,  date , bool 
# primarykey --> auto , value
# where_operator --> = , like

class system_data_structures():
    
    def __init__(self):
        
        super(system_data_structures,self).__init__()
        
        self.data_connectors = [{'name':'microsoft_sql'}]
        
        
        
      
        self.data_struc_company = {'name':'security.company_all' ,
                                   'object_name':'security.company_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"legal_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_number","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"fiscal_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"country","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"city","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"base_currency_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }]
                                  }
                                  
                                  
      
        self.data_struc_legalcompany = {'name':'security.legal_company_all' ,
                                   'object_name':'security.legal_company_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"legal_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_number","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"fiscal_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"country","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"city","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"base_currency_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"partner_type","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"partner_full_name","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"partner_email","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"partner_phone","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar"  }] 
                                  }        
                                          

        self.data_struc_user = {'name':'security.user_all' ,
                                   'object_name':'security.user_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"password","type":"varchar" , "where_operator":"=" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"psswrd_date","type":"date"  }
                                                ,{"name":"psswrd_access_left","type":"int" }
                                                ,{"name":"psswrd_lifespn_access","type":"int"}
                                                ,{"name":"psswrd_lifespn_days","type":"int" }
                                                ,{"name":"psswrd_wrng_access","type":"int" }
                                                ,{"name":"psswrd_wrng_accessleft","type":"int" }
                                                ,{"name":"person_id","type":"int" , "where_operator":"=" }
                                                ,{"name":"full_name","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"customer_id","type":"int" , "where_operator":"=" }
                                                ,{"name":"supplier_id","type":"int" , "where_operator":"=" }
                                                ,{"name":"email_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"cellphone_nro","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                    
                                  }        
                                     

        self.data_struc_userlogon = {'name':'security_user_logon' ,
                                   'object_name':'security.user_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_name","type":"varchar" , "where_operator":"=" }
                                                ,{"name":"password","type":"varchar" , "where_operator":"=" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"full_name","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"email_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"cellphone_nro","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                    
                                  }        
                                     
                                     
        self.data_struc_user_query_in = {'name':'security_user_query_in' ,
                                   'object_name':'security.user_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_name","type":"varchar" , "where_operator":"=" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"full_name","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"email_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"cellphone_nro","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}]
                                  }                                         
                                     

        
        self.data_struc_softwareproduct = {'name':'security.sys_software_product_all' ,
                                   'object_name':'security.sys_software_product_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"urlpath","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"logon_type","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"icon_urlpath","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"img_urlpath","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                    
                                  }        
                                                 
        
        
        self.data_struc_subscription = {'name':'security.sys_subscription_all' ,
                                   'object_name':'security.sys_subscription_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }        
                                                 
                
     
        
        self.data_struc_software_product_license = {'name':'security.sys_software_product_license_all' ,
                                   'object_name':'security.sys_software_product_license_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"quantity","type":"int"  , "where_operator":"="}
                                                ,{"name":"quantity_assigned","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }        
                                            
     
        self.data_struc_software_product_config = {'name':'security.sys_subscription_software_product_config_all' ,
                                   'object_name':'security.sys_subscription_software_product_config_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_license_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"parameter_01","type":"varchar" }
                                                ,{"name":"parameter_02","type":"varchar" }
                                                ,{"name":"parameter_03","type":"varchar" }
                                                ,{"name":"parameter_04","type":"varchar" }
                                                ,{"name":"parameter_05","type":"varchar" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }         
        

     
        self.data_struc_software_product_license_asg = {'name':'security.sys_software_product_license_asg_all' ,
                                   'object_name':'security.sys_software_product_license_asg_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_license_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }         
        


        self.data_struc_sec_group_user = {'name':'security.sec_group_user_all' ,
                                   'object_name':'security.sec_group_user_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }         
        
        
        self.data_struc_sec_group_user_item = {'name':'security.sec_group_user_item_all' ,
                                   'object_name':'security.sec_group_user_item_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"group_user_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }  
                                  

       
       
        self.data_struc_sys_software_function = {'name':'security.sys_software_function_all' ,
                                   'object_name':'security.sys_software_function_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"parameters","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"function_type","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"classification","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"http_call","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"grant_option_flxvl","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"urlpath","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"softwarecode","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute1","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute2","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute3","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute4","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute5","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }  
                                  
                                         
       
        
        self.data_struc_sys_software_module = {'name':'security.sys_software_module_all' ,
                                   'object_name':'security.sys_software_module_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"menu_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }  
                                         
        
        self.data_struc_sys_software_module_in = {'name':'security.sys_software_module_in' ,
                                   'object_name':'security.sys_software_module_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_id","type":"int" , "where_operator":"in"}] 
                                  }  
                                                
        
        
        
        self.data_struc_sys_software_menu = {'name':'security.sys_software_menu_all' ,
                                   'object_name':'security.sys_software_menu_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar" }
                                                ,{"name":"attribute2","type":"varchar" }
                                                ,{"name":"attribute3","type":"varchar" }
                                                ,{"name":"attribute4","type":"varchar" }
                                                ,{"name":"attribute5","type":"varchar" }] 
                                  }  
                                                

        self.data_struc_sys_software_menu_in = {'name':'security.sys_software_menu_in' ,
                                   'object_name':'security.sys_software_menu_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"in"}] 
                                  }  


        
        self.data_struc_sys_software_menu_line = {'name':'security.sys_software_menu_line_all' ,
                                   'object_name':'security.sys_software_menu_line_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_sub_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_function_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar" }
                                                ,{"name":"attribute2","type":"varchar" }
                                                ,{"name":"attribute3","type":"varchar" }
                                                ,{"name":"attribute4","type":"varchar" }
                                                ,{"name":"attribute5","type":"varchar" }] 
                                  }  
                                                 
        
        
        
        self.data_struc_sec_software_role = {'name':'security.sec_software_role_all' ,
                                   'object_name':'security.sec_software_role_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar" }
                                                ,{"name":"attribute2","type":"varchar" }
                                                ,{"name":"attribute3","type":"varchar" }
                                                ,{"name":"attribute4","type":"varchar" }
                                                ,{"name":"attribute5","type":"varchar" }] 
                                  }  
                                     
                                     
        self.data_struc_sec_software_role_in = {'name':'security.sec_software_role_in' ,
                                   'object_name':'security.sec_software_role_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"in"}] 
                                  }                                     
                                              
        
        
        self.data_struc_sec_software_role_grant = {'name':'security.sec_software_role_grant_all' ,
                                   'object_name':'security.sec_software_role_grant_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_role_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_module_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar" }
                                                ,{"name":"attribute2","type":"varchar" }
                                                ,{"name":"attribute3","type":"varchar" }
                                                ,{"name":"attribute4","type":"varchar" }
                                                ,{"name":"attribute5","type":"varchar" }] 
                                  }  
                                   



        self.data_struc_sec_role_group_user_asg = {'name':'security.sec_role_group_user_asg_all' ,
                                   'object_name':'security.sec_role_group_user_asg_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_role_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"group_user_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"   }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }
                                                ,{"name":"attribute1","type":"varchar" }
                                                ,{"name":"attribute2","type":"varchar" }
                                                ,{"name":"attribute3","type":"varchar" }
                                                ,{"name":"attribute4","type":"varchar" }
                                                ,{"name":"attribute5","type":"varchar" }] 
                                  }  
                                                    
             

        
        
        self.data_structures_01 = {'name':'security.system_information_all' ,
                                   'object_name':'security.system_information_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"=" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"urlpath","type":"varchar" , "where_operator":"="}
                                                ,{"name":"status","type":"int"  , "where_operator":"="}
                                                ,{"name":"created_by","type":"varchar" , "where_operator":"="}
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                    
                                  }
        
        self.data_structures_02 = {'name':'system_information_v' ,
                                   'object_name':'system_information_v' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"description","type":"varchar" }
                                                ,{"name":"urlpath","type":"varchar" }
                                                ,{"name":"status","type":"int" }]   
                                  }
                

        self.data_structures_03 = {'name':'[dbo].[Empresa]' ,
                                   'object_name':'[dbo].[Empresa]' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"empresa_id","type":"int", "where_operator":"in"  }
                                                ,{"name":"nombre","type":"varchar" }
                                                ,{"name":"group_empresa_id","type":"int" }
                                                ,{"name":"emp_code","type":"varchar" }
                                                ]   
                                  }
                                  
                                  
        self.data_structures_04 = {'name':'[security].[system_information_all]' ,
                                   'object_name':'[security].[system_information_all]' , 
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int", "where_operator":"="  }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"description","type":"varchar" }
                                                ,{"name":"urlpath","type":"varchar" }
                                                ,{"name":"status","type":"int" }
                                                ]   
                                  }                                  


                                  
        self.data_structures_05 = {'name':'prc_test_process' ,
                                   'procedure_name':'dbo.prc_test_process' ,
                                   'type':'procedure' ,
                                   'connector':'microsoft_sql',
                                   'output':'parameter',
                                   'parameters':[{"name":"vn_empresa_id","type":"int"} , {"name":"vv_result","type":"int", "output":True }] ,
                                   'structure': [{"name":"empresa_id","type":"int"  }
                                                ,{"name":"nombre","type":"varchar" }
                                                ,{"name":"group_empresa_id","type":"int" }
                                                ,{"name":"emp_code","type":"varchar" }
                                                ]     
                                  }                                  



 

        self.data_structures_06 = {'name':'empresa_raw1' ,
                                   'type':'queryraw' ,
                                   'script':'SELECT empresa_id,nombre,group_empresa_id,emp_code FROM [dbo].[Empresa] where empresa_id = :empresa_id;' , 
                                   'connector':'microsoft_sql',
                                   'parameters':[{"name":"empresa_id","type":"int"} ] ,
                                   'structure': [{"name":"empresa_id","type":"int", "where_operator":"in"  }
                                                ,{"name":"nombre","type":"varchar" }
                                                ,{"name":"group_empresa_id","type":"int" }
                                                ,{"name":"emp_code","type":"varchar" }
                                                ]   
                                  }
                                  
                                  
                                  
      
        self.data_struc_company_dynamo = {'name':'dbsecurity_company_dynamo' ,
                                   'object_name':'dbsecurity_company_all' ,
                                   'type':'table' ,
                                   'connector':'dynamodb',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"legal_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_number","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"fiscal_address","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"country","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"city","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"base_currency_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                    
                                  }
                                
                                
        self.data_struc_userlogontoken_ms = {'name':'security_user_token_session_ms' ,
                                   'object_name':'security.sec_token_session_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"user_name", "type":"varchar" ,"where_operator":"=" ,"primarykey":"value" }
                                                ,{"name":"company_id", "type":"int"  ,"where_operator":"=" ,"secondarykey":"value"}
                                                ,{"name":"token_value", "type":"varchar" ,"where_operator":"=" }
                                                ,{"name":"start_date","type":"datetime" }
                                                ,{"name":"end_date","type":"datetime"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }]
                                  }        
                                   

        self.data_struc_userlogontoken_dy = {'name':'security_user_token_session_dy' ,
                                   'object_name':'dbsecurity_token_session' ,
                                   'type':'table' ,
                                   'connector':'dynamodb',
                                   'structure': [{"name":"user_name", "type":"varchar" ,"where_operator":"=" ,"primarykey":"value" }
                                                ,{"name":"company_id", "type":"int"  ,"where_operator":"=" ,"secondarykey":"value"}
                                                ,{"name":"token_value", "type":"varchar" ,"where_operator":"=" }
                                                ,{"name":"start_date","type":"datetime" }
                                                ,{"name":"end_date","type":"datetime"  }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }]
                                  }        
                                   



        #ESTRUCTURAS DE SEGURIDAD -  PARA LOGIN

        self.data_struc_sec_group_user_login = {'name':'security.sec_group_user_login' ,
                                   'object_name':'security.sec_group_user_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }] 
                                  }      
                                  


        self.data_struc_sec_role_group_user_asg_login = {'name':'security.sec_role_group_user_asg_login' ,
                                   'object_name':'security.sec_role_group_user_asg_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_role_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"group_user_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}] 
                                  }  
                                                    
                                               
        
        self.data_struc_sec_software_role_login = {'name':'security.sec_software_role_login' ,
                                   'object_name':'security.sec_software_role_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}] 
                                  }  
                                   


        
        
        self.data_struc_sec_software_role_grant_login = {'name':'security.sec_software_role_grant_login' ,
                                   'object_name':'security.sec_software_role_grant_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_role_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_module_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}] 
                                  }  
                                   



        self.data_struc_sys_software_module_login = {'name':'security.sys_software_module_login' ,
                                   'object_name':'security.sys_software_module_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"menu_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}] 
                                  }



        self.data_struc_sys_software_menu_login = {'name':'security.sys_software_menu_login' ,
                                   'object_name':'security.sys_software_menu_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}] 
                                  }  
                                       


        self.data_struc_sys_software_menu_line_login = {'name':'security.sys_software_menu_line_login' ,
                                   'object_name':'security.sys_software_menu_line_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_menu_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"software_sub_menu_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_function_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"attribute1","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute2","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute3","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute4","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute5","type":"varchar" , "where_operator":"like" }],
                                    'orderby':'order_position'
                                  }  


        self.data_struc_sys_software_function_login = {'name':'security.sys_software_function_login' ,
                                   'object_name':'security.sys_software_function_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"parameters","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"function_type","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"classification","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"http_call","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"grant_option_flxvl","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"order_position","type":"int"  , "where_operator":"="}
                                                ,{"name":"label_system","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"urlpath","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"softwarecode","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute1","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute2","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute3","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute4","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"attribute5","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}] 
                                  }  
                                  


        self.data_struc_query_seguridad_ms = {'name':'security_user_grants' ,
                                   'object_name':'dbsecurity_token_session' ,
                                   'type':'rolegrants' ,
                                   'connector':'microsoft_sql', 
                                   "sec_group_user_item":"security.sec_group_user_item_all" ,
                                   "sec_group_user":"security.sec_group_user_login" ,
                                   "sec_role_group_user_asg":"security.sec_role_group_user_asg_login" ,
                                   "sec_software_role":"security.sec_software_role_login" ,
                                   "sec_software_role_grant":"security.sec_software_role_grant_login" ,
                                   "sys_software_module":"security.sys_software_module_login" ,
                                   "sys_software_menu":"security.sys_software_menu_login" ,
                                   "sys_software_menu_line":"security.sys_software_menu_line_login" ,
                                   "sys_software_function":"security.sys_software_function_login" 
                                  }        
                                   






        self.data_struc_software_product_license_login = {'name':'security.sys_software_product_license_login' ,
                                   'object_name':'security.sys_software_product_license_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"quantity","type":"int"  , "where_operator":"="}
                                                ,{"name":"quantity_assigned","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}] 
                                  } 
                                    


     
        self.data_struc_software_product_config_login = {'name':'security.sys_subscription_software_product_config_login' ,
                                   'object_name':'security.sys_subscription_software_product_config_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_license_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"parameter_01","type":"varchar" }
                                                ,{"name":"parameter_02","type":"varchar" }
                                                ,{"name":"parameter_03","type":"varchar" }
                                                ,{"name":"parameter_04","type":"varchar" }
                                                ,{"name":"parameter_05","type":"varchar" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}] 
                                  }         





        self.data_struc_software_product_license_asg_login = {'name':'security.sys_software_product_license_asg_login' ,
                                   'object_name':'security.sys_software_product_license_asg_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"software_product_license_id","type":"int"  , "where_operator":"in"}
                                                ,{"name":"subscription_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"software_product_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"user_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}] 
                                  }         


        self.data_struc_softwareproduct_login = {'name':'security.sys_software_product_login' ,
                                   'object_name':'security.sys_software_product_all' ,
                                   'type':'query' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"in" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"description","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"urlpath","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"logon_type","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"icon_urlpath","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"img_urlpath","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }]
                                  }        
                                     




        self.data_struc_query_subscription_ms = {'name':'system_subscription' ,
                                   'object_name':'system_subscription' ,
                                   'type':'subscription' ,
                                   'connector':'microsoft_sql', 
                                   "sys_subscription":"security.sys_subscription_all" ,
                                   "sys_software_product_license":"security.sys_software_product_license_login" ,
                                   "sys_subscription_software_product_config":"security.sys_subscription_software_product_config_login" ,
                                   "sys_software_product_license_asg":"security.sys_software_product_license_asg_login" ,
                                   "sys_software_product":"security.sys_software_product_login"
                                  }        
                                   





        # Login Single Sign On : Para Sistemas Externos
        self.data_agritracer_login = {'name':'login_agritracer' ,
                                   'type':'queryraw' ,
                                   'script':'SELECT i_usuarioweb_id, vc_usuw_login, cast([vb_usuw_password] as varchar(500)) user_password FROM seguridad.UsuarioWeb WHERE status = 1  and vc_usuw_login = :user_name;' , 
                                   'connector':'microsoft_sql',
                                   'parameters':[{"name":"user_name","type":"varchar"} ] ,
                                   'structure': [{"name":"i_usuarioweb_id","type":"int", "where_operator":"in"  }
                                                ,{"name":"vc_usuw_login","type":"varchar" }
                                                ,{"name":"user_password","type":"varchar" }
                                                ]   
                                  }        



        # Db01 Enterprise : Para Sistemas Externos
        self.db01_enterprise = {'name':'HORTIFRUT_OLMOS_enterprise' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_empresa_id as id,
                                              vc_empr_nombrecorto as name,
                                              vc_empr_codigoerp as code
                                            from general.Empresa
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"code","type":"varchar" }
                                                ]
                                  }        


        # Db02 Enterprise : Para Sistemas Externos
        self.db02_enterprise = {'name':'HORTIFRUT_TRUJILLO_enterprise' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                              select
                                                i_empresa_id as id,
                                                vc_empr_nombrecorto as name,
                                                vc_empr_codigoerp as code
                                              from general.Empresa
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"code","type":"varchar" }
                                                ]
                                  }      

        # Db03 Enterprise : Para Sistemas Externos
        self.db03_enterprise = {'name':'HORTIFRUT_MEXICO_enterprise' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_empresa_id as id,
                                              vc_empr_nombrecorto as name,
                                              vc_empr_codigoerp as code
                                            from general.Empresa
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"code","type":"varchar" }
                                                ]
                                  }
       
        # Db04 Enterprise : Para Sistemas Externos                           
        self.db04_enterprise = {'name':'HORTIFRUT_CHILE_enterprise' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_empresa_id as id,
                                              vc_empr_nombrecorto as name,
                                              vc_empr_codigoerp as code
                                            from general.Empresa
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"name","type":"varchar" }
                                                ,{"name":"code","type":"varchar" }
                                                ]
                                  } 
                               
                                  
                                  
                                  
        # Db01 Cultivo : Para Sistemas Externos
        self.db01_cultivo = {'name':'HORTIFRUT_OLMOS_cultivo' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_cultivo_id as id,
                                              vc_cult_nombre as code,
			                                  vc_cult_nombre as name
                                            from produccion.Cultivo
                                            WHERE 1=1 and status = 1
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ]
                                  }        


        # Db02 Cultivo : Para Sistemas Externos
        self.db02_cultivo = {'name':'HORTIFRUT_TRUJILLO_cultivo' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                              select
                                                i_cultivo_id as id,
                                                vc_cult_nombre as code,
			                                    vc_cult_nombre as name
                                              from produccion.Cultivo
                                              where 1=1 and status = 1
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ]
                                  }      


        # Db03 Cultivo : Para Sistemas Externos
        self.db03_cultivo = {'name':'HORTIFRUT_MEXICO_cultivo' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_cultivo_id as id,
                                              vc_cult_nombre as code,
			                                  vc_cult_nombre as name
                                            from produccion.Cultivo
                                            WHERE 1=1 and status = 1
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ]
                                  }  


        # Db04 Cultivo : Para Sistemas Externos
        self.db04_cultivo = {'name':'HORTIFRUT_CHILE_cultivo' ,
                                   'type':'queryraw' ,
                                   'script':"""
                                            select
                                              i_cultivo_id as id,
                                              vc_cult_nombre as code,
			                                  vc_cult_nombre as name
                                            from produccion.Cultivo
                                            WHERE 1=1 and status = 1
                                            """, 
                                   'connector':'microsoft_sql',
                                   'parameters':[] ,
                                   'structure': [{"name":"id","type":"int", "where_operator":"in"  }
                                                ,{"name":"code","type":"varchar" }
                                                ,{"name":"name","type":"varchar" }
                                                ]
                                  }  



        self.data_struc_campaignperiods = {'name':'agritracer_campaign_periods_all' ,
                                   'object_name':'security.agritracer_campaign_all' ,
                                   'type':'table' ,
                                   'connector':'microsoft_sql',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_sede_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"company_sede_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"enterprise_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"enterprise_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"cultivo_id","type":"int"  , "where_operator":"="}
                                                ,{"name":"cultivo_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"start_date","type":"date"  }
                                                ,{"name":"end_date","type":"date"  }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ,{"name":"last_period","type":"bool"  , "where_operator":"="}
                                                ,{"name":"data_source","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"created_by","type":"varchar" }
                                                ,{"name":"created_date","type":"datetime" , "where_operator":"between"  }
                                                ,{"name":"last_updated_by","type":"varchar" }
                                                ,{"name":"last_updated_date","type":"datetime" }] 
                                  }    




        self.data_structures = [self.data_structures_01, self.data_structures_02, self.data_structures_03
                               ,self.data_structures_04,self.data_structures_05, self.data_structures_06
                               ,self.data_struc_company, self.data_struc_legalcompany, self.data_struc_user
                               ,self.data_struc_userlogon 
                               ,self.data_struc_softwareproduct, self.data_struc_subscription, self.data_struc_software_product_license
                               ,self.data_struc_software_product_config, self.data_struc_software_product_license_asg
                               ,self.data_struc_sec_group_user, self.data_struc_sec_group_user_item, self.data_struc_sys_software_function
                               ,self.data_struc_sys_software_module , self.data_struc_sys_software_menu
                               ,self.data_struc_sys_software_menu_line , self.data_struc_sec_software_role 
                               ,self.data_struc_sec_software_role_grant , self.data_struc_sec_role_group_user_asg ,self.data_struc_company_dynamo 
                               ,self.data_struc_userlogontoken_ms , self.data_struc_userlogontoken_dy
                               ,self.data_struc_query_seguridad_ms
                               ,self.data_struc_sec_group_user_login, self.data_struc_sec_role_group_user_asg_login , self.data_struc_sec_software_role_login
                               ,self.data_struc_sec_software_role_grant_login, self.data_struc_sys_software_module_login, self.data_struc_sys_software_menu_login
                               ,self.data_struc_sys_software_menu_line_login , self.data_struc_sys_software_function_login
                               ,self.data_struc_query_subscription_ms 
                               ,self.data_struc_software_product_license_login ,self.data_struc_software_product_config_login
                               ,self.data_struc_software_product_license_asg_login, self.data_struc_softwareproduct_login
                               ,self.data_agritracer_login , self.data_struc_user_query_in,
                               self.data_struc_sys_software_module_in, self.data_struc_sys_software_menu_in, self.data_struc_sec_software_role_in
                               ,self.db01_enterprise, self.db02_enterprise, self.db03_enterprise, self.db04_enterprise
                               ,self.db01_cultivo,self.db02_cultivo,self.db03_cultivo,self.db04_cultivo
                               ,self.data_struc_campaignperiods]
        
        
    def fun_get_structure(self , vv_structure_name):
        
        objReturn = {}
        for curItem in self.data_structures:
            
            if curItem['name'] == vv_structure_name:
                objReturn = curItem
                break
            
        return objReturn
                
        
        
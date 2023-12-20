
## OPCIONES DE DATOS POR VARIABLE
# type --> int , long , varchar , float , datetime ,  date , bool 
# primarykey --> auto , value
# where_operator --> = , like

class system_data_structures():
    
    def __init__(self):
        
        super(system_data_structures,self).__init__()
        
        self.data_connectors = [{'name':'microsoft_sql'},{'name':'aws_athenas'}]
        
        self.current_data_connectors = ['aws_athenas','microsoft_sql']
        

      
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


        #Querys Athenas
        self.data_struc_company_qry1 = {'name':'dlake_company_qry' ,
                                   'object_name':'yawi_datalake_global_dev.company' ,
                                   'type':'query' ,
                                   'connector':'aws_athenas',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"legal_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_number","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"country","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"city","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ]
                                  }
                                       



        self.data_struc_company_sede_qry1 = {'name':'dlake_company_sede_qry' ,
                                   'object_name':'yawi_datalake_hortifrut_dev.dim_company_sede' ,
                                   'type':'query' ,
                                   'connector':'aws_athenas',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int" , "where_operator":"="  }
                                                ,{"name":"company_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"legal_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_number","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"country","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"city","type":"varchar" , "where_operator":"like"}
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ]
                                  }



        self.data_struc_cultivo_qry1 = {'name':'dlake_cultivo_qry' ,
                                   'object_name':'yawi_datalake_hortifrut_dev.dim_cultivo' ,
                                   'type':'query' ,
                                   'connector':'aws_athenas',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int" , "where_operator":"="  }
                                                ,{"name":"company_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ]
                                  }



        self.data_struc_variedad_qry1 = {'name':'dlake_variedad_qry' ,
                                   'object_name':'yawi_datalake_hortifrut_dev.dim_variedad' ,
                                   'type':'query' ,
                                   'connector':'aws_athenas',
                                   'structure': [{"name":"id","type":"int" , "where_operator":"=" ,"primarykey":"auto" }
                                                ,{"name":"company_id","type":"int" , "where_operator":"="  }
                                                ,{"name":"company_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"company_sede_id","type":"int" , "where_operator":"="  }
                                                ,{"name":"company_sede_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"cultivo_id","type":"int" , "where_operator":"="  }
                                                ,{"name":"cultivo_code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"code","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"status","type":"bool"  , "where_operator":"="}
                                                ]
                                  }




        self.data_struc_cloudwatch_qry1 = {'name':'cloudwatch_metricas_qry' ,
                                   'object_name':'yawi_cloudwatch_logs.fact_metricas_aws_dev' ,
                                   'type':'query' ,
                                   'connector':'aws_athenas',
                                   'structure': [{"name":"report_code","type":"varchar" , "where_operator":"="}
                                                ,{"name":"report_name","type":"varchar" , "where_operator":"="  }
                                                ,{"name":"componente","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"name_space","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"metric_name","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"data_label","type":"varchar" , "where_operator":"like" }
                                                ,{"name":"report_date","type":"varchar" , "where_operator":"="  }
                                                ,{"name":"report_year","type":"int" , "where_operator":"="  }
                                                ,{"name":"report_month","type":"int" , "where_operator":"="  }
                                                ,{"name":"report_day","type":"int" , "where_operator":"="  }
                                                ,{"name":"data_count","type":"float" , "where_operator":"="  }
                                                ,{"name":"data_avg","type":"float" , "where_operator":"="  }
                                                ,{"name":"data_sum","type":"float" , "where_operator":"="  }
                                                ,{"name":"data_min","type":"float" , "where_operator":"="  }
                                                ,{"name":"data_max","type":"float" , "where_operator":"="  }
                                                ,{"name":"data_unit","type":"varchar" , "where_operator":"="  }
                                                ,{"name":"umbral","type":"float" , "where_operator":"="  }
                                                ,{"name":"report_hour","type":"int" , "where_operator":"="  }
                                                ,{"name":"report_minute","type":"int" , "where_operator":"="  }
                                                ,{"name":"report_date_hour","type":"datetime" , "where_operator":"between"  }
                                                ]
                                  }



        self.data_structures = [self.data_struc_company_qry1, self.data_struc_company_sede_qry1, self.data_struc_cultivo_qry1,
                                self.data_struc_variedad_qry1, self.data_struc_cloudwatch_qry1]
        
        
    def fun_get_structure(self , vv_structure_name):
        
        objReturn = {}
        for curItem in self.data_structures:
            
            if curItem['name'] == vv_structure_name:
                objReturn = curItem
                break
            
        return objReturn
                
        
        
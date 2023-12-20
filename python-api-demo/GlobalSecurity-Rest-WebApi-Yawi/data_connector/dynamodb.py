
import json
from datetime import datetime
from datetime import timedelta
from collections import defaultdict, namedtuple 
import logging
from typing import Iterable, Optional
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr


logger = logging.getLogger(__name__)

class dynamodb_connector():
    
    def __init__(self, obj_data_structure, str_table_index: Optional[str] = None, str_region: Optional[str] = None):
        
        super(dynamodb_connector,self).__init__()
        
        #Structura
        self.data_structure = obj_data_structure
        #Cadena Conexion
        self.str_table_index        = str_table_index
        self.str_region             = str_region
        self.obj_connection         = boto3.resource('dynamodb', region_name=str_region)
        
        self.table_connection       = self.obj_connection.Table(self.data_structure['object_name'])
        self.table_index_connection = self.obj_connection.Table(str_table_index)

        
        
    #Generador de Sequencial    
    def fn_get_new_table_id(self):
        
        newID = None
        
        try:

            curTableSequence = self.table_index_connection.get_item(Key={'table_key': self.data_structure['object_name']})
            
            newID =  curTableSequence['Item']['current'] + curTableSequence['Item']['increment_by']
            
            responseUpdt = self.table_index_connection.update_item( Key={'table_key': self.data_structure['object_name'] },
                                                     UpdateExpression="set #prm_current = :pcurrent",
                                                     ExpressionAttributeValues={ ':pcurrent': newID },
                                                     ExpressionAttributeNames={  "#prm_current": "current"  },
                                                     ReturnValues="UPDATED_NEW" )
                                                     
            
        except ClientError as e:
            print('Read Error')
            print(e.response['Error']['Message'])
            return None
        else:
            #return response['Item']
            pass
            print('No Error')
        
        
        return newID
        
        
        
        
     
     
     
    #EJECUTAR QUERY SELECT
    def fn_execute_select_query(self ,obj_parameters,type_condition ):
        
        listresponse = []

    
        try:
            objectParameterSelect = {}
            
            #Obtener Parametros de Query
            var_query, curItemSelect, var_where, curItemWhere, flagQuery , var_where_keys, curItemWhere_keys = self.fn_get_query(obj_parameters,type_condition)
            
            if 'table_index' in self.data_structure:
                objectParameterSelect['IndexName'] =  self.data_structure['table_index']
                
            if flagQuery:
                objectParameterSelect['KeyConditionExpression'] =  var_where_keys
                if var_where is not None:
                    objectParameterSelect['FilterExpression'] =  var_where
            else:
                objectParameterSelect['FilterExpression'] =  var_where
            
            objectParameterSelect['ExpressionAttributeValues'] =  curItemWhere
            objectParameterSelect['ProjectionExpression'] =  var_query
            objectParameterSelect['ExpressionAttributeNames'] =  curItemSelect
            

            
            responsedata = None
            
            #Selecciona Query o Scan
            if flagQuery:
                responsedata = self.table_connection.query(**objectParameterSelect)
                if 'Items' in responsedata:
                    listresponse = responsedata['Items']
            else:
                responsedata = self.table_connection.scan(**objectParameterSelect)
                if 'Items' in responsedata:
                    listresponse = responsedata['Items']
                    
                while 'LastEvaluatedKey' in responsedata:
                    objectParameterSelect['ExclusiveStartKey'] = responsedata['LastEvaluatedKey']
                    responsedata = self.table_connection.scan(**objectParameterSelect)
                    listresponse.extend(responsedata['Items'])

        except ClientError as e:
            print('Read Error')
            print(e.response['Error']['Message'])
        else:
            #return response['Item']
            print('No Error')    


        
        return listresponse
        
        
        
        

             
     
     
     
    #EJECUTAR SCRIPT INSERT
    def fn_execute_insert(self ,obj_parameters ):
        
        varGoodExecutionFlag = False
        objResponse = None
        
        if self.data_structure['type'] == "table":
            
            curItemInsert  = None
            
            try:
                
                curItemInsert  = self.fn_get_post(obj_parameters)
                self.table_connection.put_item(Item=curItemInsert )
                varGoodExecutionFlag = True
        
            except ClientError as e:
                varGoodExecutionFlag = False
                print('Insert Error')
                print(e.response['Error']['Message'])
                pass
            else:
                #return response['Item']
                print('No Error')
            

        
            objResponse = curItemInsert
        
        else:
            objResponse = None
            
        return objResponse
        
 
 
      
    #EJECUTAR SCRIPT UPDATE
    def fn_execute_update(self ,obj_put_parameters,obj_parameters,type_condition,flagSelect: Optional[bool] = False ):
        
        varGoodExecutionFlag = False
        
        if self.data_structure['type'] == "table":
            
            listresponse = []
            curItemKeys, curItemPut, var_put  = self.fn_get_put(obj_put_parameters,obj_parameters,type_condition)

            objResponse = None
            
            try:
                
                objResponse = self.table_connection.update_item( Key= curItemKeys ,
                                                     UpdateExpression= var_put ,
                                                     ExpressionAttributeValues= curItemPut ,
                                                     ReturnValues="UPDATED_NEW" )
                
                varGoodExecutionFlag = True                                     
            
            except ClientError as e:
                print('Update Error')
                print(e.response['Error']['Message'])
                varGoodExecutionFlag = False
                return None
            else:
                #return response['Item']
                pass
                print('No Error')
                    
        
            if flagSelect:
                
                listresponse = []
        
                objResponse = listresponse
            
            else:
                objResponse = varGoodExecutionFlag
        
        else:
            objResponse = varGoodExecutionFlag
        
        
        return objResponse
 
 
   
    
    #EJECUTAR QUERY DELETE
    def fn_execute_delete(self ,obj_parameters,type_condition ):
        
        varGoodExecutionFlag = False
        objResponse = None
        
        if self.data_structure['type'] == "table":
            
            curItemKeys  = self.fn_get_delete(obj_parameters,type_condition)
 
            objResponse = None
        
            try:
                objResponse = self.table_connection.delete_item( Key= curItemKeys )
                varGoodExecutionFlag = True                                     
            
            except ClientError as e:
                print('Update Error')
                print(e.response['Error']['Message'])
                varGoodExecutionFlag = False
                return None
            else:
                #return response['Item']
                pass
                print('No Error')
                     
        
            objResponse = varGoodExecutionFlag
        else:
            objResponse = varGoodExecutionFlag
        
        return objResponse
        








        
    ### GENERA DYNAMO CODE ####
    
         
    #Funcion para Recuperar Parametros SELECT    
    def fn_get_query(self,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeparams = len(obj_parameters)
        var_query=""
        var_where=""
        flagPrimarykey = False
        curItemSelect = {}
                
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        #Construir Seccion de SELECT 
        var_query = ""
        for curIdx, curItem in enumerate(obj_structure):
            
            curItemSelect["#"+curItem['name']]=curItem['name']
            
            var_query = var_query + "#"+curItem['name']
            if curIdx < lsize-1:
                var_query = var_query + ","
                
        
            if 'primarykey' in curItem:
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            flagPrimarykey = True
                            break
        
        
        #Construir Seccion de WHERE 
        var_where = None
        curItemWhere = None
         
        #Construir Seccion WHERE  Keys
        keys_obj_structure = []
        keys_obj_parameters = {}
        regular_obj_structure = []
        regular_obj_parameters = {}
        var_where_keys = None
        curItemWhere_keys = None
        
        #Evaluar Construccion de Estructuras si es Query o Scan
        if flagPrimarykey:
            for curItem in obj_structure:
                if 'primarykey' in curItem or 'secondarykey' in curItem  :
                    keys_obj_structure.append(curItem)
                    if curItem['name'] in obj_parameters:
                        keys_obj_parameters[curItem['name']] = obj_parameters[curItem['name']]
                        
                else:
                    regular_obj_structure.append(curItem)
                    if curItem['name'] in obj_parameters:
                        regular_obj_parameters[curItem['name']] = obj_parameters[curItem['name']]
                
            var_where_keys, curItemWhere_keys = self.fn_get_sql_where_parameter(keys_obj_structure, keys_obj_parameters ,type_condition)
            var_where, curItemWhere = self.fn_get_sql_where_parameter(regular_obj_structure, regular_obj_parameters ,type_condition)
            curItemWhere.update(curItemWhere_keys)
        
        else:
            var_where, curItemWhere = self.fn_get_sql_where_parameter(obj_structure, obj_parameters ,type_condition)
            
        
        
        return var_query,curItemSelect, var_where , curItemWhere, flagPrimarykey , var_where_keys, curItemWhere_keys
        
        
    
    
    

    #Funcion para Recuperar Parametros para  INSERT        
    def fn_get_post(self,obj_parameters):
        
        lsizeparams = len(obj_parameters)
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        curItemInsert = {}
        
 
        #Construir Objeto de VALUES 
        for curIdx, curItem in enumerate(obj_structure):
            if 'primarykey' in curItem and curItem['primarykey'] == "auto":
                curItemInsert[curItem['name']] = self.fn_get_new_table_id()
            
            if 'primarykey' in curItem and curItem['primarykey'] == "value":
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemInsert[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            break
                        

            if 'primarykey' not in curItem:
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemInsert[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            break
                        
        
        return curItemInsert
        
            



    #Funcion para Recuperar Parametros UPDATE            
    def fn_get_put(self,obj_put_parameters,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeputparams = len(obj_put_parameters)
        lsizeparams    = len(obj_parameters)
        var_put=""
        curItemPut = {}
        
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        #Construir Seccion de UPDATE 
        var_put = "SET "
        for curIdx, curItem in enumerate(obj_structure):

            varCur = 0
            for curParam in obj_put_parameters:
                if curParam == curItem['name'] and 'primarykey' not in curItem :
                    var_put = var_put + curItem['name'] + " = :"+curItem['name'] + " "
            
                    #Agregar Valor Comparacion
                    curItemPut[":"+curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_put_parameters,  obj_put_parameters[curItem['name']])

                    if varCur < lsizeputparams-1:
                        var_put = var_put + ","
                        
                varCur = varCur +1 
                
            
        #Construir Seccion de WHERE o KEYS FILTER 
        curItemKeys = {}
        flagPrimarykey = False

        for curIdx, curItem in enumerate(obj_structure):
            
            if 'primarykey' in curItem:
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemKeys[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            flagPrimarykey = True
                            break
                        

            if 'primarykey' not in curItem:
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemKeys[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            break
                                
        if flagPrimarykey == False:
            curItemPut = None
            curItemKeys = None
            var_put="NONE"
            
        
        return curItemKeys, curItemPut, var_put
        



         
    #Funcion para Recuperar Parametros DELETE                       
    def fn_get_delete(self,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeparams = len(obj_parameters)
        
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)

        #Construir Seccion de WHERE o KEYS FILTER 
        curItemKeys = {}
        flagPrimarykey = False

        for curIdx, curItem in enumerate(obj_structure):
            
            if 'primarykey' in curItem:
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemKeys[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            flagPrimarykey = True
                            break
                        

            if 'primarykey' not in curItem:
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            curItemKeys[curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])
                            break
                                
        if flagPrimarykey == False:
            curItemKeys = None
        
        return curItemKeys
        
         
         
         
         
         
         
                
                
    #FUNCIONES REUTILIZABLES
    
    #CONVERTIR DATA JSON TO DYNAMO STRUCTURA
    def fn_convert_jsondata_to_dynamodata(self, objType,objName,obj_parameters,objValue ):
        
        varcurrent = None
    
        if objType == "int" and objName in obj_parameters:
            varcurrent = int(objValue)
                    
        if objType == "long" and objName in obj_parameters:
            varcurrent = int(objValue)
                    
        if objType == "varchar" and objName in obj_parameters:
            varcurrent = str(objValue)
                    
        if objType == "float" and objName in obj_parameters:
            varcurrent = float(objValue)

        if objType == "datetime" and objName in obj_parameters:
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M:%S')
                varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:%S.000Z')
            except ValueError:
                try:
                    objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M')
                    varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:00.000Z')
                except ValueError:
                    try:
                        objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M:%S.%fZ')
                        varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:00.000Z')
                    except ValueError:
                        pass
                      
                #varcurrent[cur["name"]] = datetime.strptime(str(row[idx]), '%Y-%m-%d %H:%M:%S.%f')
                    

        if objType == "date" and objName in obj_parameters:
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d')
                varcurrent = objDateTime.strftime('%Y-%m-%dT00:00:00.000Z')
            except ValueError:
                pass            
                
            #varcurrent = datetime.strptime(str(objValue), '%Y-%m-%d')
                    
        if objType == "bool" and objName in obj_parameters:
            
            varcurrent = bool(objValue)  
        
        
        return varcurrent                    
    
    
    #CONVERTIR DATA RAW TO JSON STRUCTURA
    def fn_convert_rawdata_to_structuredata(self, objType,objName,obj_parameters,objValue ):
        
        varcurrent = None
    
        if objType == "int" and objName in obj_parameters:
            varcurrent = int(objValue)
                    
        if objType == "long" and objName in obj_parameters:
            varcurrent = int(objValue)
                    
        if objType == "varchar" and objName in obj_parameters:
            varcurrent = str(objValue)
                    
        if objType == "float" and objName in obj_parameters:
            varcurrent = float(objValue)

        if objType == "datetime" and objName in obj_parameters:
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M:%S')
                varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:%S.000Z')
            except ValueError:
                try:
                    objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M')
                    varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:00.000Z')
                except ValueError:
                    try:
                        objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M:%S.%fZ')
                        varcurrent = objDateTime.strftime('%Y-%m-%dT%H:%M:00.000Z')
                    except ValueError:
                        pass
                      
                #varcurrent[cur["name"]] = datetime.strptime(str(row[idx]), '%Y-%m-%d %H:%M:%S.%f')
                    

        if objType == "date" and objName in obj_parameters:
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d')
                varcurrent = objDateTime.strftime('%Y-%m-%dT00:00:00.000Z')
            except ValueError:
                pass            
                
            #varcurrent = datetime.strptime(str(objValue), '%Y-%m-%d')
                    
        if objType == "bool" and objName in obj_parameters:
            
            varcurrent = bool(objValue)  
        
        
        return varcurrent                
        
        
        
        

    
    #Obtener SQL TXT asociado al parametro y tipo de datos
    def fn_get_sql_txt_parameter_by_type(self, objType,objValue):
        
        var_sql_txt=""
        
        #Agregar Valor Comparacion
        if objType in ["int","long","float"]:
            var_sql_txt = str(objValue)
        if objType == "varchar":
            var_sql_txt = " '"+ str(objValue)+"' "
            
        if objType in ["date"]:
            objDateTimeTxt =""
            objDateTime = None
            
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d')
            except ValueError:
                try:
                    objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M')
                except ValueError:
                    try:
                        objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M:%S.%fZ')
                    except ValueError:
                        objDateTime = datetime.utcnow() - timedelta(hours=5, minutes=0)
                        pass
                    
            
            objDateTimeTxt = objDateTime.strftime('%Y-%m-%d')
            var_sql_txt = " '"+ objDateTimeTxt +"' "
            
        if objType in ["datetime"]:
            objDateTimeTxt =""
            objDateTime = None
            
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M')
            except ValueError:
                try:
                    objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M:%S')
                except ValueError:
                    try:
                        objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M:%S.%fZ')
                    except ValueError:
                        objDateTime = datetime.utcnow() - timedelta(hours=5, minutes=0)
                        pass

            objDateTimeTxt = objDateTime.strftime('%Y-%m-%d %H:%M')
            var_sql_txt = " '"+ objDateTimeTxt +"' "
        if objType in ["bool"]:
            if objValue :
                var_sql_txt = "1"
            else:
                var_sql_txt = "0"
        
        return var_sql_txt    
    
        
        
        
        
        
        
    #OBTENER SECCION WHERE
    def fn_get_sql_where_parameter(self, obj_structure ,obj_parameters,type_condition):
        
        #Datos Where
        lsizeparams = len(obj_parameters)
        curItemWhere = {}
        
        #Construir Seccion de WHERE 
        var_where=" "
        
        for curIdx, curItem in enumerate(obj_structure):
            if 'where_operator' in curItem:
                varCur = 0
                for curParam in obj_parameters:
                    if curParam == curItem['name']:
                        
                        varObjType = type(obj_parameters[curItem['name']])
                        
                        #Agregar Campo
                        if curItem['where_operator'] in ["=","between","in"]:
                            var_where = var_where + curItem['name']
                        
                        #Agregar Operador
                        if curItem['where_operator'] == "=":
                            var_where = var_where + " = "
                        if curItem['where_operator'] == "like":
                            var_where = var_where + " contains( "+curItem['name'] + " , "
                        if curItem['where_operator'] == "between" and varObjType == list:
                            var_where = var_where + " between "    
                        if curItem['where_operator'] == "in" and varObjType == list:
                            var_where = var_where + " in "                                
                        
                        if curItem['where_operator'] in ["="]:
                            #Agregar Valor Comparacion
                            var_where = var_where + ":"+curItem['name']
                            curItemWhere[":"+curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])

                        if curItem['where_operator'] in ["like"]:
                            #Agregar Valor Comparacion
                            var_where = var_where + ":"+curItem['name'] + " ) "
                            curItemWhere[":"+curItem['name']] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']])


                        if curItem['where_operator'] == "between" and varObjType == list:
                            varlsize = len(obj_parameters[curItem['name']])
                            if varlsize == 2:
                                var_where = var_where + ":"+curItem['name']+"_start" + " AND "  + ":"+curItem['name']+"_end"
                                curItemWhere[":"+curItem['name']+"_start"] = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']][0])
                                curItemWhere[":"+curItem['name']+"_end"]   = self.fn_convert_jsondata_to_dynamodata(curItem['type'],curItem['name'],obj_parameters,  obj_parameters[curItem['name']][1])
                        
                        if curItem['where_operator'] == "in" and varObjType == list:
                            varlsize = len(obj_parameters[curItem['name']])
                            listData = obj_parameters[curItem['name']]
                            var_where = var_where + " ( "
                            if varlsize > 0:
                                for curParmIdx, curParmDat in enumerate(listData):
                                    var_where = var_where + self.fn_get_sql_txt_parameter_by_type(curItem['type'],curParmDat)
                                    if curParmIdx < varlsize-1:
                                        var_where = var_where + " , "
                            var_where = var_where + " ) "      
                            
                        #Conector Condicional
                        if varCur < lsizeparams-1:
                            var_where = var_where + " "+type_condition+" "
                    varCur = varCur +1    
        
        
        if var_where == " ":
            var_where = None        
        
        return var_where , curItemWhere
    
            
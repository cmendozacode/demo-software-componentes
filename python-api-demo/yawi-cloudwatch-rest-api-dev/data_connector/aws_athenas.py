import json
from datetime import datetime
from datetime import timedelta
from collections import defaultdict, namedtuple 
import logging
from typing import Iterable, Optional

import time
import boto3

logger = logging.getLogger(__name__)

class aws_athenas_sql_connector():
    
    def __init__(self, obj_data_structure, str_region: Optional[str] = None, sql_OutputLocation: Optional[str] = None):
        
        super(aws_athenas_sql_connector,self).__init__()
        
        #Structura
        self.data_structure = obj_data_structure
        #Cadena Conexion
        self.boto_session = boto3.Session()
        self.sql_OutputLocation = sql_OutputLocation
        self.obj_connection = self.boto_session.client('athena', region_name=str_region)
        self._connections = {}
        
        self.data_structure_query = ""
        
        #Get Bucket and path from OutputPath
        lsize = len(sql_OutputLocation)
        outputpath_substr = sql_OutputLocation[5:lsize]
        idxchar1 = outputpath_substr.find('/')
        self.bucketname = outputpath_substr[0:idxchar1]
        lsize = len(outputpath_substr)
        self.bucketpath = outputpath_substr[idxchar1+1:lsize]



        
    
    
    #Proceso de Espera hasta Finalizacion de Query
    def wait_until_athena_query_end(self,prmQueryId, objAthenaApi, period=0.25,timeout=50):
        
        mustend = time.time() + timeout
        while time.time() < mustend:
            #print('Lunch get State:')
            queryRequestStatus = objAthenaApi.get_query_execution(QueryExecutionId=prmQueryId)
            queryRequestStatusState = queryRequestStatus['QueryExecution']['Status']['State']
            #print('Datos - State:')
            #print(queryRequestStatusState)
            if queryRequestStatusState == 'SUCCEEDED':
                return True
            time.sleep(period)
        return False
    
    
    #Convertir Resultado Athenas a JSON
    def convert_result_athenas_to_jsonbase(self,objAthenas):
        
        resultDataList = []

        resultSet = objAthenas['ResultSet']
        resultSetRows = []
        lsizerows = 0
    
        if resultSet is not None:
            resultSetRows = resultSet['Rows']
            lsizerows     = len(resultSetRows)
    
        objHeaders = None

        for idxRow, curRow in enumerate(resultSetRows):
            
            #Process Header
            if idxRow == 0:
                objHeaders = curRow['Data']
            
            #Process Data
            if idxRow > 0:
                curObject = {}
            
                for idxItem, curItem in enumerate(curRow['Data']):
                    if 'VarCharValue' in curItem and 'VarCharValue' in objHeaders[idxItem]:
                        curObject[objHeaders[idxItem]['VarCharValue']] = curItem['VarCharValue']
                
                resultDataList.append(curObject)    
        
        
        
        #Listado Json
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        for idxRow, curRow in enumerate(resultDataList):
            for curIdx, curItem in enumerate(obj_structure):
                if curItem['name'] in curRow:
                    curRow[curItem['name']] = self.fn_convert_rawsqldata_to_structuredata(curItem['type'],curItem['name'],curRow,curRow[curItem['name']])
                    
       
        return  resultDataList
        
        
    
    
    #Ejecuccion de Query 
    def fn_fetch_inter(self , vvSqlSelectScript, vlist_filter_parameters ):
        
        queryRequestId = None

        #Lanzar Query
        queryRequestId = self.obj_connection.start_query_execution(
            QueryString = vvSqlSelectScript,
            QueryExecutionContext = { 'Catalog': 'AwsDataCatalog' },
            ResultConfiguration = { 'OutputLocation': self.sql_OutputLocation }
        )
        print('End Query Execution')
        print(datetime.utcnow())
        print(queryRequestId)
        print('End Request Execution')
        
        #Esperar hasta que el Query complete su Ejecuccion
        queryRequestStatusStateFlag = self.wait_until_athena_query_end(queryRequestId['QueryExecutionId'],self.obj_connection)
        print('End of Wait')
        
        #Esperar hasta que el Query complete su Ejecuccion
        resultDataJson = None
        responsedata   = None
        if queryRequestStatusStateFlag:
            responsedata    = self.obj_connection.get_query_results(QueryExecutionId=queryRequestId['QueryExecutionId'])
            print('Data Retrived')
            resultDataJson  = self.convert_result_athenas_to_jsonbase(responsedata)
        
        self.obj_connection.stop_query_execution(QueryExecutionId=queryRequestId['QueryExecutionId'])
        self.cleanup_s3(queryRequestId['QueryExecutionId'])
        
        return resultDataJson


    

    # Deletes all files in your path so use carefully!
    def cleanup_s3(self, objfilename):
        s3 = self.boto_session.resource('s3')
        my_bucket = s3.Bucket(self.bucketname)
        for item in my_bucket.objects.filter(Prefix=self.bucketpath+objfilename):
            item.delete()



    #EJECUTAR QUERY SELECT
    def fn_execute_select_query(self ,obj_parameters,type_condition ):
        
        listresponse = []

        vvSelect , vvWhere  = self.fn_get_query(obj_parameters,type_condition)
        vvSqlSelectScript = vvSelect + vvWhere
        print(vvSqlSelectScript)
        
        listDataResult = self.fn_fetch_inter( vvSqlSelectScript , None )
        
        for curitem in listDataResult:
            listresponse.append(curitem)
        
        return listresponse

    
    

    def fn_execute_select_raw_query(self ,obj_parameters ):
        #Parametros Base
        prmlist_filter_parameters=[]

        var_query_base = self.data_structure['script']
        obj_structure_param = self.data_structure['parameters']
        lsize = len(obj_structure_param)
    
        for curIdx, curItem in enumerate(obj_structure_param):
            if curItem['name'] in obj_parameters:
                
                nro_repeated = var_query_base.count(":"+curItem['name'])
                #var_query_base = var_query_base.replace(":"+curItem['name'],"?")
                value_param = self.fn_get_sql_txt_parameter_by_type(curItem['type'], obj_parameters[curItem['name']] )
                var_query_base = var_query_base.replace(":"+curItem['name'],value_param)
                
                #for curParm in range(nro_repeated):
                #    value_param = self.fn_get_sql_txt_parameter_by_type(curItem['type'], obj_parameters[curItem['name']] )
                #    prmlist_filter_parameters.append(value_param)
                    
            if curItem['name'] not in obj_parameters:
                
                nro_repeated   = var_query_base.count(":"+curItem['name'])
                #var_query_base = var_query_base.replace(":"+curItem['name'],"?")
                var_query_base = var_query_base.replace(":"+curItem['name'],"null")
                
                #for curParm in range(nro_repeated):
                #    prmlist_filter_parameters.append("null")
        
        
        #Ejecuccion de Query
        listresponse = []
        
        vvSqlSelectScript = var_query_base
        print("Dato Query raw")
        #print(vvSqlSelectScript)
        
        listDataResult = self.fn_fetch_inter( vvSqlSelectScript , prmlist_filter_parameters )
        
        
        for curitem in listDataResult:
            listresponse.append(curitem)
        
        return listresponse             
     

    
    
    
    
    




 
 
 
 
 
  
    










   
    
    
    
    ### GENERA SQL CODE ####
     
    #Funcion para Recuperar TXT SELECT    
    def fn_get_query(self,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeparams = len(obj_parameters)
        var_query=""
        var_where=""
        
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        #Construir Seccion de SELECT 
        var_query = "SELECT "
        for curIdx, curItem in enumerate(obj_structure):
            var_query = var_query + curItem['name']
            if curIdx < lsize-1:
                var_query = var_query + ","
                
        var_query = var_query+ " FROM "+self.data_structure['object_name'] + " "
        
            
        #Construir Seccion de WHERE 
        var_where= self.fn_get_sql_where_parameter(obj_structure, obj_parameters ,type_condition)
            
        var_where = var_where + "; "
        
        return var_query, var_where
        
        


    
    
    
    #FUNCIONES REUTILIZABLES
    #CONVERTIR DATA SQL TO JSON STRUCTURA
    def fn_convert_rawsqldata_to_structuredata(self, objType,objName,obj_parameters,objValue ):
        
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
            print('DataFecha:')
            print(objValue)
            
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
                        try:
                            objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d %H:%M:%S.%f')
                            varcurrent  = objDateTime.strftime('%Y-%m-%dT%H:%M:00.000Z')
                        except ValueError:
                            pass
                      
                #varcurrent[cur["name"]] = datetime.strptime(str(row[idx]), '%Y-%m-%d %H:%M:%S.%f')
                    

        if objType == "date" and objName in obj_parameters:
            
            try:
                objDateTime = datetime.strptime(str(objValue), '%Y-%m-%dT%H:%M:%S.%fZ')
                varcurrent = objDateTime.strftime('%Y-%m-%dT00:00:00.000Z')
            except ValueError:
                try:
                    objDateTime = datetime.strptime(str(objValue), '%Y-%m-%d')
                    varcurrent = objDateTime.strftime('%Y-%m-%dT00:00:00.000Z')
                except ValueError:
                    pass            
                
            #varcurrent = datetime.strptime(str(objValue), '%Y-%m-%d')
                    
        if objType == "bool" and objName in obj_parameters:
            
            varcurrent = bool(objValue)  
        
        
        return varcurrent
        
        
    
    #OBTENER SECCION WHERE
    def fn_get_sql_where_parameter(self, obj_structure ,obj_parameters,type_condition):
        
        #Datos Where
        cnt = 0
        for curItem in obj_structure:
            if curItem['name'] in obj_parameters:
                cnt = cnt +1
        
        lsizeparams = cnt
        
        
        #Construir Seccion de WHERE 
        var_where=" WHERE "
        varCur = 0
        for curIdx, curItem in enumerate(obj_structure):
            if 'where_operator' in curItem:
                #varCur = 0
                for curParam in obj_parameters:
                    if curParam == curItem['name']:
                        
                        varObjType = type(obj_parameters[curItem['name']])
                        
                        #Agregar Campo
                        var_where = var_where + curItem['name']
                        
                        #Agregar Operador
                        if curItem['where_operator'] == "=":
                            var_where = var_where + " = "
                        if curItem['where_operator'] == "like":
                            var_where = var_where + " like "
                        if curItem['where_operator'] == "between" and varObjType == list:
                            var_where = var_where + " between "    
                        if curItem['where_operator'] == "in" and varObjType == list:
                            var_where = var_where + " in "                                
                        
                        if curItem['where_operator'] in ["=","like"]:
                            #Agregar Valor Comparacion
                            var_where = var_where + self.fn_get_sql_txt_parameter_by_type(curItem['type'],obj_parameters[curItem['name']])

                        if curItem['where_operator'] == "between" and varObjType == list:
                            varlsize = len(obj_parameters[curItem['name']])
                            if varlsize == 2:
                                var_where = var_where + self.fn_get_sql_txt_parameter_by_type(curItem['type'],obj_parameters[curItem['name']][0]) + " AND " + self.fn_get_sql_txt_parameter_by_type(curItem['type'],obj_parameters[curItem['name']][1]) 
                        
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
        
        
        if var_where == " WHERE ":
            var_where = ""        
        
        return var_where
    
    
    
    
    
    #Obtener SQL TXT asociado al parametro y tipo de datos
    def fn_get_sql_txt_parameter_by_type(self, objType,objValue):
        
        var_sql_txt=""
        
        #Manejo de Nulos
        if objValue is None:
            var_sql_txt = " null "
            
            return var_sql_txt
        
        
        
        #Agregar Valor Comparacion
        if objType in ["int","long","float"]:
            var_sql_txt = str(objValue)
        if objType == "varchar":
            var_sql_txt = " '"+ str(objValue)+"' "
            
        if objType in ["date"]:
            objDateTimeTxt =""
            objDateTime = None
            
            if objValue is None:
                var_sql_txt = " null "
            else:
                
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
                #var_sql_txt = " date_parse('"+ objDateTimeTxt +"','%Y-%m-%d') "
                var_sql_txt = " CAST('"+ objDateTimeTxt +"' AS DATE) "
            
        if objType in ["datetime"]:
            objDateTimeTxt =""
            objDateTime = None
            
            if objValue is None:
                var_sql_txt = " null "
            else:
                
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
                #var_sql_txt = " date_parse('"+ objDateTimeTxt +"','%Y-%m-%d %H:%M') "
                var_sql_txt = " CAST('"+ objDateTimeTxt +"' AS TimeStamp) "
                
        if objType in ["bool"]:
            if objValue :
                var_sql_txt = "true"
            else:
                var_sql_txt = "fa"
        
        return var_sql_txt    
    
        
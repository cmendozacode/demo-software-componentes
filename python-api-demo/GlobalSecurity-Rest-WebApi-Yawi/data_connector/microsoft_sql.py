
import json
from datetime import datetime
from datetime import timedelta
from collections import defaultdict, namedtuple 
import logging
from typing import Iterable, Optional
import pyodbc



logger = logging.getLogger(__name__)

class microsoft_sql_connector():
    
    def __init__(self, obj_data_structure, str_connection: Optional[str] = None):
        
        super(microsoft_sql_connector,self).__init__()
        
        #Structura
        self.data_structure = obj_data_structure
        #Cadena Conexion
        self.str_connection = str_connection
        self.obj_connection = None
        self._connections = {}
        
        self.data_structure_query = ""
        
        
     
    #Obtener Conexion
    def get_connection(self,database: Optional[str] = None) -> 'pyodbc.Connection':
         
        database = database or ''
        if database not in self._connections:
            conn_string = database
        
            try:
                cnxn = pyodbc.connect(conn_string, timeout=3)
            except pyodbc.OperationalError as e:
                logger.exception(e)
                cnxn = None

            self._connections[database] = cnxn

        return self._connections[database]

     
     
    def fn_fetch_inter(self , vvSqlSelectScript, vlist_filter_parameters ):
        
        
        with self.obj_connection as conn:
            
            with conn.cursor() as cursor:
                
                if vlist_filter_parameters:
                    cursor.execute(vvSqlSelectScript, vlist_filter_parameters)
                else:
                    cursor.execute(vvSqlSelectScript)
      
                while True:
                    row = cursor.fetchone()
                    if not row:
                        break

                    varcurrent = {}

                    for idx, cur in enumerate(self.data_structure['structure']):
                        
                        if row[idx] or row[idx] == 0 :
                            varcurrent[cur["name"]] = self.fn_convert_rawsqldata_to_structuredata(cur["type"],cur["name"],[cur["name"]],row[idx])
                        else:
                            varcurrent[cur["name"]] = None

                    yield varcurrent
     
    
    
    def fn_fetch_inter_exec_select(self , vvSqlProcedureScript ):
        
        
        with self.obj_connection as conn:
            
            with conn.cursor() as cursor:
                
                cursor.execute(vvSqlProcedureScript)
      
                while True:
                    row = cursor.fetchone()
                    if not row:
                        break

                    varcurrent = {}

                    for idx, cur in enumerate(self.data_structure['structure']):
                        
                        if row[idx] or row[idx] == 0 :
                            varcurrent[cur["name"]] = self.fn_convert_rawsqldata_to_structuredata(cur["type"],cur["name"],[cur["name"]],row[idx])
                        else:
                            varcurrent[cur["name"]] = None
                           
                    
                    yield varcurrent
     
        
    def fn_fetch_inter_exec_output(self , vvSqlProcedureScript ):
        
        with self.obj_connection as conn:
            
            with conn.cursor() as cursor:
                
                cursor.execute(vvSqlProcedureScript)
      
                while True:
                    row = cursor.fetchone()
                    if not row:
                        break

                    varcurrent = {}
                    varIdx = 0
                    for cur in self.data_structure['parameters']:
                        
                        if 'output' in cur:
                            
                            varcurrent[cur["name"]] = self.fn_convert_rawsqldata_to_structuredata(cur["type"],cur["name"],[cur["name"]],row[varIdx])
                         
                            varIdx = varIdx + 1
                    
                    
                    yield varcurrent
     
            
    

    #EJECUTAR QUERY SELECT
    def fn_execute_select_query(self ,obj_parameters,type_condition ):
        
        listresponse = []

        self.obj_connection = self.get_connection(self.str_connection)
        vvSelect , vvWhere  = self.fn_get_query(obj_parameters,type_condition)
        vvSqlSelectScript = vvSelect + vvWhere
        print(vvSqlSelectScript)
        for curitem in self.fn_fetch_inter( vvSqlSelectScript , None ):
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
                
                nro_repeated   = var_query_base.count(":"+curItem['name'])
                value_param = self.fn_get_sql_txt_parameter_by_type(curItem['type'], obj_parameters[curItem['name']] )
                var_query_base = var_query_base.replace(":"+curItem['name'],value_param)
                #var_query_base = var_query_base.replace(":"+curItem['name'],"?")
                
                #for curParm in range(nro_repeated):
                #    prmlist_filter_parameters.append(obj_parameters[curItem['name']])
       
        #Ejecuccion de Query
        listresponse = []
        
        self.obj_connection = self.get_connection(self.str_connection)
        vvSqlSelectScript = var_query_base
        
        #print("Script SQL::")
        #print(vvSqlSelectScript)
        
        for curitem in self.fn_fetch_inter( vvSqlSelectScript , prmlist_filter_parameters ):
            listresponse.append(curitem)
        
        return listresponse             
     

    
     
    #EJECUTAR SCRIPT INSERT
    def fn_execute_insert(self ,obj_parameters ):
        
        varGoodExecutionFlag = False
        objResponse = None
        varEvalOutput = False
        
        if self.data_structure['type'] == "table":
            
            self.obj_connection = self.get_connection(self.str_connection)
            vvInsert , vvValues  = self.fn_get_post(obj_parameters)
            vvSqlInsertScript = vvInsert + vvValues
            print(vvSqlInsertScript)
            if "output INSERTED." in vvSqlInsertScript:
                varEvalOutput = True
            

            try:
                with self.obj_connection as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(vvSqlInsertScript)
                        if varEvalOutput:
                            objResponse = cursor.fetchone()
                        else:
                            objResponse = []
                        varGoodExecutionFlag = True
        
            except ValueError:
                varGoodExecutionFlag = False
                pass        

            varcurrent = {}
            lsizeOutput = len(objResponse)
        
            for idx, cur in enumerate(self.data_structure['structure']):
                
                if lsizeOutput > 0 :
                    if 'primarykey' in cur and cur['primarykey'] == "auto":
                        varcurrent[cur["name"]] = objResponse[0]
                        
                if 'primarykey' in cur and cur['primarykey'] == "value":
                    varcurrent[cur["name"]] = self.fn_convert_rawsqldata_to_structuredata(cur["type"],cur["name"],obj_parameters,obj_parameters[cur["name"]])
                
                
                if 'primarykey' not in cur and cur["name"] in obj_parameters :
                        
                    varcurrent[cur["name"]] = self.fn_convert_rawsqldata_to_structuredata(cur["type"],cur["name"],obj_parameters,obj_parameters[cur["name"]])
                   
                            
            objResponse = varcurrent
        
        else:
            objResponse = varcurrent
            
        return objResponse
        
        
    
     
    #EJECUTAR SCRIPT UPDATE
    def fn_execute_update(self ,obj_put_parameters,obj_parameters,type_condition,flagSelect: Optional[bool] = False ):
        
        varGoodExecutionFlag = False
        
        if self.data_structure['type'] == "table":
            
            listresponse = []
            self.obj_connection = self.get_connection(self.str_connection)
            vvUpdate , vvWhere  = self.fn_get_put(obj_put_parameters,obj_parameters,type_condition)
            vvSqlUpdateScript = vvUpdate + vvWhere
            print(vvSqlUpdateScript)
            objResponse = None
        
            try:
                
                with self.obj_connection as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(vvSqlUpdateScript)
                        varGoodExecutionFlag = True
        
            except ValueError:
                varGoodExecutionFlag = False
                pass        

        
            if flagSelect:
                
                listresponse = []
                vvSelect , vvWhere  = self.fn_get_query(obj_parameters,type_condition)
                vvSqlSelectScript = vvSelect + vvWhere
        
                for curitem in self.fn_fetch_inter( vvSqlSelectScript , None ):
                    listresponse.append(curitem)
        
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
            
            self.obj_connection = self.get_connection(self.str_connection)
            vvDelete , vvWhere  = self.fn_get_delete(obj_parameters,type_condition)
            vvSqlDeleteScript = vvDelete + vvWhere
 
            objResponse = None
        
            try:
                with self.obj_connection as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(vvSqlDeleteScript)
                        varGoodExecutionFlag = True
        
            except ValueError:
                varGoodExecutionFlag = False
                pass   
        
            objResponse = varGoodExecutionFlag
        else:
            objResponse = varGoodExecutionFlag
        
        return objResponse
        
 
    
    
    #EJECUTAR PROCEDURE SQL
    def fn_execute_sql_procedure(self ,obj_parameters ):
        
        varGoodExecutionFlag = False
        objResponse = None
        listresponse = []
        
        if self.data_structure['type'] == "procedure":
            
            self.obj_connection = self.get_connection(self.str_connection)
            vvSqlProcedure      = self.fn_get_procedure_script(obj_parameters)
            
            objResponse = None
            objExecResponse = None
            
            if self.data_structure['output'] == "select":
                
                for curitem in self.fn_fetch_inter_exec_select( vvSqlProcedure  ):
                    listresponse.append(curitem)
        
                objResponse = listresponse
                
                return objResponse
                
            else:
                
                try:
                    if self.data_structure['output'] == "parameter":
                        for curitem in self.fn_fetch_inter_exec_output( vvSqlProcedure  ):
                            listresponse.append(curitem)
        
                        objResponse = listresponse
                        return objResponse
                    
                    else:
                        with self.obj_connection as conn:
                            with conn.cursor() as cursor:
                                cursor.execute(vvSqlProcedure)
                                varGoodExecutionFlag = True
                        
                        return varGoodExecutionFlag
                            
                except ValueError:
                    varGoodExecutionFlag = False
                    pass   
        
            objResponse = varGoodExecutionFlag
        else:
            objResponse = varGoodExecutionFlag
        
        return objResponse
        
 
 
 
 
 
 
  
    










   
    
    
    
    ### GENERA SQL CODE ####
     
    #Funcion para Recuperar TXT SELECT    
    def fn_get_query(self,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeparams = len(obj_parameters)
        var_query=""
        var_where=""
        var_orderby=""
        
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
        
        if 'orderby' in self.data_structure:
            var_orderby = " ORDER BY "+self.data_structure['orderby']
            
        var_where = var_where +var_orderby+ "; "
        
        return var_query, var_where
        
        

    #Funcion para Recuperar TXT INSERT        
    def fn_get_post(self,obj_parameters):
        
        lsizeparams = len(obj_parameters)
        var_insert=""
        var_values=""
        
        
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        #Construir Seccion de INSERT 
        var_insert = "INSERT INTO "+ self.data_structure['object_name'] + " ( " 
        for curIdx, curItem in enumerate(obj_structure):
            if 'primarykey' in curItem and curItem['primarykey'] == "value":
                var_insert = var_insert + curItem['name']
                if curIdx < lsize-1:
                    var_insert = var_insert + ","
            
            if 'primarykey' not in curItem:
                var_insert = var_insert + curItem['name']
                if curIdx < lsize-1:
                    var_insert = var_insert + ","
        var_insert = var_insert +  ") "
          
          
        #Construir Seccion de VALUES 
        var_output =""
        var_values = " VALUES ( " 
        for curIdx, curItem in enumerate(obj_structure):
            if 'primarykey' in curItem and curItem['primarykey'] == "auto":
                var_output =" output INSERTED."+curItem['name']+" "
            
            if 'primarykey' in curItem and curItem['primarykey'] == "value":
                
                varValue = 'null'
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            varValue = obj_parameters[curItem['name']]
                            break
                        
                if varValue == 'null':
                    var_values = var_values + varValue
                else:
                    #Agregar Valor Comparacion
                    var_values = var_values + self.fn_get_sql_txt_parameter_by_type(curItem['type'],varValue)
                
                
                if curIdx < lsize-1:
                    var_values = var_values + ","
            
            if 'primarykey' not in curItem:
                
                varValue = 'null'
                
                for curIdxParam,curParam in enumerate(obj_parameters):
                    if curParam == curItem['name']:
                        
                        #Evaluar Valores
                        if curItem['name'] in obj_parameters:
                            varValue = obj_parameters[curItem['name']]
                            break
                        
                        
                if varValue == 'null':
                    var_values = var_values + varValue
                else:
                    #Agregar Valor Comparacion
                    var_values = var_values + self.fn_get_sql_txt_parameter_by_type(curItem['type'],varValue)
                
                if curIdx < lsize-1:
                    var_values = var_values + ","
        
        var_values = var_output + var_values +  ") "
                        
        var_values = var_values +  "; "                
        
                                                
        return var_insert, var_values
        
        
        
        
    #Funcion para Recuperar TXT UPDATE            
    def fn_get_put(self,obj_put_parameters,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        obj_structure = self.data_structure['structure']
        
        cnt = 0
        cnt_put = 0
        for curItem in obj_structure:
            if curItem['name'] in obj_parameters:
                cnt = cnt +1
            if curItem['name'] in obj_put_parameters:
                cnt_put = cnt_put +1
        
        lsizeputparams = cnt_put
        lsizeparams    = cnt
        var_put=""
        var_where=""
        
        lsize = len(obj_structure)
        
        #Construir Seccion de SELECT 
        var_put = "UPDATE " + self.data_structure['object_name'] +" SET "
        varCur = 0
        for curIdx, curItem in enumerate(obj_structure):

            for curParam in obj_put_parameters:
                if curParam == curItem['name'] and 'primarykey' in curItem :
                    varCur = varCur +1 
                if curParam == curItem['name'] and 'primarykey' not in curItem :
                    var_put = var_put + curItem['name'] + " = "
            
                    #Agregar Valor Comparacion
                    var_put = var_put + self.fn_get_sql_txt_parameter_by_type(curItem['type'],obj_put_parameters[curItem['name']])

                    if varCur < lsizeputparams-1:
                        var_put = var_put + ","
                        
                    varCur = varCur +1 
                
            
        #Construir Seccion de WHERE
        var_where = self.fn_get_sql_where_parameter(obj_structure, obj_parameters ,type_condition)
            
        var_where = var_where + "; "
        
        return var_put, var_where
        
        
        
    #Funcion para Recuperar TXT DELETE                       
    def fn_get_delete(self,obj_parameters,type_condition):
        
        if type_condition is None:
            type_condition="AND"
        
        lsizeparams = len(obj_parameters)
        var_delete=""
        var_where=""
        
        obj_structure = self.data_structure['structure']
        lsize = len(obj_structure)
        
        #Construir Seccion de DELETE 
        var_delete = "DELETE FROM "+ self.data_structure['object_name'] + " "

                
            
        #Construir Seccion de WHERE
        var_where = self.fn_get_sql_where_parameter(obj_structure, obj_parameters ,type_condition)
            
        var_where = var_where + "; "
        
        return var_delete, var_where
        


        
        
        
    #Funcion para Recuperar TXT SCRIPT                       
    def fn_get_procedure_script(self,obj_parameters):
        
        var_declare =""
        var_out_parameters=""
        
        lsizeparams = len(obj_parameters)
        var_procedure=""
        
        obj_structure = self.data_structure['parameters']
        lsize = len(obj_structure)
        
        #Construir Seccion de EXEC PROCEDURE 
        var_declare = "DECLARE "
        var_procedure = "EXEC "+ self.data_structure['procedure_name'] + " "
        var_out_parameters = " SELECT "

        for curIdx, curItem in enumerate(obj_structure):

            varCur = 0
            for curParam in obj_parameters:
                if curParam == curItem['name'] :
                
                    if 'output' in curItem and curItem['output'] == True:
                        
                        var_declare        = var_declare + " @"+ curItem['name'] +" "+curItem['type']
                        var_out_parameters = var_out_parameters + " @"+ curItem['name'] +" AS "+curItem['name']
                    
                    var_procedure = var_procedure +" @"+ curItem['name'] + " = "
            
                    #Agregar Valor Comparacion
                    if 'output' not in curItem:
                        var_procedure = var_procedure + self.fn_get_sql_txt_parameter_by_type(curItem['type'],obj_parameters[curItem['name']])
            
                    if 'output' in curItem and curItem['output'] == True:
                        var_procedure = var_procedure +" @" +curItem['name'] 
                        var_procedure = var_procedure + " OUTPUT "
                        
                    if varCur < lsizeparams-1:
                        if 'output' in curItem and curItem['output'] == True:
                            var_declare        = var_declare + ","
                            var_out_parameters = var_out_parameters+ ","
                        var_procedure      = var_procedure + ","
                        
                varCur = varCur +1 
                
        
        var_script_final=""
        
        if self.data_structure['output'] == "parameter":
            var_script_final = var_declare + "; " + var_procedure+ "; " +var_out_parameters+ ";  "
        else:
            var_script_final =  var_procedure+ "; "
            
            
            


        
        return var_script_final
        
        
    
    
    
    
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
                var_sql_txt = " CONVERT(DATE,'"+ objDateTimeTxt +"',120) "
            
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
                var_sql_txt = " CONVERT(DATETIME,'"+ objDateTimeTxt +"',120) "
                
        if objType in ["bool"]:
            if objValue :
                var_sql_txt = "1"
            else:
                var_sql_txt = "0"
        
        return var_sql_txt    
    
        
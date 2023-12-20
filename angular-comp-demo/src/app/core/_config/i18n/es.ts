// Spain
export const locale = {
	lang: "es",
	data: {
		TRANSLATOR: {
			SELECT: "Elige tu idioma",
		},
		MENU: {
			NEW: "nuevo",
			ACTIONS: "Comportamiento",
			CREATE_POST: "Crear nueva publicación",
			PAGES: "Pages",
			FEATURES: "Caracteristicas",
			APPS: "Aplicaciones",
			DASHBOARD: "Dashboard",
			HOME: "INICIO",
			SECURITY:'SEGURIDAD'
		},
		AUTH: {
			GENERAL: {
				OR: "O",
				SUBMIT_BUTTON: "Enviar",
				NO_ACCOUNT: "No tienes una cuenta?",
				SIGNUP_BUTTON: "Ingresar",
				FORGOT_BUTTON: "Olvidé mi contraseña",
				BACK_BUTTON: "Atras",
				PRIVACY: "Privacidad",
				LEGAL: "Legal",
				CONTACT: "Contacto",
				ABOUT: "Acerca De",
			},
			LOGIN: {
				TITLE: "Iniciar Sesión",
				BUTTON: "Ingresar",
			},
			FORGOT: {
				TITLE: "Recuperar Contraseña",
				DESC: "Ingrese su correo electrónico para restablecer su contraseña",
				SUCCESS: "Se envió la contraseña al correo indicado.",
			},
			REGISTER: {
				TITLE: "Sign Up",
				DESC: "Enter your details to create your account",
				SUCCESS: "Your account has been successfuly registered.",
			},
			INPUT: {
				EMAIL: "Email",
				NAME: "Usuario",
				FULLNAME: "Nombre Completo",
				PASSWORD: "Contraseña",
				CONFIRM_PASSWORD: "Confirmar Contraseña",
				USERNAME: "Usuario",
			},
			VALIDATION: {
				INVALID: "{{name}} is not valid",
				REQUIRED: "{{name}} is required",
				MIN_LENGTH: "{{name}} minimum length is {{min}}",
				AGREEMENT_REQUIRED: "Accepting terms & conditions are required",
				NOT_FOUND: "The requested {{name}} is not found",
				INVALID_LOGIN: "Usuario y/o contraseña incorrectos.",
				REQUIRED_FIELD: "El campo es obligatorio",
				MIN_LENGTH_FIELD: "La longitud mínima es:",
				MAX_LENGTH_FIELD: "La longitud máxima es:",
				INVALID_FIELD: "El campo no es válido",
			},
			MESSAGE:{
				wrong_user_or_password:"Lo sentimos el usuario o contraseña son incorrectos, intente nuevamente"
			}
		},
		ECOMMERCE: {
			COMMON: {
				SELECTED_RECORDS_COUNT: "Selected records count: ",
				ALL: "All",
				SUSPENDED: "Suspended",
				ACTIVE: "Active",
				FILTER: "Filter",
				BY_STATUS: "by Status",
				BY_TYPE: "by Type",
				BUSINESS: "Business",
				INDIVIDUAL: "Individual",
				SEARCH: "Search",
				IN_ALL_FIELDS: "in all fields",
			},
			ECOMMERCE: "eCommerce",
			CUSTOMERS: {
				CUSTOMERS: "Customers",
				CUSTOMERS_LIST: "Customers list",
				NEW_CUSTOMER: "New Customer",
				DELETE_CUSTOMER_SIMPLE: {
					TITLE: "Customer Delete",
					DESCRIPTION: "Are you sure to permanently delete this customer?",
					WAIT_DESCRIPTION: "Customer is deleting...",
					MESSAGE: "Customer has been deleted",
				},
				DELETE_CUSTOMER_MULTY: {
					TITLE: "Customers Delete",
					DESCRIPTION: "Are you sure to permanently delete selected customers?",
					WAIT_DESCRIPTION: "Customers are deleting...",
					MESSAGE: "Selected customers have been deleted",
				},
				UPDATE_STATUS: {
					TITLE: "Status has been updated for selected customers",
					MESSAGE: "Selected customers status have successfully been updated",
				},
				EDIT: {
					UPDATE_MESSAGE: "Customer has been updated",
					ADD_MESSAGE: "Customer has been created",
				},
			},
		},

		QUESTION_DELETE: {
			ONE: "¿Está seguro de eliminar este registro?",
			MANY: "¿Está seguro de eliminar todos los registros seleccionados?",
		},
		QUESTION_UPDATE: {
			ONE: "¿Está seguro de actualizar este registro?",
			MANY: "¿Está seguro de actualizar todos los registros seleccionados?",
		},
		QUESTION_STATE: {
			ONE: "¿Está seguro de actualizar el estado de este registro?",
		},
		QUESTION_CONFIRM: "¿Está seguro de realizar esta acción?",
		QUESTION_FINALIZE: {
			ONE: "¿Está seguro de finalizar este registro?",
			MANY: "¿Está seguro de finalizar todos los registros seleccionados?",
		},
		QUESTION: {
			CONTINUE_NEW: "¿Desea continuar con un nuevo registro?",
			SAVE: "¿Esta seguro de guardar el registro?",
			CONFIRM: "¿Esta seguro de realizar esta acción?",
		},
		MESSAGE: {
			WAIT: "Espere un momento porfavor...",
		},
		MANOOBRA: {
			COMMON: {
				SELECTED_RECORDS_COUNT: "Registros seleccionados: ",
				ALL: "Todos",
				SEARCH: "Buscar",
			},
			MANOOBRA: "MANO OBRA",
			ACTIVIDAD: {
				ACTIVIDADES: "Actividades",
				ACTIVIDADES_LIST: "Lista de Actividades",
				NUEVA_ACTIVIDAD: "Nueva Actividad",
				ANULAR_ACTIVIDAD_SIMPLE: {
					TITULO: "Anular Actividad",
					DESCRIPCION: "Estas seguro de anular esta actividad?",
					DESCRIPCION_ESPERA: "Anulando Actividad...",
					MENSAJE: "La actividad ha sido anulada",
				},
				ANULAR_ACTIVIDAD_MULTI: {
					TITULO: "Anular Actividades",
					DESCRIPCION: "Estas seguro de anular las actividades seleccionadas?",
					DESCRIPCION_ESPERA: "Anulando Actividades...",
					MEMSAJE: "Las actividades seleccionadas fueron anuladas",
				},
				EDITAR: {
					MENSAJE_EDITAR: "La actividad ha sido actualizada",
				},
			},
			MAESTROS: {
				VEHICULOS: {
					TITLE: "Vechículos",
					LIST: "Listado de Vehículos",
					NEW: "Nuevo Vehículo",
				},
				CONDUCTORES: {
					TITLE: "Conductores",
					LIST: "Listado de Conductores",
					NEW: "Nuevo Conductor",
				},
				COMEDORES: {
					TITLE: "Comedores",
					LIST: "Listado de Comedores",
					NEW: "Nuevo Comedor",
				},
				ACOPIOS: {
					TITLE: "Acopios",
					LIST: "Listado de Acopios",
					NEW: "Nuevo Acopio",
				},
				GRUPOSCOSECHA: {
					TITLE: "Grupos de Cosecha",
					LIST: "Listado de Grupos de Cosecha",
					NEW: "NUEVO GRUPO",
				},
				GRUPOSLABORES: {
					TITLE: "Grupos de Labores",
					LIST: "Listado de Grupos de Labores",
					NEW: "NUEVO GRUPO",
				},
				TRABAJADOR: {
					HABILITAR: {
						TITLE: 'Cambiar Estado de Trabajador',
						MANY: 'ACTUALIZAR SELEC.'
					},
					CARGASCTR: {
						TITLE: 'Carga de SCTR',
						LIST: 'Listado de trabajadores sctr',
						NEW: 'NUEVO TRABAJADOR SCTR'
					},
				},
				RESTRICCIONCAPACITACION: {
					TITLE: "Maestro Restricciones por Capacitaciones",
					LIST: "Listado de Restricciones por Capacitaciones",
					LOAD: "Carga XLSX de Restricciones por Capacitaciones",
					NEW: "NUEVA RESTRICCIÓN",
				},
				SUPERVISOREMPLEADO: {
					TITLE: 'Asignación Supervisor-Empleado',
					LIST: 'Listado de Asignaciones por Supervisor',
					NEW: 'Nueva Asignación'
				},
				HORASPAGO: {
					TITLE: 'Configuración Horas Pago',
					LIST: 'Listado de Configuración Horas Pago',
					NEW: 'Nueva Configuración'
				},
				ACTIVIDADCECO: {
					TITLE: "Configuración CeCo/OE - Actividad",
					LIST: "Listado de Configuraciones CeCo/OE - Actividad",
					LOAD: "Carga XLSX de Configuraciones CeCo/OE - Actividad",
					NEW: "NUEVA CONFIGURACION",
				},
				ACTIVIDADESESPECIALES: {
					TITLE: "Actividades Especiales",
					LIST: "Listado de Actividades Especiales",
					NEW: "NUEVA ACTIVIDAD ESPECIAL",
				},
			},
			PROCESOS: {
				ASIGNACIONSUPERVISOR: {
					TITLE: "Asignacion de Supervisor",
					LIST: "Listado de Asignación Supervisor",
				},
				GESTIONPARADERO: {
					ACTUALIZAR: {
						TITLE: "Actualizar Solicitud Paradero",
						MESSAGE_ACEPT: "¿Está seguro de CONFIRMAR la solicitud de paradero?",
						MESSAGE_DENY: "¿Está seguro de RECHAZAR la solicitud de paradero?",
					},
				},
				GESTIONCOMEDOR: {
					ACTUALIZAR: {
						TITLE: "Actualizar Solicitud Comedor",
						MESSAGE_ACEPT: "¿Está seguro de CONFIRMAR la solicitud de comedor?",
						MESSAGE_DENY: "¿Está seguro de RECHAZAR la solicitud de comedor?",
					},
				},
			},
			PROYECCIONES: {
				FILTER: "Filtros de Proyección de Cosecha",
				LIST: "Listado de Proyección de Cosecha",
				SAVE: "Guardar",
				SEND: "Enviar",
				IMPORT: "Importar",
				EXPORT: "Exportar",
				APPROVE: "Aprobar",
				REFUSE: "Rechazar",
			},
		},
		COSECHA: {
			MAESTROS: {
				CULTIVOS: {
					TITLE: "Cultivos",
					LIST: "Listado de Cultivos",
					NEW: "Nuevo Cultivo",
				},
				VARIEDADES: {
					TITLE: "Variedades",
					LIST: "Listado de Variedades",
					NEW: "Nueva Variedad",
				},
				RANGO_CATEGORIA: {
					TITLE: "Rangos de Categoría",
					LIST: "Listado de Rangos de Categoria",
					NEW: "Nuevo",
					DELETE: "Eliminar",
				},
				CHARLA_DIARIA: {
					TITLE: "Temas de Charlas Diarias",
					FILTER: "Filtros de Temas de Charlas Diarias",
					FILTER_REPORT: "Filtros de Charlas Diarias",
					LIST: "Listado de Temas de Charlas Diarias",
					LIST_REPORT: "Listado de Charlas Diarias",
					SEARCH: "Buscar",
				},
				PALLETS: {
					TITLE: "Pallets",
					LIST: "Listado de Pallets",
					NEW: "Nuevo Pallet",
				},
				OBJETIVOVARIEDAD: {
					TITLE: 'Frecuencia Objetivo Variedad',
					LIST: 'Listado de Frecuencia Objetivo Variedad',
					NEW: 'Nueva Frecuencia Objetivo Variedad',
				},
				NOTIFICACIONUSUARIOFRUTA: {
					TITLE: 'Notificacion de Usuario|Fruta',
					LIST: 'Listado Configuración de Notificaciones de Usuario|Fruta'
				}
			},
			PROCESOS: {
				IMPRESIONSTICKER: {
					TITLE: "Impresión de sticker",
					LIST: "Listado de Impresión de sticker",
					NEW: "NUEVO REGISTRO",
				},
				IMPRESIONSTICKERBLOQUE: {
					TITLE: "Impresión de sticker en bloque",
					LIST: "Listado de Impresión de sticker en bloque",
					NEW: "NUEVO REGISTRO",
				},
				COSECHADIARIA: {
					SINCRONIZAR: {
						TITLE: "Sincronizar Grupo de Cosecha",
						MESSAGE: "¿Está seguro de sincronizar la información de grupo de cosecha seleccionado?",
					},
				},
				VIAJESCAMPO: {
					ACTUALIZAR: {
						TITLE: "Actualizar Viaje de Cosecha",
						MESSAGE_ACTIVE: "¿Está seguro de APERTURAR el viaje seleccionado?",
						MESSAGE_CLOSED: "¿Está seguro de CERRAR el viaje seleccionado?",
					},
				},
			},
			REPORTES: {
				NIVELES_KPI: {
					NIVEL_UNO_TITLE: 'Calidad Cosecha (KPI)',
					NIVEL_UNO_FILTER: 'Filtros de Calidad Cosecha (KPI)',
					NIVEL_UNO_LIST: 'Listado de Calidad Cosecha (KPI)',
					NIVEL_DOS_TITLE: 'KPI Nivel 2',
					NIVEL_DOS_FILTER: 'Filtros de KPI Nivel 2',
					NIVEL_DOS_LIST: 'Listado de KPI Nivel 2',
					NIVEL_TRES_TITLE: 'KPI Nivel 3',
					NIVEL_TRES_FILTER: 'Filtros de KPI Nivel 3',
					NIVEL_TRES_LIST: 'Listado de KPI Nivel 3',
					NIVEL_CUATRO_TITLE: 'KPI Nivel 4',
					NIVEL_CUATRO_FILTER: 'Filtros de KPI Nivel 4',
					NIVEL_CUATRO_LIST: 'Listado de KPI Nivel 4'
				}
			}
		},

		CONTROLTRUCK: {
			MAESTROS: {
				CAMIONES: {
					TITLE: "Camiones",
					LIST: "Listado de Camiones",
					TARIFAS: "Tarifas"
				},
				PROVEEDORES: {
					TITLE: "Proveedores",
					LIST: "Listado de Proveedores",
				},
				CONDUCTORES: {
					TITLE: "Conductores",
					LIST: "Listado de Conductores",
				},
				UBICACIONES: {
					TITLE: "Ubicaciones",
					LIST: "Listado de Ubicaciones",
				},
				UBIGEO: {
					TITLE: "Ubigeos",
					LIST: "Listado de Ubigeos",
				},
				AREA: {
					TITLE: "Áreas",
					LIST: "Listado de Áreas",
				},
				ACTIVIDAD: {
					TITLE: "Actividades",
					LIST: "Listado de Actividades",
				},
				DENOMINACION_CECO: {
					TITLE: "Denominación Centros de Costo",
					LIST: "Listado de Denominación Centros de Costo",
				},
				CENTRO_COSTO: {
					TITLE: "Centros de Costo",
					LIST: "Listado de Centros de Costo",
				},
				CONFIGURADOR_CECO: {
					TITLE: "Configurador de Centros de Costo",
					LIST: "Listado de Configuradores de Centros de Costo",
				},
				CORREOS: {
					TITLE: "Correos",
					LIST: "Listado de Correos",
				}
			},
			PROCESOS: {
				SOLICITUD_SERVICIO: {
					TITLE: "Solicitud de Servicios",
					LIST: "Listado de Solicitudes de Servicios",
					TITLE_NEW: "Nueva Solicitud",
					TITLE_EDIT: "Editar Solicitud",
					TITLE_VIEW: "Ver Solicitud",
					TITLE_PROG: "Programar Solicitud",
					TITLE_COPY: "Copiar Solicitud",
				},
				PROGRAMA_SERVICIO: {
					TITLE: "Programación de Servicios",
					LIST: "Listado de Programaciones de Servicios",
					TITLE_NEW: "Nueva Programación de Servicio",
					TITLE_EDIT: "Editar Programación de Servicio",
					TITLE_VIEW: "Ver Programación de Servicio",
					DETALLE: {
						LIST: "Listado de Programaciones",
						TITLE_EDIT: "Editar Programación",
						TITLE_NEW: "Nueva Programación"
					}
				},
				SERVICIO_DIARIO: {
					TITLE: "Servicios Diarios",
					LIST: "Listado de Programaciones de Servicios",
					TITLE_NEW: "Nueva Programación de Servicio",
					TITLE_EDIT: "Editar Programación de Servicio",
					TITLE_VIEW: "Ver Programación de Servicio"
				},
				SERVICIO_REALIZADO: {
					TITLE: "Servicios Realizados",
					LIST: "Listado de Servicios Realizados",
					TITLE_NEW: "Nuevo Servicios Realizado",
					TITLE_EDIT: "Editar Servicios Realizado",
					TITLE_VIEW: "Ver Servicios Realizado"
				},
				LIQUIDACION: {
					TITLE: "Liquidación de Camiones",
					LIST: "Listado de Liquidaciones de Camiones"
				}
			}
		},

		SEGURIDAD: {
			PERFIL: {
				TITLE: "Perfiles",
				LIST: "Listado de Perfiles",
				NEW: "Nuevo Perfil",
			},
			AGRUPADOR: {
				TITLE: "Pefil de Actividades",
				LIST: "Listado de Perfiles",
				NEW: "Nuevo Perfil de Actividades",
			},
			USUARIO: {
				TITLE: "Usuarios",
				LIST: "Listado de Usuarios",
				NEW: "Nuevo Usuario",
			},
		},
		BUTTONS: {
			ACCEPT: "ACEPTAR",
			SEARCH: "BUSCAR",
			DELETE: "ELIMINAR",
			CANCEL: "CANCELAR",
			SAVE: "GUARDAR",
			PRINT: "IMPRIMIR",
			EXPORT: "EXPORTAR",
			IMPORT: "IMPORTAR",
			BACK: "ATRÁS",
			UPLOAD: "SUBIR",
			DOWNLOAD: "DESCARGAR",
			NEW: "NUEVO",
			ADD: "AGREGAR",
			RESET_PWD: "RESETEAR",
			PROCESS: "PROCESAR",
			CHANGE_PWD: "CAMBIAR",
			GENERATE: "GENERAR",
			VALIDATE: "VALIDAR",
			SEND: "ENVIAR",
			FINALIZE: "FINALIZAR",
			FORMAT: "FORMATO",
			SYNC: "SINCRONIZAR",
			ANNUL: "ANULAR"
		},
	    GENERICFORM:{
			txtstage:"Etapa",        
			txtcode:"Codigo",
			txtname:"Nombre",
			txtdescription:"Descripcion",
			txtstatus:"Estado",    
			txtactive:"Activo",
			txtinactive:"Inactivo",
			txtdisabled:"Desabilitado",        
			txtdate:"Fecha",
			txtcurrency:"Moneda",
			txtupdate:"Actualizar",
			txtemail:"Correo Electronico",
			txtcellphone:"Nro Celular", 
			txtpassword:"Contraseña", 
			txtrepeatpassword:"Repetir Contraseña", 
			txtperson:"Persona",
			txtfullname:"Nombre Completo",
			txtproduct:"Producto",
			txtselect:"Secciona",
			txtselected:"Selecionado",
			txtdelete:"Elimina",
			txtsearch:"Buscar",
			txtupload:"Cargar",

			txtcountry:"Pais",
			txtcity:"Ciudad",
			txtaddress:"Direccion",
			txtrole:"Rol",	 

			txtstartdate:"Fecha Inicial",
			txtenddate:"Fecha Final",


			txt_h_fieldconfig_title:"Campos Configuracion",
			txtfieldconfig:"Campo Configuracion",


			txtusername:"Nombre Usuario",
			txttablemenuhead:"...",

			txt_tbl_menu_select:"Seleccionar",
			txt_tbl_menu_update:"Editar",
			txt_tbl_menu_delete:"Borrar",
			txt_tbl_menu_save:"Guardar",
		
			txt_h_asignpassword:"Asignar Contraseña",

			txtsearchcontrol:"Buscar Elemento",

			txttabletitlesearch:"Resultado de Busqueda",
			txttabletitledetail:"Detalle de Registro",
			txtdatarequired:"Se requiere que complete todos los campos requeridos",
			txtpasswordnoequal:"Validacion de Contraseña: Debe ingresar la misma contraseña en ambos campos.",
            txterrorrequest:"La solicitud ha sido rechazada, revisar session y volver a intentarlo nuevamente",
			txtuseralreadyexists:"El usuario ya existe, por favor cambie el nombre del usuario",
			txtusergroupuseralreadyexists:"El Usuario ya existe en este Grupo de Usuarios",
			txtrolegroupuseralreadyexists:"El Rol ya existe en este Grupo de Usuarios",
			txtcodealreadyexists:"El Codigo ya existe, por favor cambie el codigo del registro",
			txtrecordalreadyexists:"El Registro ya existe, por favor cambie los datos del registro",
			txtobjectcreated:"El Objecto ha sido registrado correctamente",
			txtobjectupdated:"El Objecto ha sido actualizado correctamente",
			txtobjectdeleted:"El Objecto ha sido eliminado correctamente",

			txttableTitle01:"Este es el titulo de la tabla",

			txtgroupuseritem:"Miembro de Grupo de Usuarios",
			txtgroupuserroleitem:"Rol de Grupo de Usuarios",
			txtgrantroleitem:"Permiso de Rol ",
			txtlegalname: "Razon Social",
			txttaxnumber: "Numero Impuesto",
			txtmodule:"Modulo",
			txtmenu:"Menu",

			txtcrop:"Cultivo",
			txtenterprise:"Empresa",
			txtlastperiod:"Ultimo Periodo",

	    }
	}
};

export class PageConfig {
	public defaults: any = {
		home: {
			page: { title: 'Inicio', desc: 'DEMOWEB' }
		},
		manoobra: {
			maestros:
			{
				actividades:{
					page:{title: 'Maestro de Actividades', desc: 'MANO DE OBRA'}
				},
				comedor:{
					page:{title: 'Maestro de Comedores', desc: 'MANO DE OBRA'}
				},
				grupocosecha:{
					page:{title: 'Maestro de Grupos de Cosecha', desc: 'MANO DE OBRA'},
				},
				grupolabores:{
					page:{title: 'Maestro de Grupos de Labores', desc: 'MANO DE OBRA'},
				},
				trabajadores:{
					restricciones: {
						page: { title: 'Gestión de restricciones', desc: 'MANO DE OBRA'}
					},
					'habilitar-inhabilitar': {
						page: { title: 'Habilitar/Inhabilitar trabajadores', desc: 'MANO DE OBRA'}
					},
					cargasctr: {
						page: { title: 'Carga de SCTR', desc: 'MANO DE OBRA'}
					},
				},
				'charla-diaria':{
					page:{title: 'Maestro de Temas de Charlas Diarias', desc: 'MANO DE OBRA'}
				},
				'restricciones-capacitaciones':{
					page:{title: 'Restricciones por Capacitaciones', desc: 'MANO DE OBRA'}
				},
				'supervisor-empleado':{
					page:{title: 'Asignacion Supervisor-Empleado', desc: 'MANO DE OBRA'}
				},
				'horaspago':{
					page:{title: 'Configuración Horas Pago', desc: 'MANO DE OBRA'}
				},
				'actividad-ceco':{
					page:{title: 'Configuración CeCo/OE - Actividad', desc: 'MANO DE OBRA'}
				},
				'actividad-especial':{
					page:{title: 'Actividades Especiales', desc: 'MANO DE OBRA'}
				}
			},
			procesos: {
				planilla:{
					page:{title: 'Control de Planillas', desc: 'MANO DE OBRA'}
				},
				packing:{
					page:{title: 'Control de Planillas Packing', desc: 'MANO DE OBRA'}
				},
				'configuracion-comedor':{
					page:{title: 'Configuración Diaria de Comedores', desc: 'MANO DE OBRA'}
				},
				'asignacion-supervisor':{
					page:{title: 'Asignacion de Supervisores', desc: 'MANO DE OBRA'}
				},
				'ausentismo':{
					page:{title: 'Gestion de Ausentismo en Cosecha', desc: 'MANO DE OBRA'}
				},
				'gestion-paraderos':{
					page:{title: 'Gestión Solicitud Paraderos', desc: 'MANO DE OBRA'}
				},
				'gestion-comedores':{
					page:{title: 'Gestión Solicitud Comedores', desc: 'MANO DE OBRA'}
				}
			},
			reportes:{
				campo: {
					'campo-dashboard':{
						page:{title: 'Avance Tareo Campo', desc: 'MANO DE OBRA'}
					},
					'rpt-asistencia':{
						page:{title: 'Campo: Reporte de Asistencia', desc: 'MANO DE OBRA'}
					},
					'rpt-validacion-tareo-ctrlbus':{
						page:{title: 'Campo: Reporte de Validación Tareo Movil vs. Control Bus', desc: 'MANO DE OBRA'}
					},
					'rpt-grupos-cosecha':{
						page:{title: 'Campo: Reporte de Grupos Cosecha', desc: 'MANO DE OBRA'}
					},
					'rpt-horas':{
						page:{title: 'Campo: Reporte de Horas', desc: 'MANO DE OBRA'}
					},
					'rpt-autoria-horaspago':{
						page:{title: 'Campo: Reporte de Auditoria HR.Pago', desc: 'MANO DE OBRA'}
					},
					'rpt-hsemanal':{
						page:{title: 'Campo: Reporte de Horas Semanal', desc: 'MANO DE OBRA'}
					},
					'rpt-incidentes':{
						page:{title: 'Campo: Reporte de Incidentes Diarios', desc: 'MANO DE OBRA'}
					},
					'rpt-auditoriaweb':{
						page:{title: 'Campo: Reporte de Auditoria Web', desc: 'MANO DE OBRA'}
					},
					'rpt-auditoriamovil':{
						page:{title: 'Campo: Reporte de Auditoria Movil', desc: 'MANO DE OBRA'}
					},
					'rpt-paraderos': {
						page:{title: 'Campo: Reporte de Paraderos', desc: 'MANO DE OBRA'}
					},
					'rpt-bono-calidad': {
						page:{title: 'Campo: Reporte de Bono de Calidad', desc: 'MANO DE OBRA'}
					},
					'rpt-dia-tarea': {
						page:{title: 'Campo: Reporte de Actividades por Tarea', desc: 'MANO DE OBRA'}
					},
					'rpt-charla-diaria': {
						page: {title: 'Campo: Reporte de Charlas Diarias', desc: 'MANO DE OBRA'}
					},
					'rpt-avancedepoda': {
						page: {title: 'Reporte Avance de poda', desc: 'MANO DE OBRA'}
					},
					'contrato-vencer': {
						page: {title: 'Reporte Contrato Vencer', desc: 'MANO DE OBRA'}
					},
					'seguimiento-cosecha': {
						page: {title: 'Reporte Seguimiento G.Cosecha', desc: 'MANO DE OBRA'}
					},
					'seguimiento-labores': {
						page: {title: 'Reporte Seguimiento G.Labores', desc: 'MANO DE OBRA'}
					},
					'rpt-bono-cooperador':{
						page:{title: 'Campo: Reporte de Bono Cooperador', desc: 'MANO DE OBRA'}
					},
				},
				packing: {
					'packing-dashboard':{
						page:{title: 'Avance Tareo Packing', desc: 'MANO DE OBRA'}
					},
					'rpt-asistencia-packing':{
						page:{title: 'Packing: Reporte de Asistencia', desc: 'MANO DE OBRA'}
					},
					'rpt-horas-packing':{
						page:{title: 'Packing: Reporte de Horas', desc: 'MANO DE OBRA'}
					},
					'rpt-hsemanal-packing':{
						page:{title: 'Packing: Reporte de Horas Semanal', desc: 'MANO DE OBRA'}
					},
					'rpt-incidentes':{
						page:{title: 'Packing: Reporte de Incidentes Diarios', desc: 'MANO DE OBRA'}
					},
					'rpt-auditoriawebpacking':{
						page:{title: 'Packing: Reporte de Auditoria Web', desc: 'MANO DE OBRA'}
					},
					'rpt-auditoriamovilpacking':{
						page:{title: 'Packing: Reporte de Auditoria Movil', desc: 'MANO DE OBRA'}
					},
					'rpt-comedor-packing':{
						page:{title: 'Packing: Reporte de Comedor', desc: 'MANO DE OBRA'}
					},
					'rpt-ultimo-dia-laborado':{
						page:{title: 'Packing: Reporte de Último Día Lab.', desc: 'MANO DE OBRA'}
					},
					'rpt-charla-diaria': {
						page: {title: 'Packing: Reporte de Charlas Diarias', desc: 'MANO DE OBRA'}
					}
				},
				comedor: {
					'rpt-tracking-almuerzos':{
						page:{title: 'Comedor: Seguimiento de Almuerzos', desc: 'MANO DE OBRA'}
					},
					'rpt-comedor-empleados':{
						page:{title: 'Comedor: Solicitud de Comedor Empleados', desc: 'MANO DE OBRA'}
					},
					'rpt-tracking-bandejas':{
						page:{title: 'Comedor: Seguimiento de Bandejas', desc: 'MANO DE OBRA'}
					},
					'rpt-incidencias-acopio':{
						page:{title: 'Comedor: Incidencias enAcopio', desc: 'MANO DE OBRA'}
					},
					'rpt-avance-reparto':{
						page:{title: 'Comedor: Avance de Repartos', desc: 'MANO DE OBRA'}
					},
					'rpt-almuerzos-emergencia':{
						page:{title: 'Comedor: Almuerzos de Emergencia', desc: 'MANO DE OBRA'}
					}
				}
			}
		},
		cosecha:{
			maestros:
			{
				vehiculo:{
					page:{title: 'Maestro de Vehículos', desc: 'COSECHA'}
				},
				conductor:{
					page:{title: 'Maestro de Conductores', desc: 'COSECHA'}
				},
				acopio:{
					page:{title: 'Maestro de Acopios CAE', desc: 'COSECHA'},
				},
				'rango-categoria-cosecha':{
					page:{title: 'Maestro de Rango de Categorías', desc: 'COSECHA'}
				},
				'pallet':{
					page:{title: 'Creación de Pallets', desc: 'COSECHA'}
				},
				'ciclo-lote':{
					page:{title: 'Configuración Ciclos Cosecha', desc: 'COSECHA'}
				},
				'objetivo-variedad':{
					page:{title: 'Frecuencia Objetivo Variedad', desc: 'COSECHA'}
				},
				'notificacionusuariofruta':{
					page:{title: 'Notificación de Usuario|Fruta', desc: 'COSECHA'}
				}
			},
			procesos: {
				produccion:
				{
					impresionsticker:{
						page: {title: 'Registro de Impresión', desc: 'COSECHA'}
					},
					'impresionsticker-reg':{
						page: {title: 'Registro de Impresión', desc: 'COSECHA'}
					},
					impresionstickerbloque:{
						page: {title: 'Registro de Impresión en Bloque', desc: 'COSECHA'}
					},
					impresionstickerbloque_reg:{
						page: {title: 'Registro de Impresión en Bloque', desc: 'COSECHA'}
					},
					'cosecha-diaria':{
						page: {title: 'Registro de Produccion Diaria', desc: 'COSECHA'}
					},
					'gestion-viajes':{
						page: {title: 'Gestión de Viajes en Campo', desc: 'COSECHA'}
					},
					'cierre-produccion':{
						page: { title: 'Cierre de Producción', desc: 'COSECHA'}
					}
				},
				cae:{
					'captura-peso':{
						page: { title: 'CAE: Captura de Peso (Pallets)', desc: 'CAE'}
					}
				}
			},
			reportes: {
				'dashboard-cosecha': {
					page: { title: 'Dashboard Cosecha', desc: 'REPORTES | COSECHA' }
				},
				'ranking-cosecha': {
					page: {title: 'Ranking de Cosecha', desc: 'COSECHA'}
				},
				'detalle-cosechador': {
					page: {title: 'Bandejas por Cosechador', desc: 'COSECHA'}
				},
				'cruce-cosecha-cae': {
					page: {title: 'Campo vs CAE', desc: 'COSECHA'}
				},
				'descarte-campo': {
					page: {title: 'Descarte Campo', desc: 'COSECHA'}
				},
				'incidencias-cosecha': {
					page: {title: 'Reporte de Incidencias', desc: 'COSECHA'}
				},
				'cae': {
					page: {title: 'Recepción Pallets', desc: 'CAE'}
				},
				'viajes-despacho': {
					page: {title: 'Cuadre Cosecha - CAE', desc: 'CAE'}
				},
				'ctrl-despacho-pallets': {
					page: {title: 'Despacho Pallets', desc: 'CAE'}
				},
				'kpi-nivel-uno': {
					page: {title: 'Calidad Cosecha (KPI)', desc: 'COSECHA'}
				},
				'gruposcosecha-frutasindespachar': {
					page: {title: 'Fruta sin Despachar', desc: 'COSECHA'}
				},
				'cierre-preliminar': {
					page: {title: 'Reporte Cierre de Lote Preliminar', desc: 'COSECHA'}
				},
				'cierre-lote': {
					page: {title: 'Reporte Cierre de Lote Cosecha', desc: 'COSECHA'}
				},
				'rpt-tarifa-vehiculos': {
					page: {title: 'Valorizacion Viajes Despacho', desc: 'COSECHA'}
				}
			}
		},

		smartdata: {
			control: {
				'mapping': {
					page: {
						title: "Consultas Georeferencial",
						desc: "CONTROL | SMARTDATA"
					}
				}
			},
		},

		controltruck: {
			maestros: {
				proveedores: {
					page: { title: 'Maestro de Proveedores', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				conductores: {
					page: { title: 'Maestro de Conductores', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				camiones: {
					page: { title: 'Maestro de Camiones', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				actividades: {
					page: { title: 'Maestro de Actividades', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				areas: {
					page: { title: 'Maestro de Áreas', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				ubigeos: {
					page: { title: 'Maestro de Ubigeos', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				"denominacion-ceco": {
					page: { title: 'Maestro de Denominaciones de Ceco', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				"centro-costo": {
					page: { title: 'Maestro de Centros de Costo', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				"configurador-ceco": {
					page: { title: 'Maestro de Configuradores de Ceco', desc: 'MAESTRO | CONTROL TRUCK' },
				},
				correos: {
					page: { title: 'Maestro de Correos', desc: 'MAESTRO | CONTROL TRUCK' },
				}
			},
			procesos: {
				"generar-solicitud": {
					page: { title: 'Generar Solicitud', desc: 'PROCESOS | CONTROL TRUCK' },
				},
				"programar-solicitud": {
					page: { title: 'Programar Solicitud', desc: 'PROCESOS | CONTROL TRUCK' },
				},
				"programar-servicio": {
					page: { title: 'Programar Servicio', desc: 'PROCESOS | CONTROL TRUCK' },
				},
				"servicio-diario": {
					page: { title: 'Servicios Diarios', desc: 'PROCESOS | CONTROL TRUCK' },
				},
				"servicio-realizado": {
					page: { title: 'Servicios Realizados', desc: 'PROCESOS | CONTROL TRUCK' },
				},
				generarliquidacion: {
					page: { title: 'Liquidación de Camiones', desc: 'PROCESOS | CONTROL TRUCK' },
				},
			},
			reportes: {
				"horas-conductor": {
					page: { title: 'Horas Conductor', desc: 'REPORTES | CONTROL TRUCK' },
				},
				"paradas": {
					page: { title: 'Paradas', desc: 'REPORTES | CONTROL TRUCK' },
				},
				"gps-camion": {
					page: { title: 'GPS', desc: 'REPORTES | CONTROL TRUCK' },
				},
				"velmax-recorrido": {
					page: { title: 'Vel. Max. y Recorrido', desc: 'REPORTES | CONTROL TRUCK' },
				},
				"seguimiento-online": {
					page: { title: 'Seguimiento Online', desc: 'REPORTES | CONTROL TRUCK' },
				}
			}
		},
		seguridad: {
			perfil:{
				page:{title: 'Perfiles de Usuario', desc: 'SEGURIDAD'}
			},
			'perfil-reg':{
				page:{title: 'Perfiles de Usuario', desc: 'SEGURIDAD'}
			},
			agrupadores: {
				page: { title: 'Perfil de Actividades', desc: 'SEGURIDAD' },
			},
			'agrupadores-reg': {
				page: { title: 'Perfil de Actividades', desc: 'SEGURIDAD' },
			},
			usuario:{
				page:{title: 'Administración de usuarios', desc: 'SEGURIDAD'}
			},
			'usuario-reg':{
				page:{title: 'Administración de usuarios', desc: 'SEGURIDAD'}
			},
			'tcampo-bitacora':{
				page:{title: 'Informe Bitácora Tareo Campo', desc: 'SEGURIDAD'}
			},
			'tpacking-bitacora':{
				page:{title: 'Informe Bitácora Tareo Packing', desc: 'SEGURIDAD'}
			}
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}

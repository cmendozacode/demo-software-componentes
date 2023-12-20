
import { environment } from '../../../environments/environment';


export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboard Dummy',
					root: true,
					alignment: 'left',
					permission: 'accessToDummy',
					page: '#',
				},
				{
					title: 'Dashboard Cosecha',
					root: true,
					alignment: 'left',
					permission: 'accessToCosechaModuleReportesDashboard',
					page: '/cosecha/reportes/dashboard-cosecha',
				},
				{
					title: 'Dashboard Campo',
					root: true,
					alignment: 'left',
					permission: 'accessToManoObraModuleReportTareoMovilDashboard',
					page: '/manoobra/reportes/campo/campo-dashboard'
				},
				{
					title: 'Dashboard Packing',
					root: true,
					alignment: 'left',
					permission: 'accessToManoObraModuleReportTareoPackingDashboard',
					page: '/manoobra/reportes/campo/packing-dashboard'
				},

				{
					title: 'Impresión Sticker',
					root: true,
					alignment: 'left',
					permission: 'accessToCosechaModuleTransacProdCampoImpresionSticker',
					page: '/cosecha/procesos/produccion/impresionsticker',
				},
				{
					title: 'Impresión Sticker Bloc.',
					root: true,
					alignment: 'left',
					permission: 'accessToCosechaModuleTransacProdCampoImpresionStickerBloque',
					page: '/cosecha/procesos/produccion/impresionstickerbloque',
				},
				{
					title: 'Cosecha Diaria',
					root: true,
					alignment: 'left',
					permission: 'accessToCosechaModuleTransacProdCampoRegistrosCosecha',
					page: '/cosecha/procesos/produccion/cosecha-diaria'
				},
				{
					title: 'Control Planillas',
					root: true,
					alignment: 'left',
					permission: 'accessToManoObraModuleTransacTareoCampoPlanillas',
					page: '/manoobra/procesos/planilla'
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'INICIO',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/home',
					translate: 'MENU.HOME',
					bullet: 'dot',
				},
				{
					title: 'MANO OBRA',
					root: true,
					bullet: 'dot',
					permission: 'accessToManoObraModule',
					icon: 'flaticon-rotate',
					submenu: [
						{
							title: 'Configuración',
							permission: 'accessToManoObraModuleConf',
							icon: 'flaticon2-grids',
							submenu: [
								{
									title: 'Grupo Cosecha',
									page: '/manoobra/maestros/grupocosecha',
									permission: 'accessToManoObraModuleConfGrupoCosecha'
								},
								{
									title: 'Grupo Labores',
									page: '/manoobra/maestros/grupolabores',
									permission: 'accessToManoObraModuleConfGrupoLabores'
								},
								{
									title: 'Trabajadores',
									bullet: 'dot',
									permission: 'accessToManoObraModuleConfTrabajadores',
									submenu:
									[
										{
											title: 'Gestión de restricciones',
											permission: 'accessToManoObraModuleConfTrabajadoresRestric',
											page: '/manoobra/maestros/trabajadores/restricciones'
										},
										{
											title: 'Habilitar/Inhabilitar',
											permission: 'accessToManoObraModuleConfHabilitarTrabajadores',
											page: '/manoobra/maestros/trabajadores/habilitar-inhabilitar'
										},
										{
											title: 'Carga SCTR',
											permission: 'accessToManoObraModuleCargaSctr',
											page: '/manoobra/maestros/trabajadores/cargasctr'
										}
									]
								},
								{
									title: 'Temas de Charlas Diarias',
									page: '/manoobra/maestros/charla-diaria',
									permission: 'accessToManoObraModuleConfCharlasDiarias'
								},
								{
									title: 'Restricciones por Capacitación',
									page: '/manoobra/maestros/restricciones-capacitaciones',
									permission: 'accessToManoObraModuleConfRestriccionesCapacitaciones'
								},

								{
									title: 'Config. Horas Pago',
									page: '/manoobra/maestros/horaspago',
									permission: 'accessToManoObraModuleConfHorasPago'
								},

								{
									title: 'Config. CeCo/OE - Actividad',
									page: '/manoobra/maestros/actividad-ceco',
									permission: 'accessToManoObraModuleConfActividadCECO'
								},

								// {
								// 	title: 'Actividades Especiales',
								// 	page: '/manoobra/maestros/actividad-especial',
								// 	permission: 'accessToManoObraModuleConfActividadesEspeciales'
								// }
							]
						},
						{
							title: 'Procesos',
							permission: 'accessToManoObraModuleTransac',
							icon: 'flaticon2-website',
							submenu: [
								{
									title: 'Tareo Campo',
									bullet: 'dot',
									permission: 'accessToManoObraModuleTransacTareoCampo',
									submenu:
									[
										{
											title: 'Control de Planillas',
											permission: 'accessToManoObraModuleTransacTareoCampoPlanillas',
											page: '/manoobra/procesos/planilla',
										},
										{
											title: 'Control de Ausentismo',
											permission: 'accessToManoObraModuleTransacTareoCampoAusentismo',
											page: '/manoobra/procesos/ausentismo',
										},
										{
											title: 'Solicitud Paraderos',
											permission: 'accessToManoObraModuleTransacTareoCampoSolicitudParaderos',
											page: '/manoobra/procesos/gestion-paraderos',
										}

									]
								},
								{
									title: 'Tareo Packing',
									bullet: 'dot',
									permission: 'accessToManoObraModuleTransacTareoPacking',
									submenu:
									[
										{
											title: 'Control de Planillas',
											permission: 'accessToManoObraModuleTransacTareoPackingPlanillas',
											page: '/manoobra/procesos/packing'
										}
									]
								}
							]
						},
						{
							title: 'Reportes',
							icon: 'flaticon2-line-chart',
							permission: 'accessToManoObraModuleReport',
							submenu: [
								{
									title: 'Tareo Campo',
									bullet: 'dot',
									permission: 'accessToManoObraModuleReportTareoMovil',
									submenu:
									[
										{
											title: 'Dashboard Tareo Campo',
											permission: 'accessToManoObraModuleReportTareoMovilDashboard',
											page: '/manoobra/reportes/campo/campo-dashboard'
										},
										{
											title: 'Reporte de Grupos Cosecha',
											permission: 'accessToManoObraModuleReportTareoMovilRptGrupos',
											page: '/manoobra/reportes/campo/rpt-grupos-cosecha'
										},
										{
											title: 'Reporte de Horas',
											permission: 'accessToManoObraModuleReportTareoMovilRptHoras',
											page: '/manoobra/reportes/campo/rpt-horas'
										},
										{
											title: 'Reporte Auditoría Hr.Pago',
											permission: 'accessToManoObraModuleReportTareoMovilRptAuditoriaHrPago',
											page: '/manoobra/reportes/campo/rpt-autoria-horaspago'
										},
										{
											title: 'Reporte de Asistencia',
											permission: 'accessToManoObraModuleReportTareoMovilRptAsitencia',
											page: '/manoobra/reportes/campo/rpt-asistencia'
										},
										{
											title: 'Reporte de Validación Tareo vs. CtrlBus',
											permission: 'accessToManoObraModuleReportValidacionTareoMovilControlBus',
											page: '/manoobra/reportes/campo/rpt-validacion-tareo-ctrlbus'
										},
										{
											title: 'Reporte de Horas Semanal',
											permission: 'accessToManoObraModuleReportTareoMovilRptHrSemanal',
											page: '/manoobra/reportes/campo/rpt-hsemanal'
										},
										{
											title: 'Reporte de Incidentes Diarios',
											permission: 'accessToManoObraModuleReportTareoMovilRptIncDiarios',
											page: '/manoobra/reportes/campo/rpt-incidentes'
										},
										{
											title: 'Reporte de Auditoria Web',
											permission: 'accessToManoObraModuleReportTareoMovilRptAuditoriaWeb',
											page: '/manoobra/reportes/campo/rpt-auditoriaweb'
										},
										{
											title: 'Reporte de Auditoria Movil',
											permission: 'accessToManoObraModuleReportTareoMovilRptAuditoriaMovil',
											page: '/manoobra/reportes/campo/rpt-auditoriamovil'
										},
										{
											title: 'Reporte de Paraderos',
											permission: 'accessToManoObraModuleReportTareoMovilRptParaderos',
											page: '/manoobra/reportes/campo/rpt-paraderos'
										},
										{
											title: 'Reporte de Bono de Calidad',
											permission: 'accessToManoObraModuleReportTareoMovilRptBonoCalidad',
											page: '/manoobra/reportes/campo/rpt-bono-calidad'
										},
										{
											title: 'Reporte de Actividades Tarea',
											permission: 'accessToManoObraModuleReportTareoMovilRptActividadDiaTarea',
											page: '/manoobra/reportes/campo/rpt-dia-tarea'
										},
										{
											title: 'Reporte Charlas Diarias',
											permission: 'accessToManoObraModuleReportTareoMovilRptCharlasDiarias',
											page: '/manoobra/reportes/campo/rpt-charla-diaria'
										},
										{
											title: 'Reporte Avance de Poda',
											permission: 'accessToManoObraModuleReportTareoMovilReporteAvancePoda',
											page: '/manoobra/reportes/campo/rpt-avancedepoda'
										},
										{
											title: 'Reporte Contrato Vencer',
											permission: 'accessToManoObraModuleReportTareoMovilReporteContratoVencer',
											page: '/manoobra/reportes/campo/contrato-vencer'
										},
										{
											title: 'Seguimiento Grupos Labores',
											permission: 'accessToManoObraModuleReportTareoMovilReporteSeguimientoGruposLab',
											page: '/manoobra/reportes/campo/seguimiento-labores'
										},
										{
											title: 'Reporte de Bono Cooperador',
											permission: 'accessToManoObraModuleReportTareoMovilRptBonoCooperador',
											page: '/manoobra/reportes/campo/rpt-bono-cooperador'
										},
									]
								},
								{
									title: 'Tareo Packing',
									permission: 'accessToManoObraModuleReportTareoPacking',
									bullet: 'dot',
									submenu:
									[
										{
											title: 'Dashboard Tareo Packing',
											permission: 'accessToManoObraModuleReportTareoPackingDashboard',
											page: '/manoobra/reportes/campo/packing-dashboard'
										},
										{
											title: 'Reporte de Horas',
											page: '/manoobra/reportes/packing/rpt-horas-packing',
											permission: 'accessToManoObraModuleReportTareoPackingRptHoras'
										},
										{
											title: 'Reporte Asistencia',
											page: '/manoobra/reportes/packing/rpt-asistencia-packing',
											permission: 'accessToManoObraModuleReportTareoPackingRptAsitencia'
										},
										{
											title: 'Reporte de Horas Semanal',
											page: '/manoobra/reportes/packing/rpt-hsemanal-packing',
											permission: 'accessToManoObraModuleReportTareoPackingRptHrSemanal'
										},
										{
											title: 'Reporte de Incidentes Diarios',
											permission: 'accessToManoObraModuleReportTareoPackingRptIncDiarios',
											page: '/manoobra/reportes/packing/rpt-incidentes'
										},
										{
											title: 'Reporte de Auditoria Web',
											permission: 'accessToManoObraModuleReportTareoPackingRptAuditoria',
											page: '/manoobra/reportes/packing/rpt-auditoriawebpacking'
										},
										{
											title: 'Reporte de Auditoria Movil',
											permission: 'accessToManoObraModuleReportTareoPackingRptAuditoria',
											page: '/manoobra/reportes/packing/rpt-auditoriamovilpacking'
										},
										{
											title: 'Reporte Ultimo Dia',
											page: '/manoobra/reportes/packing/rpt-ultimo-dia-laborado',
											permission: 'accessToManoObraModuleReportTareoPackingRptUltimoDia'
										},
										{
											title: 'Reporte Charlas Diarias',
											permission: 'accessToManoObraModuleReportTareoPackingRptCharlasDiarias',
											page: '/manoobra/reportes/packing/rpt-charla-diaria'
										}
									]
								}
							]
						}
					]
				},
				{
					title: 'COMEDOR',
					root: true,
					bullet: 'dot',
					permission: 'accessToComedorModule',
					icon: 'flaticon2-supermarket',
					submenu: [
						{
							title: 'Configuración',
							permission: 'accessToComedorModuleConf',
							icon: 'flaticon2-grids',
							submenu: [
								{
									title: 'Comedores',
									page: '/manoobra/maestros/comedor',
									permission: 'accessToManoObraModuleConfComedores'
								},
								{
									title: 'Asig. Supervisor-Empleado',
									page: '/manoobra/maestros/supervisor-empleado',
									permission: 'accessToManoObraModuleConfSupervisorEmpleado'
								}
							]
						},
						{
							title: 'Procesos',
							permission: 'accessToComedorModuleTransac',
							icon: 'flaticon2-website',
							submenu: [
								{
									title: 'Solicitud Comedores',
									permission: 'accessToManoObraModuleTransacTareoCampoSolicitudComedor',
									page: '/manoobra/procesos/gestion-comedores',
								},
								{
									title: 'Configuracion Diaria',
									permission: 'accessToManoObraModuleTransacComedorConfiguracionDia',
									page: '/manoobra/procesos/configuracion-comedor',
								}
							]
						},
						{
							title: 'Reportes',
							icon: 'flaticon2-line-chart',
							permission: 'accessToComedorModuleReport',
							submenu: [
								{
									title: 'Tareo Campo',
									bullet: 'dot',
									permission: 'accessToComedorModuleReportTareoCampo',
									submenu:[
										{
											title: 'Seguimiento de Almuerzos',
											permission: 'accessToManoObraModuleReportComedorRptTrackAlmuerzos',
											page: '/manoobra/reportes/comedor/rpt-tracking-almuerzos'
										},
										{
											title: 'Comedor Empleados',
											permission: 'accessToManoObraModuleReportComedorRptComedorEmpleados',
											page: '/manoobra/reportes/comedor/rpt-comedor-empleados'
										},
										{
											title: 'Seguimiento de bandejas',
											permission: 'accessToManoObraModuleReportComedorRptTrackBandejas',
											page: '/manoobra/reportes/comedor/rpt-tracking-bandejas'
										},
										{
											title: 'Incidencias en Acopio',
											permission: 'accessToManoObraModuleReportComedorRptIncidenciasAcopio',
											page: '/manoobra/reportes/comedor/rpt-incidencias-acopio'
										},
										{
											title: 'Avance de Repartos',
											permission: 'accessToManoObraModuleReportComedorRptAvanceRepartos',
											page: '/manoobra/reportes/comedor/rpt-avance-reparto'
										},
										{
											title: 'Almuerzos de Emergencia',
											permission: 'accessToManoObraModuleReportComedorRptAlmuerzoEmergencia',
											page: '/manoobra/reportes/comedor/rpt-almuerzos-emergencia'
										}
									]
								},
								{
									title: 'Tareo Packing',
									bullet: 'dot',
									permission: 'accessToComedorModuleReportTareoPacking',
									submenu:[
										{
											title: 'Reporte Comedor Packing',
											page: '/manoobra/reportes/packing/rpt-comedor-packing',
											permission: 'accessToManoObraModuleReportTareoPackingRptComedor'
										}
									]
								}
							]
						}
					]
				},
				{
					title: 'PRODUCCIÓN',
					root: true,
					bullet: 'dot',
					permission: 'accessToCosechaModule',
					icon: 'flaticon2-delivery-package',
					submenu: [
						{
							title: 'Configuración',
							permission: 'accessToCosechaModuleConf',
							icon: 'flaticon2-grids',
							submenu: [
								{
									title: 'Vehículos',
									page: '/cosecha/maestros/vehiculo',
									permission: 'accessToCosechaModuleConfVehiculos'
								},
								{
									title: 'Conductores',
									page: '/cosecha/maestros/conductor',
									permission: 'accessToCosechaModuleConfConductores'
								},
								{
									title: 'Rangos de Categorías',
									page: '/cosecha/maestros/rango-categoria-cosecha',
									permission: 'accessToCosechaModuleConfRangoCategoria'
								},
								{
									title: 'Ciclos de Cosecha',
									page: '/cosecha/maestros/ciclo-lote',
									permission: 'accessToCosechaModuleConfCicloLote'
								},
								{
									title: 'Frec. Objetivo Variedad',
									page: '/cosecha/maestros/objetivo-variedad',
									permission: 'accessToCosechaModuleConfObjetivoVariedad'
								},
								{
									title: 'Notificación usuario/fruta',
									page: '/cosecha/maestros/notificacion-usuario-fruta',
									permission: 'accessToCosechaModuleConfNotificacionUsuarioFruta'
								},
							]
						},
						{
							title: 'Procesos',
							permission: 'accessToCosechaModuleTransac',
							icon: 'flaticon2-website',
							submenu: [
								{
									title: 'Producción Campo',
									bullet: 'dot',
									permission: 'accessToCosechaModuleTransacProdCampo',
									submenu:
									[
										{
											title: 'Impresion de Stickers',
											permission: 'accessToCosechaModuleTransacProdCampoImpresionSticker',
											page: '/cosecha/procesos/produccion/impresionsticker',
										},
										{
											title: 'Impresión Sticker Bloque',
											permission: 'accessToCosechaModuleTransacProdCampoImpresionStickerBloque',
											page: '/cosecha/procesos/produccion/impresionstickerbloque',
										},
										{
											title: 'Cosecha Diaria',
											permission: 'accessToCosechaModuleTransacProdCampoRegistrosCosecha',
											page: '/cosecha/procesos/produccion/cosecha-diaria'
										},
										{
											title: 'Viajes Cosecha',
											permission: 'accessToCosechaModuleTransacProdCampoViajesCampo',
											page: '/cosecha/procesos/produccion/gestion-viajes'
										},
										{
											title: 'Cierre Producción',
											permission: 'accessToCosechaModuleTransacProdCampoCierreProduccion',
											page: '/cosecha/procesos/produccion/cierre-produccion'
										},
										{
											title: 'Asignacion Supervisores',
											permission: 'accessToManoObraModuleTransacTareoCampoAsignacionSuper',
											page: '/manoobra/procesos/asignacion-supervisor',
										}
									]
								},
								{
									title: 	'Producción CAE',
									button: 'dot',
									permission: 'accessToCosechaModuleTransacProdCAE',
									submenu:
									[
										{
											title: 'Pesado de Pallets',
											permission: 'accessToCosechaModuleTransacProdCAEPesadoPallets',
											page: '/cosecha/procesos/produccion/captura-peso'
										},
									]
								}
							]
						},
						{
							title: 'Reportes',
							permission: 'accessToCosechaModuleReportes',
							icon: 'flaticon2-line-chart',
							submenu: [
								{
									title: 'Dashboard Cosecha',
									permission: 'accessToCosechaModuleReportesDashboard',
									page: '/cosecha/reportes/dashboard-cosecha'
								},
								{
									title: 'Seguimiento Grupos de Cosecha',
									permission: 'accessToManoObraModuleReportTareoMovilReporteAsignacionGrupos',
									page: '/manoobra/reportes/campo/seguimiento-cosecha'
								},
								{
									title: 'Bandejas x Cosechador',
									permission: 'accessToCosechaModuleReportesDetalleTrabajador',
									page: '/cosecha/reportes/detalle-cosechador'
								},
								{
									title: 'Campo vs CAE',
									permission: 'accessToCosechaModuleReportesCruceCosechaCae',
									page: '/cosecha/reportes/cruce-cosecha-cae'
								},
								{
									title: 'Descarte Campo',
									permission: 'accessToCosechaModuleReportesDescarteCampo',
									page: '/cosecha/reportes/descarte-campo'
								},
								{
									title: 'Incidencias en Cosecha',
									permission: 'accessToCosechaModuleReportesIncidenciasCosecha',
									page: '/cosecha/reportes/incidencias-cosecha',
								},
								{
									title: 'Ranking de Cosecha',
									permission: 'accessToCosechaModuleReportesRankingCosecha',
									page: '/cosecha/reportes/ranking-cosecha'
								},
								{
									title: 'Calidad Cosecha (KPI)',
									permission: 'accessToCosechaModuleReportesNivelesKPI',
									page: '/cosecha/reportes/kpi-nivel-uno'
								},
								{
									title: 'Fruta sin despachar',
									permission: 'accessToCosechaModuleReportesGruposCosechaConFrutaSinDespachar',
									page: '/cosecha/reportes/gruposcosecha-frutasindespachar'
								},
								{
									title: 'Cierre Lotes Preliminar',
									permission: 'accessToCosechaModuleReportesCierreLotesPreliminar',
									page: '/cosecha/reportes/cierre-preliminar'
								},
								{
									title: 'Cierre Lotes Cosecha',
									permission: 'accessToCosechaModuleReportesCierreLotes',
									page: '/cosecha/reportes/cierre-lote'
								}
							]
						}
					]
				},
				{
					title: 'CAE',
					root: true,
					bullet: 'dot',
					permission: 'accessToCAEModule',
					icon: 'flaticon2-box',
					submenu: [
						{
							title: 'Configuración',
							permission: 'accessToCAEModuleConfiguracion',
							icon: 'flaticon2-grids',
							submenu: [
								{
									title: 'Acopios',
									page: '/cosecha/maestros/acopio',
									permission: 'accessToCAEModuleConfAcopios'
								},
							]
						},
						{
							title: 'Procesos',
							permission: 'accessToCAEModuleTransacciones',
							icon: 'flaticon2-website',
							submenu: [
								{
									title: 'Creación Pallets',
									page: '/cosecha/maestros/pallet',
									permission: 'accessToCAEModuleTransaccionesPallets'
								},
								{
									title: 	'Pesado de Pallets',
									button: 'dot',
									permission: 'accessToCAEModuleTransaccionesPesadoPallets',
									page: '/cosecha/procesos/cae/captura-peso'
								},
								{
									title: 'Actualización Viajes',
									button: 'dot',
									permission: 'accessToCAEModuleTransaccionesViajesVehiculos',
									page: '/cosecha/procesos/cae/viajes-vehiculos'
								}
							]
						},
						{
							title: 'Reportes',
							permission: 'accessToCAEModuleReportes',
							icon: 'flaticon2-line-chart',
							submenu: [
								{
									title: 'Recepción Pallets',
									permission: 'accessToCAEModuleReportesTrazabilidadPallets',
									page: '/cosecha/reportes/cae'
								},
								{
									title: 'Despacho Pallets',
									permission: 'accessToCosechaModuleReportesCtrlDespachoPallets',
									page: '/cosecha/reportes/ctrl-despacho-pallets'
								},
								{
									title: 'Cuadre Cosecha - CAE',
									permission: 'accessToCAEModuleReportesViajesDespacho',
									page: '/cosecha/reportes/viajes-despacho'
								},
								{
									title: 'Valorización Viajes Despacho',
									permission: 'accessToCosechaModuleReportesTarifaVehiculos',
									page: '/cosecha/reportes/rpt-tarifa-vehiculos'
								},
							]
						}
					]
				},
				{
					title: 'PROYECCIÓN',
					root: true,
					bullet: 'dot',
					permission: 'accessToProyeccionModule',
					icon: 'flaticon2-chart',
					submenu: [
						{
							title: 'Procesos',
							permission: 'accessToProyeccionModuleProcesos',
							icon: 'flaticon2-analytics',
							submenu: [
								{
									title: 'Superficie Semanal (Ha/día)',
									permission: 'accessToProyeccionModuleProcesosProgSemRecorrido',
									page: '/proyeccion/procesos/programasemanalrecorrido'
								},
								{
									title: 'Superficie Diaria (Ha/día)',
									permission: 'accessToProyeccionModuleProcesosProgRecorridoDiario',
									page: '/proyeccion/procesos/programarecorridodiario'
								},
								{
									title: 'Oferta Fruta (Kg/Ha)',
									permission: 'accessToProyeccionModuleProcesosProgSemCosecha',
									page: '/proyeccion/procesos/programasemanalcosecha'
								},
								{
									title: 'Distribución Formatos (Kg)',
									permission: 'accessToProyeccionModuleProcesosDistribucionKilosFormato',
									page: '/proyeccion/procesos/distribucionkilosformato'
								},
								{
									title: 'Asignación Grupos x Ciclos',
									permission: 'accessToProyeccionModuleProcesosProgramacionGruposCiclo',
									page: '/proyeccion/procesos/programaciongruposciclo'
								},
								{
									title: 'Cierre de Programa',
									permission: 'accessToProyeccionModuleProcesosProgramacionCosechaCierreZona',
									page: '/proyeccion/procesos/programacioncosechacierre'
								},
								{
									title: 'Disponibilización de cosecha',
									permission: 'accessToProyeccionModuleProcesosProgramacionCosechaDisponibilizacion',
									page: '/proyeccion/procesos/disponibilizacioncosecha'
								},
							]
						},
						{
							title: 'Reportes',
							permission: 'accessToProyeccionModuleReportes',
							icon: 'flaticon2-line-chart',
							submenu: [
								{
									title: 'Cumplimiento Cosecha',
									permission: 'accessToProyeccionModuleReportesRecorridoDiario',
									page: '/proyeccion/reportes/rptrecorridodiario'
								},
								{
									title: 'Programa de Cosecha',
									permission: 'accessToProyeccionModuleReportesProgramaCosecha',
									page: '/proyeccion/reportes/rptprogramacosecha'
								},
								{
									title: 'Mapa proyectado vs. real',
									permission: 'accessToProyeccionModuleReportesProyVsReal',
									page: '/proyeccion/reportes/rptmapaproyvsreal'
								}
							]
						}
					]
				},
				{
					title: 'SMART DATA',
					root: true,
					bullet: 'dot',
					permission: 'accessToSmartDataModule',
					icon: 'flaticon2-favourite',
					submenu: [
						{
							title: 'Control',
							permission: 'accessToSmartDataModuleControl',
							icon: 'flaticon2-map',
							submenu: [
								{
									title: 	'Mapas',
									button: 'dot',
									permission: 'accessToSmartDataModuleControlMapping',
									page: '/smartdata/control/mapping'
								}
							]
						}
					]
				},
				{
					title: 'AGRILYTICS',
					root: true,
					bullet: 'dot',
					permission: 'accessToAgrilyticsModule',
					icon: 'flaticon2-graph-1',
					submenu: [
						{
							title: 'Reportes',
							permission: 'accessToAgrilyticsModuleReportes',
							icon: 'flaticon2-analytics-1',
							submenu: [
								{
									title: 	'Modulos',
									button: 'dot',
									permission: 'accessToAgrilyticsModuleReportesModulos',
									page: '/agrilytics/reportes/modulos'
								}
							]
						}
					]
				}
				,
				{
					title: 'SEGURIDAD Y ACCESOS',
					root: true,
					bullet: 'dot',
					permission: 'accessToSeguridadModule',
					icon: 'flaticon2-shield',
					submenu: [
						{
							title: 'Configuración',
							permission: 'accessToSeguridadModuleConfiguracion',
							icon: 'flaticon-security',
							submenu: [
								{
									title: 'Perfil de Usuarios',
									page: '/seguridad/perfil',
									permission: 'accessToSeguridadModuleConfPerfiles'
								},
								{
									title: 'Perfil de Actividades',
									page: '/seguridad/agrupadores',
									permission: 'accessToSeguridadModuleConfAgrupadores',
								  },
								{
									title: 'Usuarios',
									page: '/seguridad/usuario',
									permission: 'accessToSeguridadModuleConfUsuarios'
								}
							]
						},
						{
							title: 'Reportes',
							permission: 'accessToSeguridadModuleReportes',
							icon: 'flaticon2-analytics-1',
							submenu: [
								{
									title: 'Bitácora C.Horas Campo',
									permission: 'accessToSeguridadModuleReportesBitacoraCampo',
									page: '/seguridad/tcampo-bitacora'
								},
								{
									title: 'Bitácora C.Horas Packing',
									permission: 'accessToSeguridadModuleReportesBitacoraPacking',
									page: '/seguridad/tpacking-bitacora'
								}
							]
						}
					]
				}

			]
		},
	};

	public get configs(): any {

		//Load Session Variable of Software Menu
		var objBaseMenu_txt = localStorage.getItem("sd_software_sd_menu");
		var objBaseMenu_obj = [];
		var objHeadMenu_obj = [];

		if( objBaseMenu_txt != null && objBaseMenu_txt != undefined && objBaseMenu_txt !='undefined'){

		   var objBaseMenu_temp = JSON.parse(objBaseMenu_txt);

		   var lsize = Object.keys(objBaseMenu_temp).length;

           var objSideMenu = [];
		   var objHeadMenu = [];

		   for(var i=0; i<lsize; i++)
		   {
			   // Search Side Menu 
			   if(environment.sideMenuModule == objBaseMenu_temp[i]['code'])
			   { objSideMenu = objBaseMenu_temp[i]['software_menu']['software_menu_items'];  }

			   // Search Header Menu 
			   if(environment.headMenuModule == objBaseMenu_temp[i]['code'])
			   { objHeadMenu = objBaseMenu_temp[i]['software_menu']['software_menu_items'];  }			   

		   }

		   var lsizeSide = Object.keys(objSideMenu).length;
		   var lsizeHead = Object.keys(objHeadMenu).length;

		   objBaseMenu_obj = this.fn_get_format_menu(objSideMenu, lsizeSide, 0, 0, [],'side');
		   objHeadMenu_obj = this.fn_get_format_menu(objHeadMenu, lsizeHead, 0, 0, [],'header');

		}	

		  this.defaults['header']['items'] =objHeadMenu_obj;
          this.defaults['aside']['items'] =objBaseMenu_obj;
 
        console.log("Menu final :::::::::::");
		console.log(this.defaults);

		return this.defaults;
	}


    fn_get_format_menu(obj_items, lsize, idx, level_menu, obj_items_result,type_menu):any{


       if(lsize>idx)	   
	   {
		   var curItemMenu = obj_items[idx];
		   var itemMenu ={};


		   if(curItemMenu['label_system'] != null && curItemMenu['label_system'] != undefined){ itemMenu['title'] = curItemMenu['label_system']; }
		  
		   if (level_menu == 0 && type_menu=='side')
		   {   
			  itemMenu['root'] = true; 
			  itemMenu['bullet'] = 'dot'; 
		   }

		   if (level_menu == 0 && type_menu=='header')
		   {   
			  itemMenu['root'] = true; 
			  itemMenu['alignment'] = 'left'; 
			  itemMenu['permission'] = 'accessToGenericDummy'; 	 
		   }

		   if(curItemMenu['attribute1'] != null && curItemMenu['attribute1'] != undefined){ itemMenu['icon'] = curItemMenu['attribute1']; }
		   if(curItemMenu['attribute2'] != null && curItemMenu['attribute2'] != undefined){ itemMenu['translate'] = curItemMenu['attribute2']; }

		   if( curItemMenu['software_function'] != null  && curItemMenu['software_function'] != undefined)
		   { itemMenu['page'] = curItemMenu['software_function']['attribute2']; }
		   //Functions o paginas


		   //Sub Menus
            if(curItemMenu['software_sub_menu'] != null  && curItemMenu['software_sub_menu'] != undefined )
			{   var lsizesub = Object.keys(curItemMenu['software_sub_menu']).length;
				itemMenu['submenu'] = this.fn_get_format_menu(curItemMenu['software_sub_menu'], lsizesub, 0, level_menu+1, [],type_menu)
			}
		  
		   obj_items_result.push(itemMenu);


		   return this.fn_get_format_menu(obj_items, lsize, idx+1, level_menu, obj_items_result,type_menu);

	   }
	   else
	   { return obj_items_result; }


	}

}

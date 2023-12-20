export const TYPE_ALERT = {
    WARNING: "warningYapu",
    DANGER: "dangerYapu"
}

export const TYPE_DELETE_ACTION = {
    DETALLE_PLANILLA: "detalle_planilla",
    PLANILLA: "planilla",
    ANY_ACTION: ""
}

export const MESSAGE_ALERT_VALIDATIONS = "Corrige algunas de las validaciones del formulario."

export const GRAFICO_COLUMN = {
    chart: { type: 'column', backgroundColor: null, style: { fontFamily: 'Poppins, Helvetica, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    tooltip: { shared: true, pointFormat: {} },
    colors: [
      '#058DC7',
      '#20c997',
      '#fd7e14',
      '#ffc107'
    ],
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    // tooltip: {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true
    // },
    // plotOptions: {
    //     column: {
    //         pointPadding: 0.2,
    //         borderWidth: 0
    //     }
    // },
    plotOptions: {
        column: {
            //stacking: "normal",
            // pointPadding: 0.2,
        },
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:,.1f}',
            }
        }
    },
    legend: {enabled: true},
	lang: { 
        noData: 'No hay información disponible.',
        // thousandsSep: ',',
        // decimalPoint: '.',
    },
    series: []
}

export const GRAFICO_XY = {
    chart: { zoomType: 'xy' },
    title: { text: 'Reporte de Viajes' },
    subtitle: { text: '' },
    xAxis: [],
    yAxis: [],
    tooltip: { shared: false },
    series: []
};

export const GRAFICO_PIE = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
		backgroundColor: null,
		style: { fontFamily: 'Poppins, Helvetica, sans-serif' }
    },
    title: {
        text: ''
    },
	subtitle: {
		text: ''
	},
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
	lang: { noData: 'No hay información disponible.' },
    series: []
};
export const GEOJSON_BASE_PROYECCION = {
    type: "FeatureCollection",
    name: "s0_lote_proyeccion",
    crs: {
        type: "name",
        properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    features: []
}

export const COLORES_LOTES = {
    Mon: "#8E27E4",
    Tue: "#006ED8",
    Wed: "#03E7D0",
    Thu: "#F70BCF",//#06E054",
    Fri: "#E3E135",
    Sat: "#FF8F00",
    Sun: "#F00407"
}

export const NOMBRE_DIA_SEMANA = {
    Mon: "Lunes",
    Tue: "Martes",
    Wed: "Miercoles",
    Thu: "Jueves",
    Fri: "Viernes",
    Sat: "Sabado",
    Sun: "Domingo"
}

export const DIAS_SEMANA = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const NAME_FILE_GEOJSON = 's0_lote_proyeccion';


import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import * as logoFile from '../../../../assets/media/client-logos/hf.js';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

	constructor() {}

	private obtenerNombreColumna(numCol: number): string {
		const columnas: string[] = [
			"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
			"AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
			"BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ"
		];
		return columnas[numCol - 1];
	}

	async exportToExcelDefaultGroups(
		title: string,
		sheet: string,
		headers: string[][],
		data: string[][],
		sizesColums: number[],
		sizesHeader: number[],
		nameFile: string
	) {
		const excelJS = window["ExcelJS"];
		if (!excelJS) {
			console.log("ExcelJS no cargado!");
		} else {
			const workbook = new excelJS.Workbook();
			const worksheet = workbook.addWorksheet(sheet, {views: [{showGridLines: false, zoomScale: 70}]});
			let initalCol: number = 2;
			let initialRow: number = 1

			worksheet.mergeCells(this.obtenerNombreColumna(initalCol) + "" + initialRow + ":" + this.obtenerNombreColumna(initalCol + headers[0].length - 1) + "" + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initalCol) + "" + initialRow).value = title;
			worksheet.getCell(this.obtenerNombreColumna(initalCol) + "" + initialRow).font = { name: 'Calibri', family: 4, size: 24, bold: true, color: {argb: 'FF191970'} };
			worksheet.getCell(this.obtenerNombreColumna(initalCol) + "" + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };

			initialRow = initialRow + 2;

			for (let n: number = 0; n < headers.length; n++) {
				for (let i: number = 0, c = initalCol; i < headers[n].length; i++, c++) {
					let x: number = 0;
					let valor: string = headers[n][i];
					let diferente: boolean = false;
					while (i < headers[n].length && !diferente) {
						if (valor == headers[n][i]) {
							x++;
							i++;
						} else {
							i--;
							diferente = true;
						}
					}

					worksheet.mergeCells(this.obtenerNombreColumna(c) + "" + initialRow + ":" + this.obtenerNombreColumna(c + x - 1) + "" + initialRow);
					worksheet.getCell(this.obtenerNombreColumna(c) + "" + initialRow).value = valor;
					worksheet.getCell(this.obtenerNombreColumna(c) + "" + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
					worksheet.getCell(this.obtenerNombreColumna(c) + "" + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'FF2E8B57'} };
					worksheet.getCell(this.obtenerNombreColumna(c) + "" + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
					worksheet.getCell(this.obtenerNombreColumna(c) + "" + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};

					c = c + x - 1;
				}

				initialRow = initialRow + 1;
			}

			for (let i: number = 0; i < data.length; i++) {
				for (let j: number = 0; j < headers[0].length; j++) {
					worksheet.getCell(this.obtenerNombreColumna(initalCol + j) + "" + (initialRow + i)).value = data[i][j];
					worksheet.getCell(this.obtenerNombreColumna(initalCol + j) + "" + (initialRow + i)).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
					worksheet.getCell(this.obtenerNombreColumna(initalCol + j) + "" + (initialRow + i)).alignment = { vertical: 'middle', horizontal: 'center' };
					worksheet.getCell(this.obtenerNombreColumna(initalCol + j) + "" + (initialRow + i)).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
				}
			}

			for (let index: number = 0; index < sizesColums.length; index++) {
				worksheet.getColumn(index + 2).width = sizesColums[index];
			}

			for (let index: number = 0; index < sizesHeader.length; index++) {
				worksheet.getRow(index + 3).height = sizesHeader[index];
				worksheet.getRow(index + 3).customHeight = true;
			}

			await workbook.xlsx.writeBuffer().then((data: any) => {
				fs.saveAs(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), nameFile);
			});
		}
	}

	async exportToExcelGenerico(title:string, sheet:string, header:any[], data:any[][], columnsSize:number[], fileName:string, flagNumeroVacio?:boolean, columnsGroup?:any[]) {
		const excelJS = window["ExcelJS"]
		if(!excelJS) {
			console.log("ExcelJS no cargado!!!")
		}else{
			const workbook = new excelJS.Workbook()
			const worksheet = workbook.addWorksheet(sheet, {views: [{showGridLines: false, zoomScale: 80}]})
			let initialCol:number = 2
			let initialRow:number = 1

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow)
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = title
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 24, bold: true, color: {argb: 'FF191970'} }
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' }

			initialRow = initialRow + 2
			let c = initialCol

			if (columnsGroup !== undefined && columnsGroup.length > 0) {
				for(const hg of columnsGroup){
					worksheet.mergeCells(this.obtenerNombreColumna(c).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(c + hg.colspan - 1).toString() + initialRow)
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = hg.label
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'92BC37'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c = c + hg.colspan
				}
				worksheet.getRow(initialRow).height = 25;
				initialRow++
			}
			c = initialCol
			for(const h of header){
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = h.label
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'005075'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
					top: { style: 'thin', color: {argb:'FF000000'} },
					left: { style: 'thin', color: {argb:'FF000000'} },
					bottom: { style: 'thin', color: {argb:'FF000000'} },
					right: { style: 'thin', color: {argb:'FF000000'} }
				};
				c++
			}

			initialRow++

			for(const d of data){
				c = initialCol
				for(const h of header){
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = flagNumeroVacio ? (d[h.name]=="-1" ? "" : d[h.name]) : d[h.name];
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c++
				}
				initialRow++
			}

			c = initialCol
			for(const cs of columnsSize){
				worksheet.getColumn(c).width = cs;
				c++
			}

			await workbook.xlsx.writeBuffer().then((data: any) => {
				fs.saveAs(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
			});
		}
	}

	async exportToExcelFormato(sheet:string, header:any[], data:any[][], columnsSize:number[], fileName:string) {
		const excelJS = window["ExcelJS"]
		if(!excelJS) {
			console.log("ExcelJS no cargado!!!")
		}else{
			const workbook = new excelJS.Workbook()
			const worksheet = workbook.addWorksheet(sheet, {views: [{showGridLines: false, zoomScale: 80}]})
			let initialCol:number = 1
			let initialRow:number = 1
			let c = initialCol
			for(const h of header){
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = h.label
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'005075'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
					top: { style: 'thin', color: {argb:'FF000000'} },
					left: { style: 'thin', color: {argb:'FF000000'} },
					bottom: { style: 'thin', color: {argb:'FF000000'} },
					right: { style: 'thin', color: {argb:'FF000000'} }
				};
				c++
			}

			initialRow++

			for(const d of data){
				c = initialCol
				for(const h of header){
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = ((d[h.name]=="-1" || d[h.name]=="0")?"":d[h.name])
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c++
				}
				initialRow++
			}

			c = initialCol
			for(const cs of columnsSize){
				worksheet.getColumn(c).width = cs;
				c++
			}

			await workbook.xlsx.writeBuffer().then((dataBlob: any) => {
				fs.saveAs(new Blob([dataBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
			});
		}
	}

	async exportLiquidacionServicioTransportePersonal(registro: any, sheet: string, header: any[], data: any[][], columnsSize: number[], fileName: string) {
		const excelJS = window["ExcelJS"];
		if (!excelJS) {
			console.log("ExcelJS no cargado!!!");
		} else {
			const workbook = new excelJS.Workbook();
			const worksheet = workbook.addWorksheet(sheet, { views: [{ showGridLines: false, zoomScale: 80 }]});
			let logo = workbook.addImage({base64: logoFile.logoBase64, extension: 'png' });
			worksheet.addImage(logo, 'A1:A2');
			let initialCol: number = 2;
			let initialRow: number = 1;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "LIQUIDACIÓN DE SERVICIOS DE TRANSPORTE DE PERSONAL";
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 24, bold: true, color: {argb: 'FF191970'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = registro.fechaDesde + " al " + registro.fechaHasta;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 18, bold: false, color: {argb: 'FF191970'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
			initialRow = initialRow + 2;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Num. Liquidación: " + registro.correlativo;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Empresa: " + registro.empresa;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Proveedor: " + registro.proveedor;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Num. Factura: " + ((registro.factura === undefined || registro.factura === "" || registro === null) ? "_________________________" : registro.factura);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow = initialRow + 2;

			let c: number = initialCol;
			for (const h of header) {
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = h.label;
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'005075'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
					top: { style: 'thin', color: {argb:'FF000000'} },
					left: { style: 'thin', color: {argb:'FF000000'} },
					bottom: { style: 'thin', color: {argb:'FF000000'} },
					right: { style: 'thin', color: {argb:'FF000000'} }
				};
				c++;
			}

			initialRow++;
			let totalViajes: number = 0;
			let totalImporte: number = 0.0;
			for (const d of data) {
				c = initialCol;
				let viajesAcumulado: number = 0;
				let importeAcumulado: number = 0.0;
				let colNroViajes = 0;
				for (const h of header) {
					if (h.name === "nroViajes") {
						colNroViajes = c;
					}
					if (c >= 9) {
						viajesAcumulado += (isNaN(parseInt(d[h.name])) ? 0 : parseInt(d[h.name]));
					}
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = d[h.name];
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c++;
				}
				worksheet.getCell(this.obtenerNombreColumna(colNroViajes).toString() + initialRow).value = viajesAcumulado;
				totalViajes += viajesAcumulado;
				importeAcumulado = viajesAcumulado*d['tarifa'];
				worksheet.getCell(this.obtenerNombreColumna(colNroViajes+1).toString() + initialRow).value = importeAcumulado;
				totalImporte += importeAcumulado;
				initialRow++;
			}

			initialRow = initialRow + 2;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Total Cant.: " + totalViajes;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Total Importe: S/." + totalImporte.toFixed(2);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			c = initialCol;
			worksheet.getColumn(1).width = 14.50;
			for (const cs of columnsSize) {
				worksheet.getColumn(c).width = cs;
				c++;
			}

			await workbook.xlsx.writeBuffer().then((dataBlob: any) => {
				fs.saveAs(new Blob([dataBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
			});
		}
	}

	async exportLiquidacionServicioCamiones(registro: any, sheet: string, header: any[], data: any[][], columnsSize: number[], fileName: string) {
		const excelJS = window["ExcelJS"];
		if (!excelJS) {
			console.log("ExcelJS no cargado!!!");
		} else {
			const workbook = new excelJS.Workbook();
			const worksheet = workbook.addWorksheet(sheet, { views: [{ showGridLines: false, zoomScale: 80 }]});
			let logo = workbook.addImage({base64: logoFile.logoBase64, extension: 'png' });
			worksheet.addImage(logo, 'A1:A2');
			let initialCol: number = 2;
			let initialRow: number = 1;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "LIQUIDACIÓN DE SERVICIOS DE CAMIONES";
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 24, bold: true, color: {argb: 'FF191970'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = registro.fechaDesde + " al " + registro.fechaHasta;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 18, bold: false, color: {argb: 'FF191970'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
			initialRow = initialRow + 2;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Num. Liquidación: " + registro.correlativo;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Empresa: " + registro.empresa;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Proveedor: " + registro.proveedor;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Num. Factura: " + ((registro.factura === undefined || registro.factura === "" || registro === null) ? "_________________________" : registro.factura);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow = initialRow + 2;

			let c: number = initialCol;
			for (const h of header) {
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = h.label;
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'005075'} };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
				worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
					top: { style: 'thin', color: {argb:'FF000000'} },
					left: { style: 'thin', color: {argb:'FF000000'} },
					bottom: { style: 'thin', color: {argb:'FF000000'} },
					right: { style: 'thin', color: {argb:'FF000000'} }
				};
				c++;
			}

			initialRow++;
			let totalServicios: number = 0;
			let totalImporte: number = 0.0;
			for (const d of data) {
				c = initialCol;
				let serviciosAcumulado: number = 0;
				let importeAcumulado: number = 0.0;
				let colNroServicio = 0;
				for (const h of header) {
					if (h.name === "nroServicios") {
						colNroServicio = c;
					}
					if (c >= 9) {
						serviciosAcumulado += (isNaN(parseInt(d[h.name])) ? 0 : parseInt(d[h.name]));
					}
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = d[h.name];
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c++;
				}
				worksheet.getCell(this.obtenerNombreColumna(colNroServicio).toString() + initialRow).value = serviciosAcumulado;
				totalServicios += serviciosAcumulado;
				importeAcumulado = serviciosAcumulado*d['tarifa'];
				worksheet.getCell(this.obtenerNombreColumna(colNroServicio+1).toString() + initialRow).value = importeAcumulado;
				totalImporte += importeAcumulado;
				initialRow++;
			}

			initialRow = initialRow + 2;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Total Cant.: " + totalServicios;
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header.length - 1).toString() + initialRow);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = "Total Importe: S/." + totalImporte.toFixed(2);
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 16, bold: true, color: {argb: '005075'} };
			worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle' };
			initialRow++;

			c = initialCol;
			worksheet.getColumn(1).width = 14.50;
			for (const cs of columnsSize) {
				worksheet.getColumn(c).width = cs;
				c++;
			}

			await workbook.xlsx.writeBuffer().then((dataBlob: any) => {
				fs.saveAs(new Blob([dataBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
			});
		}
	}

	async exportToExcelCosechaCierreFinal(title:string, sheet:string[], header:any[], data:any[][], columnsSize:any[], fileName:string, flagNumeroVacio?:boolean) {

		const excelJS = window["ExcelJS"]
		if(!excelJS) {
			console.log("ExcelJS no cargado!!!")
		}else{
			const workbook = new excelJS.Workbook()
			for(let i = 0; i < 2; i++){
				const worksheet = workbook.addWorksheet(sheet[i], {views: [{showGridLines: false, zoomScale: 80}]})
				let initialCol:number = 2
				let initialRow:number = 1

				worksheet.mergeCells(this.obtenerNombreColumna(initialCol).toString() + initialRow.toString() + ":" + this.obtenerNombreColumna(initialCol + header[i].length - 1).toString() + initialRow)
				worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).value = title + ((i === 0) ? ' - LOTES ' : ' - GRUPOS')
				worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 24, bold: true, color: {argb: 'FF191970'} }
				worksheet.getCell(this.obtenerNombreColumna(initialCol).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' }

				initialRow = initialRow + 2
				let c = initialCol

				for(const h of header[i]){
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = h.label
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: true, color: {argb: 'FFFFFFFF'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).fill = { type: 'pattern', pattern:'solid', fgColor: {argb:'005075'} };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
					worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
						top: { style: 'thin', color: {argb:'FF000000'} },
						left: { style: 'thin', color: {argb:'FF000000'} },
						bottom: { style: 'thin', color: {argb:'FF000000'} },
						right: { style: 'thin', color: {argb:'FF000000'} }
					};
					c++
				}

				initialRow++

				for(const d of data[i]){
					c = initialCol
					for(const h of header[i]){
						worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).value = flagNumeroVacio ? (d[h.name]=="-1" ? "" : d[h.name]) : d[h.name];
						worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).font = { name: 'Calibri', family: 4, size: 11, bold: false, color: {argb: 'FF000000'} };
						worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).alignment = { vertical: 'middle', horizontal: 'center' };
						worksheet.getCell(this.obtenerNombreColumna(c).toString() + initialRow).border = {
							top: { style: 'thin', color: {argb:'FF000000'} },
							left: { style: 'thin', color: {argb:'FF000000'} },
							bottom: { style: 'thin', color: {argb:'FF000000'} },
							right: { style: 'thin', color: {argb:'FF000000'} }
						};
						c++
					}
					initialRow++
				}

				c = initialCol
				for(const cs of columnsSize[i]){
					worksheet.getColumn(c).width = cs;
					c++
				}
			}


			await workbook.xlsx.writeBuffer().then((data: any) => {
				fs.saveAs(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
			});
		}
	}

}

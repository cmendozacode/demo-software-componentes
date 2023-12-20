export class SupervisorPlanillaModel {
    codigo:number;
    descripcion:string;
    clear() {
        this.codigo = -1;
        this.descripcion = "";
    }
}
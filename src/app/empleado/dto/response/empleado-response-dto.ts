import { Cargo } from "./cargo";


export class EmpleadoResponseDto {
  id: number = 0;
  cedula: number = 0;
  nombre: string = "";
  foto:string = "";
  fechaIngreso!: Date;
  cargo: Cargo = new Cargo;
}

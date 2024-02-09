import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioImagenService } from 'src/app/imgenes/servicio/servicio-imagen.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmpleadoRequestDto } from '../../dto/request/empleado-request-dto';
import Swal from 'sweetalert2';
import { ServicioEmpleadoService } from '../../servicios/servicio-empleado.service';
import { CustomValidators } from 'src/app/utilidades/custom-validators';
import { CargoService } from 'src/app/cargo/servicio/cargo.service';
import { Cargo } from 'src/app/cargo/dto/response/cargo';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guardar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './guardar-empleado.component.html',
  styleUrls: ['./guardar-empleado.component.css']
})
export class GuardarEmpleadoComponent implements OnInit{
  msg = "El campo es requerido";
  fotoElejida: File | null = null;
  fotoSeleccionada: File | null = null;

  formulario: FormGroup;
  private servicioImagen:ServicioImagenService;
  private servicioEmpleo:ServicioEmpleadoService;
  private ObjectoEmpleadoRequestDto:EmpleadoRequestDto= new EmpleadoRequestDto;
  private cargoService: CargoService;

  listadoCargo:Cargo[]=[];

  msg2 = "Por favor, ingrese solo números"

  constructor(
    public dialogRef: MatDialogRef<GuardarEmpleadoComponent>,
    cargoService: CargoService,
    servicioImagen:ServicioImagenService,
     servicioEmpleo:ServicioEmpleadoService,
     private fb: FormBuilder
     ){
    this.servicioImagen = servicioImagen;
    this.servicioEmpleo = servicioEmpleo;
    this.cargoService = cargoService;
    this.formulario = this.fb.group({
      cargo: ['', [ CustomValidators.spaceValidator]],
      cedula: ['',  [ CustomValidators.spaceValidator,Validators.pattern('^[0-9]+$')]],
      nombre: ['', [ CustomValidators.spaceValidator]],
      fechaIngreso: ['', [ CustomValidators.spaceValidator]],
    });
  }
  ngOnInit(): void {
    this.listadoCargos();
  }

  escogerFoto(event: any): void {
    this.fotoElejida = event.target.files[0] as File;
  }
 guardar(): void {
  console.log(this.fotoElejida)
    if (this.fotoElejida) {
      this.servicioImagen.subirImagen(this.fotoElejida).subscribe(

        {
          next: (data)=>{
            console.log(data.fileName)
           this.guardarEmpleado(data.fileName
            );
          },
          error:(error) => {
            console.error('Error al subir la imagen:', error);

          }
        }
      );
    }else{
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Debe subir una imagen png",
        confirmButtonText: "Aceptar",

        showCloseButton: true,
      });
    }
}

guardarEmpleado(foto:string){
  this.ObjectoEmpleadoRequestDto.cargoId= this.formulario.get("cargo")?.value;
  this.ObjectoEmpleadoRequestDto.cedula=this.formulario.get("cedula")?.value;
  this.ObjectoEmpleadoRequestDto.fechaIngreso = this.formulario.get("fechaIngreso")?.value;
  this.ObjectoEmpleadoRequestDto.foto = foto;
  this.ObjectoEmpleadoRequestDto.nombre=this.formulario.get("nombre")?.value;
  if (this.formulario.valid){
    this.servicioEmpleo.guardarEmpleado(this.ObjectoEmpleadoRequestDto).subscribe({
      next:(data)=>{
        this.dialogRef.close();
        Swal.fire(
          '¡Registrado!',
          'El empleado ha sido registrado en la base de datos.',
          'success'
        );
      },
      error:(e)=>{

        Swal.fire({
          title: "Error",
          icon: "error",
          text: e.error.mensaje,
          confirmButtonText: "Aceptar",

          showCloseButton: true,
        });
      }
    })
  }else{
    this.markFieldsAsTouched(this.formulario);
  }


}



private markFieldsAsTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    if (control instanceof FormGroup) {
      this.markFieldsAsTouched(control);
    } else {
      control.markAsTouched();
    }
  });
}




listadoCargos(){

  this.cargoService.listarCargos().subscribe({
    next:(data)=>{
      this.listadoCargo = data.response;
      console.log(this.listadoCargo)
    },
    error:(e)=>{
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error en obtener el listado  de cargo",
        confirmButtonText: "Aceptar",

        showCloseButton: true,
      });
    }
  })

}



}

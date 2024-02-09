import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioImagenService } from 'src/app/imgenes/servicio/servicio-imagen.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EmpleadoRequestDto } from '../../dto/request/empleado-request-dto';
import Swal from 'sweetalert2';
import { ServicioEmpleadoService } from '../../servicios/servicio-empleado.service';
import { CustomValidators } from 'src/app/utilidades/custom-validators';

@Component({
  selector: 'app-guardar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './guardar-empleado.component.html',
  styleUrls: ['./guardar-empleado.component.css']
})
export class GuardarEmpleadoComponent {
  msg = "El campo es requerido";
  fotoElejida: File | null = null;

  formulario: FormGroup;
  private servicioImagen:ServicioImagenService;
  private servicioEmpleo:ServicioEmpleadoService;
  private ObjectoEmpleadoRequestDto:EmpleadoRequestDto= new EmpleadoRequestDto;
  msg2 = "Por favor, ingrese solo números"

  constructor(servicioImagen:ServicioImagenService, servicioEmpleo:ServicioEmpleadoService,private fb: FormBuilder){
    this.servicioImagen = servicioImagen;
    this.servicioEmpleo = servicioEmpleo;
    this.formulario = this.fb.group({
      cargo: ['', [ CustomValidators.spaceValidator]],
      cedula: ['',  [ CustomValidators.spaceValidator,Validators.pattern('^[0-9]+$')]],
      nombre: ['', [ CustomValidators.spaceValidator]],
      fechaIngreso: ['', [ CustomValidators.spaceValidator]],
    });
  }


 guardar(): void {
  console.log(this.fotoElejida)
    if (this.fotoElejida) {
      this.servicioImagen.subirImagen(this.fotoElejida).subscribe(

        {
          next: (data)=>{
            console.log(data)
           this.guardarEmpleado(data);
          },
          error:(error) => {
            console.error('Error al subir la imagen:', error);

          }
        }
      );
    }
}

guardarEmpleado(foto:string){
  this.ObjectoEmpleadoRequestDto.cargoId= this.formulario.get("cargo")?.value;
  this.ObjectoEmpleadoRequestDto.cedula=this.formulario.get("cedula")?.value;
  this.ObjectoEmpleadoRequestDto.fechaIngreso = this.formulario.get("fechaIngreso")?.value;
  this.ObjectoEmpleadoRequestDto.foto=foto
  this.ObjectoEmpleadoRequestDto.nombre=this.formulario.get("nombre")?.value;
  if (this.formulario.valid){
    this.servicioEmpleo.guardarEmpleado(this.ObjectoEmpleadoRequestDto).subscribe({
      next:(data)=>{
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
          text: "Error al guardar el empleado",
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

escogerFoto(event: any): void {
  this.fotoElejida = event.target.files[0] as File;
}

}

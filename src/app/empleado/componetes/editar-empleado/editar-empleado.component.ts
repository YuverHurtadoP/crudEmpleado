import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Cargo } from 'src/app/cargo/dto/response/cargo';
import { CargoService } from 'src/app/cargo/servicio/cargo.service';
import { ServicioImagenService } from 'src/app/imgenes/servicio/servicio-imagen.service';
import { CustomValidators } from 'src/app/utilidades/custom-validators';
import { EmpleadoRequestDto } from '../../dto/request/empleado-request-dto';
import { ServicioEmpleadoService } from '../../servicios/servicio-empleado.service';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent {
  msg = "El campo es requerido";
  fotoElejida: File | null = null;
  fotoSeleccionada: File | null = null;

  formulario: FormGroup;
  private servicioImagen: ServicioImagenService;
  private servicioEmpleo: ServicioEmpleadoService;
  private ObjectoEmpleadoRequestDto: EmpleadoRequestDto = new EmpleadoRequestDto;
  private cargoService: CargoService;

  listadoCargo: Cargo[] = [];

  foto = "";


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarEmpleadoComponent>,
    cargoService: CargoService,
    servicioImagen: ServicioImagenService,
    servicioEmpleo: ServicioEmpleadoService,
    private fb: FormBuilder
  ) {
    this.servicioImagen = servicioImagen;
    this.servicioEmpleo = servicioEmpleo;
    this.cargoService = cargoService;
    this.formulario = this.fb.group({
      cargo: ['', [CustomValidators.spaceValidator]],
      cedula: ['', [CustomValidators.spaceValidator, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [CustomValidators.spaceValidator]],
      fechaIngreso: ['', [CustomValidators.spaceValidator]],
    });
    this.formulario.setValue({
      cargo: this.data.cargo.toString(),
      cedula: this.data.cedula.toString(),
      nombre: this.data.nombre.toString(),
      fechaIngreso: this.data.fechaIngreso.toString(),
    });
  }
  ngOnInit(): void {
    this.listadoCargos();



    this.foto = this.data.foto;





  }


  escogerFoto(event: any): void {
    this.fotoElejida = event.target.files[0] as File;
  }
  actualizar(): void {
    if (this.formulario.valid) {

      if (this.fotoElejida) {
        this.servicioImagen.subirImagen(this.fotoElejida).subscribe(

          {
            next: (data) => {

              this.actualizarEmpleado(data.fileName
              );
            },
            error: (error) => {
              console.error('Error al subir la imagen:', error);

            }
          }
        );
      } else {
        const arrayCadena = this.foto.split('/');
        const nombreFoto = arrayCadena[arrayCadena.length - 1];

        this.actualizarEmpleado(nombreFoto);
      }
    }else {
      this.markFieldsAsTouched(this.formulario);
    }

  }

  actualizarEmpleado(foto: string) {
    this.ObjectoEmpleadoRequestDto.id = this.data.id;
    this.ObjectoEmpleadoRequestDto.cargoId = this.formulario.get("cargo")?.value;
    this.ObjectoEmpleadoRequestDto.cedula = this.formulario.get("cedula")?.value;
    this.ObjectoEmpleadoRequestDto.fechaIngreso = this.formulario.get("fechaIngreso")?.value;
    this.ObjectoEmpleadoRequestDto.foto = foto;
    this.ObjectoEmpleadoRequestDto.nombre = this.formulario.get("nombre")?.value;

      this.servicioEmpleo.actualizarEmpleado(this.ObjectoEmpleadoRequestDto).subscribe({
        next: (data) => {
          this.dialogRef.close();
          Swal.fire(
            '¡Registrado!',
            'El empleado ha sido registrado en la base de datos.',
            'success'
          );
        },
        error: (e) => {

          Swal.fire({
            title: "Error",
            icon: "error",
            text: e.error.mensaje,
            confirmButtonText: "Aceptar",

            showCloseButton: true,
          });
        }
      })



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




  listadoCargos() {

    this.cargoService.listarCargos().subscribe({
      next: (data) => {
        this.listadoCargo = data.response;

      },
      error: (e) => {
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

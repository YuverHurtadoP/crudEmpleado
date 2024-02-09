import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServicioEmpleadoService } from '../../servicios/servicio-empleado.service';
import Swal from 'sweetalert2';
import { EmpleadoResponseDto } from '../../dto/response/empleado-response-dto';
import { MatIconModule } from '@angular/material/icon';
import { Constantes } from 'src/app/utilidades/constantes';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarEmpleadoComponent } from '../editar-empleado/editar-empleado.component';
@Component({
  selector: 'app-listar-empleado',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatDialogModule ],
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit{
  private servicioEmpleo:ServicioEmpleadoService;

  urlImagen = Constantes.API_URL.URL + "Imagen/";

  public listadoEmpleadoResponseDto: EmpleadoResponseDto []=[];



  constructor(
    public dialog: MatDialog,
    servicioEmpleo:ServicioEmpleadoService
    ){
    this.servicioEmpleo = servicioEmpleo;
  }
  ngOnInit(): void {
    this.listadoEmpleado();
   this.actualizacionAutomatica()

  }
  actualizacionAutomatica(){
    this.servicioEmpleo.obtenerEstadoGuardado().subscribe((estado) => {
      this.listadoEmpleado();

    });
  }
  listadoEmpleado(){

    this.servicioEmpleo.listarEmpleado().subscribe({
      next:(data)=>{
        this.listadoEmpleadoResponseDto = data.response;
        console.log(this.listadoEmpleadoResponseDto)
      },
      error:(e)=>{
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error en obtener el listado  de empleado",
          confirmButtonText: "Aceptar",

          showCloseButton: true,
        });
      }
    })

  }





  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioEmpleo.eliminarEmpleado(id).subscribe(
          response => {
            if (response.mensaje === 'ok') {
              this.listadoEmpleado();
              Swal.fire(
                '¡Eliminado!',
                'El empleado ha sido eliminado.',
                'success'
              );

            } else {
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el empleado.',
                'error'
              );
            }
          },

        );
      }
    });
  }

  abrirModalFormularioEditar(
    nombre:string,
    cedula:number,
    cargo:number,
    fechaIngreso:Date,
    foto:string,
    id:number

    ): void {

    this.dialog.open(EditarEmpleadoComponent, { width: '500px',
    data: { nombre,cedula,cargo,fechaIngreso,foto,id}
  });
  }


}

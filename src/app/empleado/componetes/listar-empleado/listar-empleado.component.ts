import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServicioEmpleadoService } from '../../servicios/servicio-empleado.service';
import Swal from 'sweetalert2';
import { EmpleadoResponseDto } from '../../dto/response/empleado-response-dto';
import { MatIconModule } from '@angular/material/icon';
import { Constantes } from 'src/app/utilidades/constantes';
@Component({
  selector: 'app-listar-empleado',
  standalone: true,
  imports: [CommonModule,MatIconModule ],
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit{
  private servicioEmpleo:ServicioEmpleadoService;

  urlImagen = Constantes.API_URL.URL + "Imagen/";

  public listadoEmpleadoResponseDto: EmpleadoResponseDto []=[];



  constructor( servicioEmpleo:ServicioEmpleadoService){
    this.servicioEmpleo = servicioEmpleo;
  }
  ngOnInit(): void {
    this.listadoEmpleado();
    console.log(this.urlImagen)

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
      confirmButtonText: 'Sí, eliminarlo'
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

}

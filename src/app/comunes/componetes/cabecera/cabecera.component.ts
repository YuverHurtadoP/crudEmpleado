import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { GuardarEmpleadoComponent } from 'src/app/empleado/componetes/guardar-empleado/guardar-empleado.component';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatDialogModule],
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  constructor( public dialog: MatDialog){}

  abrirModalFormulario(): void {

    this.dialog.open(GuardarEmpleadoComponent, { width: '500px',  });
  }

}

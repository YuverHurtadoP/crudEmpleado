import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from 'src/app/utilidades/constantes';
import { EmpleadoResponseDto } from '../dto/response/empleado-response-dto';
import { EmpleadoRequestDto } from '../dto/request/empleado-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleadoService {

  private URL: string = Constantes.API_URL.URL+"Empleado";
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  listarEmpleado(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.URL}/lista`
    );
  }


 guardarEmpleado( dto:EmpleadoRequestDto): Observable<any> {
    return this.httpClient.post<any>(
      `${this.URL}/guardar`,dto
    );
  }

  eliminarEmpleado(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    return this.httpClient.delete<any>(url);
  }



}

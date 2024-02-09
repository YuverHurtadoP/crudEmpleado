import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Constantes } from 'src/app/utilidades/constantes';
import { EmpleadoResponseDto } from '../dto/response/empleado-response-dto';
import { EmpleadoRequestDto } from '../dto/request/empleado-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleadoService {

  private URL: string = Constantes.API_URL.URL+"Empleado";
  private httpClient: HttpClient;
  private guardadoSubject = new Subject<boolean>();

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
    ).pipe(  tap(() => this.guardadoSubject.next(true)));
  }

  eliminarEmpleado(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    return this.httpClient.delete<any>(url);
  }


  obtenerEstadoGuardado(): Observable<boolean> {
    return this.guardadoSubject.asObservable();
  }

  actualizarEmpleado( dto:EmpleadoRequestDto): Observable<any> {
    return this.httpClient.put<any>(
      `${this.URL}/actualizar`,dto
    ).pipe(  tap(() => this.guardadoSubject.next(true)));
  }
}

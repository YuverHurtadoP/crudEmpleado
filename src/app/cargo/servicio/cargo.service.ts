import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from 'src/app/utilidades/constantes';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private URL: string = Constantes.API_URL.URL+"Cargo";
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  listarCargos(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.URL}/lista`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from 'src/app/utilidades/constantes';

@Injectable({
  providedIn: 'root'
})
export class ServicioImagenService {

  private URL: string = Constantes.API_URL.URL+"Imagen";
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  subirImagen(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', imagen);

    return this.httpClient.post<any>(`${this.URL}/subir`, formData);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pelicula } from '../model/pelicula.model';
import { Observable } from 'rxjs';

@Injectable()
export class PeliculasService {

  constructor(private httpClient: HttpClient) { }

  public guardarPelicula(cuerpoPelicula: Pelicula): Observable<Pelicula> {
    return this.httpClient.post<Pelicula>(`${environment.endpoint}/pelicula`, cuerpoPelicula);
  }

  public editarPelicula(cuerpoPelicula: Pelicula): Observable<Pelicula> {
    return this.httpClient.put<Pelicula>(`${environment.endpoint}/lista-peliculas/${cuerpoPelicula.id}`, cuerpoPelicula);
  }

  public obtenerListadoPeliculas(): Observable<Pelicula[]> {
    return this.httpClient.get<Pelicula[]>(`${environment.endpoint}/lista-peliculas`);
  }

  public eliminarPelicula(idPelicula: number): Observable<Pelicula> {
    return this.httpClient.delete<Pelicula>(`${environment.endpoint}/pelicula-delete/${idPelicula}`);
  }
}

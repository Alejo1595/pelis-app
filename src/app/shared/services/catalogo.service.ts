import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalogo } from '@shared/model/catalogo.model';

@Injectable()
export class CatalogoService {

  constructor(private readonly httpClient: HttpClient) { }

  public obtenerCatalogo(nombreCatalogo: string): Observable<Catalogo[]> {
    return this.httpClient.get<Catalogo[]>(`${environment.endpoint}/catalogo-${nombreCatalogo}`);
  }
}

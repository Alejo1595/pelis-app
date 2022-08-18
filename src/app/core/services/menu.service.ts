import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MenuItem } from '../modelo/menu-item';
@Injectable()
export class MenuService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getInfoMenu(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(`${environment.endpoint}/menu`);
  }
}

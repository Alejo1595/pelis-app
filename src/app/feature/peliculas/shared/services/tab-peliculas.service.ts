import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TabPeliculasService {

  public indiceTab$ = new Subject<number>();
}

import { Component } from '@angular/core';
import { TabPeliculasService } from '@pelicula/shared/services/tab-peliculas.service';

@Component({
  selector: 'app-tab-peliculas',
  templateUrl: './tab-peliculas.component.html',
})
export class TabPeliculasComponent {

  constructor(public readonly tabPeliculasService: TabPeliculasService) { }

  public onCambiarIndiceTab(indice: number): void {
    this.tabPeliculasService.indiceTab$.next(indice);
  }
}

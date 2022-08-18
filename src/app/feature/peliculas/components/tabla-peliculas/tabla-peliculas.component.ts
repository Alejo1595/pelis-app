import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculaLogicaService } from '@pelicula/shared/services/pelicula-logica.service';
import { TabPeliculasService } from '@pelicula/shared/services/tab-peliculas.service';

@Component({
  selector: 'app-tabla-peliculas',
  templateUrl: './tabla-peliculas.component.html',
  styleUrls: ['./tabla-peliculas.component.scss']
})
export class TablaPeliculasComponent implements OnInit {

  displayedColumns: string[] = ['tituloPelicula', 'nombreDirector', 'duracion', 'clasificacion', 'genero', 'fechaEstreno', 'botones'];
  dataSource: MatTableDataSource<Pelicula>;

  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly peliculaLogicaService: PeliculaLogicaService,
    private readonly tabPeliculasService: TabPeliculasService) {
  }

  ngOnInit(): void {
    this.peliculasService.obtenerListadoPeliculas()
      .subscribe(listaPeliculas => this.dataSource = new MatTableDataSource<Pelicula>(listaPeliculas));
  }

  public onEditarPelicula(pelicula: Pelicula): void {
    this.peliculaLogicaService.peliculaEditada = pelicula;
    this.tabPeliculasService.indiceTab$.next(0);
  }

  public onEliminarPelicula(pelicula: Pelicula): void {
    this.peliculasService.eliminarPelicula(pelicula.id).subscribe();
  }
}

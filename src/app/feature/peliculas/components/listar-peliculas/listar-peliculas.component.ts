import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarritoService } from '@core//services/carrito.service';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { Pelicula, PeliculaSeleccionada } from '@pelicula/shared/model/pelicula.model';
import { PrecioService } from '@shared/services/precio.service';

@Component({
  selector: 'app-listar-peliculas',
  templateUrl: './listar-peliculas.component.html',
  styleUrls: ['./listar-peliculas.component.scss']
})
export class ListarPeliculasComponent implements OnInit {

  public listadoPeliculas$: Observable<Pelicula[]>;

  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly carritoService: CarritoService,
    private readonly precioService: PrecioService) {
  }

  ngOnInit(): void {
    this.obtenerListadoPeliculas();
  }

  public onSeleccionarPelicula(peliculaSeleccionada: PeliculaSeleccionada): void {
    peliculaSeleccionada.esEliminacion
      ? this.carritoService.eliminarPeliculaCarrito(peliculaSeleccionada.pelicula)
      : this.carritoService.agregarPeliculaCarrito(peliculaSeleccionada.pelicula);
  }

  private obtenerListadoPeliculas(): void {
    this.listadoPeliculas$ = this.peliculasService.obtenerListadoPeliculas()
      .pipe(
        map(listadoPeliculas =>
          listadoPeliculas.map(pelicula => {
            pelicula.precioVentaNuevo = this.precioService.calcularNuevoPrecio(pelicula);
            return pelicula;
          }).sort((peliculaA, peliculaB) =>
            new Date(peliculaB.fechaEstreno).getTime() - new Date(peliculaA.fechaEstreno).getTime())
        ),
      );
  }
}

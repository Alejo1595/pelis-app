import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';
import { PrecioService } from '@shared/services/precio.service';
@Injectable()
export class CarritoService {

  public listaPeliculasSeleccionadas: Pelicula[] = [];
  public precioTotalPeliculas = 0;


  constructor(
    private readonly storageService: StorageService,
    private readonly precioService: PrecioService) { }

  public get totalPeliculas() {
    return this.listaPeliculasSeleccionadas.length;
  }

  public obtenerListadoPeliculasCarrito(): void {
    this.listaPeliculasSeleccionadas = this.storageService.obtenerInformacionLocalStorage('listado')
      ? JSON.parse(this.storageService.obtenerInformacionLocalStorage('listado'))
      : [];
  }

  public agregarPeliculaCarrito(pelicula: Pelicula): void {
    this.listaPeliculasSeleccionadas.push(pelicula);
    this.guardarPeliculaStorage();
  }

  public eliminarPeliculaCarrito(pelicula: Pelicula): void {
    const condicionesFiltro = (peliculaSeleccionada: Pelicula) => peliculaSeleccionada.id !== pelicula.id;
    this.listaPeliculasSeleccionadas = this.listaPeliculasSeleccionadas.filter(condicionesFiltro);
    this.guardarPeliculaStorage();
  }

  public eliminarTotalPeliculas(): void {
    this.listaPeliculasSeleccionadas = [];
    this.guardarPeliculaStorage();
  }

  private guardarPeliculaStorage(): void {
    this.storageService.guardarInformacionLocalStorage('listado', JSON.stringify(this.listaPeliculasSeleccionadas));
  }

  public calcularPrecioTotalPeliculas(): void {
    this.precioTotalPeliculas = 0;
    this.listaPeliculasSeleccionadas
      .forEach(pelicula => {
        pelicula.precioVentaNuevo = this.precioService.calcularNuevoPrecio(pelicula);
        this.precioTotalPeliculas += (pelicula.precioVentaNuevo)
          ? pelicula.precioVentaNuevo
          : pelicula.precioVenta;
      });
  }
}

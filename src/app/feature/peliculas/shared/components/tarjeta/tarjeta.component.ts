import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarritoService } from '@core/services/carrito.service';
import { Pelicula, PeliculaSeleccionada } from '@pelicula/shared/model/pelicula.model';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent {

  @Input()
  public inPelicula: Pelicula;

  @Output()
  public outPeliculaSeleccionada = new EventEmitter<PeliculaSeleccionada>();

  public mensajeBoton: string;

  constructor(
    private readonly carritoService: CarritoService
  ) { }

  public onEnviarPeliculaSeleccionada(pelicula: Pelicula): void {
    this.outPeliculaSeleccionada.emit({ pelicula, esEliminacion: this.validarExistenciaPelicula(pelicula) });
  }

  public validarExistenciaPelicula(pelicula: Pelicula): boolean {
    return this.carritoService.listaPeliculasSeleccionadas.some((peliculaCarrito: Pelicula) => peliculaCarrito.id === pelicula.id);
  }

  public determinarMensajeBoton(pelicula: Pelicula): string {
    return this.validarExistenciaPelicula(pelicula) ? 'Eliminar del carrito' : 'Añadir al carrito';
  }

  public determinarColorBoton(pelicula: Pelicula): string {
    return this.validarExistenciaPelicula(pelicula) ? 'warn' : 'accent';
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';

@Component({
  selector: 'app-tarjeta-carrito',
  templateUrl: './tarjeta-carrito.component.html',
  styleUrls: ['./tarjeta-carrito.component.scss']
})
export class TarjetaCarritoComponent {

  @Input()
  public inPelicula: Pelicula;

  @Output()
  public outPeliculaRemovida = new EventEmitter<Pelicula>();

  public onRemoverPelicula(pelicula: Pelicula) {
    this.outPeliculaRemovida.emit(pelicula);
  }
}

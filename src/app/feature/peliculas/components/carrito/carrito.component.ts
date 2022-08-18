import { Component, OnInit } from '@angular/core';
import { CarritoService } from '@core/services/carrito.service';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(
    public readonly carritoService: CarritoService,
    private readonly snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerListadoPeliculasCarrito();
    this.carritoService.calcularPrecioTotalPeliculas();
  }

  public onRemoverPelicula(pelicula: Pelicula): void {
    this.carritoService.eliminarPeliculaCarrito(pelicula);
    this.carritoService.calcularPrecioTotalPeliculas();
  }

  public onPagarPeliculas(): void {
    this.snackBarService.abrirSnackBar(`Usted ha pagado $${this.carritoService.precioTotalPeliculas}`);
    this.carritoService.eliminarTotalPeliculas();
  }
}

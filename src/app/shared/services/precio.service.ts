import { Injectable } from '@angular/core';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';

@Injectable()
export class PrecioService {

  private fechaActual = new Date();
  private nuevoPrecio = 0;

  public get getFechaActual(): Date {
    return this.fechaActual;
  }

  public set setFechaActual(fecha: string) {
    this.fechaActual = new Date(fecha);
  }

  public calcularNuevoPrecio(pelicula: Pelicula): number {
    this.nuevoPrecio = null;
    const divisor = 2;
    const numeroDias = 5;
    if ((this.getFechaActual.getDate() % divisor) === 0) {
      this.nuevoPrecio = this.aplicarCambioPrecio(pelicula, 'disminuir');
    }

    if (this.validarAumento(pelicula, numeroDias)) {
      this.nuevoPrecio = this.aplicarCambioPrecio(pelicula, 'aumentar');
    }

    return this.nuevoPrecio;
  }

  private aplicarCambioPrecio(pelicula: Pelicula, accion: string): number {
    const precioActual = (this.nuevoPrecio) ? this.nuevoPrecio : pelicula.precioVenta;
    const porcentajeCambio = 0.1;
    return (accion === 'aumentar')
      ? precioActual + (pelicula.precioVenta * porcentajeCambio)
      : precioActual - (pelicula.precioVenta * porcentajeCambio);
  }

  private validarAumento(pelicula: Pelicula, numeroDiasValido: number): boolean {
    const fechaPelicula: Date = new Date(pelicula.fechaEstreno);
    return this.getFechaActual.getMonth() === fechaPelicula.getMonth()
      && Math.abs(this.getFechaActual.getDate() - fechaPelicula.getDate()) <= numeroDiasValido;
  }
}

import { TestBed } from '@angular/core/testing';

import { PrecioService } from './precio.service';
import { listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';

describe('PrecioService', () => {
  let service: PrecioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrecioService]
    });
    service = TestBed.inject(PrecioService);
  });

  it('Servicio creado', () => {
    expect(service).toBeTruthy();
  });

  it('calcularNuevoPrecio, debe aplicar un 10% de descuento al valor de la pelicula ya que es un dia par', () => {
    service.setFechaActual = '2021-07-25';
    const pelicula: Pelicula = listaPeliculas[0];
    pelicula.precioVenta = 500;
    pelicula.fechaEstreno = new Date('2021-06-24');
    const nuevoPrecio = service.calcularNuevoPrecio(pelicula);
    expect(nuevoPrecio).toEqual(450);
  });

  it('calcularNuevoPrecio, debe aplicar un 10% de aumento al valor de la pelicula poer estreno menor a 5 días', () => {
    service.setFechaActual = '2021-07-26';
    const pelicula: Pelicula = listaPeliculas[0];
    pelicula.precioVenta = 500;
    pelicula.fechaEstreno = new Date('2021-07-24');
    const nuevoPrecio = service.calcularNuevoPrecio(pelicula);
    expect(nuevoPrecio).toEqual(550);
  });

  it('calcularNuevoPrecio, debe mantener el mismo precio ya que se aplican las dos condiciones de cambio de precio', () => {
    service.setFechaActual = '2021-07-25';
    const pelicula: Pelicula = listaPeliculas[0];
    pelicula.precioVenta = 500;
    pelicula.fechaEstreno = new Date('2021-07-23');
    const nuevoPrecio = service.calcularNuevoPrecio(pelicula);
    expect(nuevoPrecio).toEqual(500);
  });
});

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';
import { listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';

import { TarjetaCarritoComponent } from '@pelicula/components/tarjeta-carrito/tarjeta-carrito.component';

describe('TarjetaCarritoComponent', () => {
  let component: TarjetaCarritoComponent;
  let fixture: ComponentFixture<TarjetaCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetaCarritoComponent],
      imports: [SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCarritoComponent);
    component = fixture.componentInstance;
    component.inPelicula = listaPeliculas[0];
    fixture.detectChanges();
  });

  it('Se debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('onRemoverPelicula, debe emitir una pelicula para eliminarla', () => {
    const pelicula: Pelicula = listaPeliculas[0];
    component.outPeliculaRemovida.subscribe((peliculaSeleccionada: Pelicula) =>
      expect(peliculaSeleccionada).toEqual(pelicula));
    component.onRemoverPelicula(pelicula);
  });
});

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CarritoService } from '@core/services/carrito.service';
import { StorageService } from '@core/services/storage.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { SharedModule } from '@shared/shared.module';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';

import { CarritoComponent } from './carrito.component';
import { TarjetaCarritoComponent } from '../tarjeta-carrito/tarjeta-carrito.component';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let carritoService: CarritoService;
  let snackBarService: SnackBarService;
  let storage = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoComponent, TarjetaCarritoComponent, TrackByPipe],
      imports: [
        MatSnackBarModule,
        SharedModule,
      ],
      providers: [
        CarritoService,
        CurrencyPipe,
        StorageService,
        SnackBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    carritoService = fixture.debugElement.injector.get(CarritoService);
    snackBarService = fixture.debugElement.injector.get(SnackBarService);
    fixture.detectChanges();
    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key] ? storage[key] : null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => storage[key] = value);
  });

  it('Componente creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('onRemoverPelicula debe llamar a los métodos eliminarPeliculaCarrito y calcularPrecioTotalPeliculas', () => {
    const sypEliminarPeliculaCarrito = spyOn(carritoService, 'eliminarPeliculaCarrito').and.callFake(() => null);
    const sypCalcularPrecioTotalPeliculas = spyOn(carritoService, 'calcularPrecioTotalPeliculas').and.callFake(() => null);
    const pelicula: Pelicula = listaPeliculas[0];

    component.onRemoverPelicula(pelicula);

    expect(sypEliminarPeliculaCarrito).toHaveBeenCalled();
    expect(sypCalcularPrecioTotalPeliculas).toHaveBeenCalled();
  });

  it('onPagarPeliculas debe llamar a los métodos abrirSnackBar y eliminarTotalPeliculas', () => {
    const sypAbrirSnackBar = spyOn(snackBarService, 'abrirSnackBar').and.callFake(() => null);
    const sypEliminarTotalPeliculas = spyOn(carritoService, 'eliminarTotalPeliculas').and.callFake(() => null);
    const pelicula: Pelicula = listaPeliculas[0];
    carritoService.agregarPeliculaCarrito(pelicula);
    component.onPagarPeliculas();
    expect(sypAbrirSnackBar).toHaveBeenCalled();
    expect(sypEliminarTotalPeliculas).toHaveBeenCalled();
  });

  it('Debería renderizar una pelicula por cada elemento de la lista', () => {
    fixture.detectChanges();
    const listadoPeliculas = fixture.debugElement.queryAll(By.directive(TarjetaCarritoComponent));
    expect(listadoPeliculas.length).toBe(carritoService.listaPeliculasSeleccionadas.length);
  });
});

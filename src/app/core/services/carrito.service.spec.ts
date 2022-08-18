import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { CarritoService } from '@core/services/carrito.service';
import { listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { PrecioService } from '@shared/services/precio.service';

describe('CarritoService', () => {
    let carritoServices: CarritoService;
    let precioServices: PrecioService;
    let storage = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CarritoService, StorageService, PrecioService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        carritoServices = TestBed.inject(CarritoService);
        precioServices = TestBed.inject(PrecioService);
        storage = {};
        spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key] ? storage[key] : null);
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => storage[key] = value);
    });

    it('servicio creado', () => {
        expect(carritoServices).toBeTruthy();
    });

    it('obtenerListadoPeliculasCarrito, retorna un array vacio cuando el localstorage esta vacio', () => {
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.listaPeliculasSeleccionadas.length).toBe(0);
    });

    it('agregarPeliculaCarrito, agrega una pelicula cuando en la lista no existe en el localstorage', () => {
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.listaPeliculasSeleccionadas.length).toBe(0);
        carritoServices.agregarPeliculaCarrito(listaPeliculas[0]);
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.listaPeliculasSeleccionadas.length).toBe(1);
    });

    it('agregarPeliculaCarrito, agrega una pelicula cuando en la lista existe en el localstorage', () => {
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.totalPeliculas).toBe(0);
        carritoServices.agregarPeliculaCarrito(listaPeliculas[0]);
        carritoServices.agregarPeliculaCarrito(listaPeliculas[1]);
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.totalPeliculas).toBe(2);
    });

    it('eliminarPeliculaCarrito, elimina una pelicula cuando en la lista existe en el localstorage', () => {
        carritoServices.agregarPeliculaCarrito(listaPeliculas[0]);
        carritoServices.agregarPeliculaCarrito(listaPeliculas[1]);
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.totalPeliculas).toBe(2);
        carritoServices.eliminarPeliculaCarrito(listaPeliculas[1]);
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.totalPeliculas).toBe(1);
    });

    it('eliminarTotalPeliculas, se debe limpiar el listado de peliculas seleccionadas', () => {
        carritoServices.agregarPeliculaCarrito(listaPeliculas[0]);
        carritoServices.agregarPeliculaCarrito(listaPeliculas[1]);
        carritoServices.obtenerListadoPeliculasCarrito();
        expect(carritoServices.totalPeliculas).toBe(2);
        carritoServices.eliminarTotalPeliculas();
        expect(carritoServices.listaPeliculasSeleccionadas.length).toEqual(0);
    });

    it('calcularPrecioTotalPeliculas, se calcula el precio total de las peliculas seleccionadas', () => {
        precioServices.setFechaActual = '2021-07-28';
        const peliculaA = listaPeliculas[0];
        const peliculaB = listaPeliculas[1];
        peliculaA.precioVenta = 500;
        peliculaA.fechaEstreno = new Date('2021-07-25');
        peliculaB.precioVenta = 500;
        peliculaB.fechaEstreno = new Date('2021-07-25');
        carritoServices.agregarPeliculaCarrito(peliculaA);
        carritoServices.agregarPeliculaCarrito(peliculaB);
        carritoServices.obtenerListadoPeliculasCarrito();
        carritoServices.calcularPrecioTotalPeliculas();
        expect(carritoServices.precioTotalPeliculas).toBe(1100);
    });
});

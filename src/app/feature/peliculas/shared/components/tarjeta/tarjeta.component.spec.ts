import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CarritoService } from '@core/services/carrito.service';
import { StorageService } from '@core/services/storage.service';

import { TarjetaComponent } from '@pelicula/shared/components/tarjeta/tarjeta.component';
import { PeliculaSeleccionada } from '@pelicula/shared/model/pelicula.model';
import { listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { PrecioService } from '../../../../../shared/services/precio.service';

describe('TarjetaComponent', () => {
    let component: TarjetaComponent;
    let fixture: ComponentFixture<TarjetaComponent>;
    let services: CarritoService;
    let storage = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TarjetaComponent],
            imports: [
                MatCardModule,
                MatInputModule,
                MatButtonModule,
                MatFormFieldModule,
                MatSelectModule,
                MatDatepickerModule,
            ],
            providers: [
                CarritoService,
                StorageService,
                PrecioService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TarjetaComponent);
        component = fixture.componentInstance;
        services = fixture.debugElement.injector.get(CarritoService);
        storage = {};
        spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key]);
    });

    it('Componente creado', () => {
        expect(component).toBeTruthy();
    });

    it('validarExistenciaPelicula, debe retornar false si listado de peliculas en el storage esta vacio', () => {
        const hayPelicula = component.validarExistenciaPelicula(listaPeliculas[0]);
        expect(hayPelicula).toBe(false);
    });

    it('validarExistenciaPelicula, debe retornar true si listado de peliculas en el storage NO esta vacio', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const hayPelicula = component.validarExistenciaPelicula(listaPeliculas[0]);
        expect(hayPelicula).toBe(true);
    });

    it('determinarMensajeBoton, debe retornar "Eliminar del carrito" cuando la pelicula ya existe en el carrito', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const mensaje = component.determinarMensajeBoton(listaPeliculas[0]);
        expect(mensaje).toBe('Eliminar del carrito');
    });

    it('determinarMensajeBoton, debe retornar "Añadir al carrito" cuando la pelicula no existe en el carrito', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const mensaje = component.determinarMensajeBoton(listaPeliculas[1]);
        expect(mensaje).toBe('Añadir al carrito');
    });

    it('determinarColorBoton, debe retornar "warn" cuando la pelicula ya existe en el carrito', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const mensaje = component.determinarColorBoton(listaPeliculas[0]);
        expect(mensaje).toBe('warn');
    });

    it('determinarColorBoton, debe retornar "accent" cuando la pelicula no existe en el carrito', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const mensaje = component.determinarColorBoton(listaPeliculas[1]);
        expect(mensaje).toBe('accent');
    });

    it('onEnviarPeliculaSeleccionada, debe emitir una pelicula para añadira en el storage', () => {
        const respuesta: PeliculaSeleccionada = { pelicula: listaPeliculas[0], esEliminacion: false };
        component.outPeliculaSeleccionada.subscribe((peliculaSeleccionada: PeliculaSeleccionada) =>
            expect(peliculaSeleccionada).toEqual(respuesta));
        component.onEnviarPeliculaSeleccionada(listaPeliculas[0]);
    });

    it('onEnviarPeliculaSeleccionada, debe emitir una pelicula para eliminarla del storage', () => {
        services.agregarPeliculaCarrito(listaPeliculas[0]);
        const respuesta: PeliculaSeleccionada = { pelicula: listaPeliculas[0], esEliminacion: true };
        component.outPeliculaSeleccionada.subscribe((peliculaSeleccionada: PeliculaSeleccionada) =>
            expect(peliculaSeleccionada).toEqual(respuesta));
        component.onEnviarPeliculaSeleccionada(listaPeliculas[0]);
    });
});

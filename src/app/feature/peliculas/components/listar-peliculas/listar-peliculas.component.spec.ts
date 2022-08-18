import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { CarritoService } from '@core/services/carrito.service';
import { PrecioService } from '@shared/services/precio.service';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { SharedModule } from '@shared/shared.module';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculasServicesMock, listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';
import { TarjetaComponent } from '@pelicula/shared/components/tarjeta/tarjeta.component';

import { ListarPeliculasComponent } from './listar-peliculas.component';

describe('ListarPeliculasComponent', () => {

    let component: ListarPeliculasComponent;
    let fixture: ComponentFixture<ListarPeliculasComponent>;
    let peliculaService: PeliculasService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListarPeliculasComponent,
                TarjetaComponent,
                TrackByPipe
            ],
            imports: [
                SharedModule
            ],
            providers: [
                {
                    provide: PeliculasService,
                    useValue: PeliculasServicesMock
                },
                CarritoService,
                PrecioService,
                StorageService
            ], schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListarPeliculasComponent);
        component = fixture.componentInstance;
        peliculaService = fixture.debugElement.injector.get(PeliculasService);
        fixture.detectChanges();
    });

    it('Componente creado correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería renderizar una pelicula por cada elemento de la lista', () => {
        spyOn(peliculaService, 'obtenerListadoPeliculas').and.returnValue(of(listaPeliculas));
        fixture.detectChanges();
        const listadoPeliculas = fixture.debugElement.queryAll(By.directive(TarjetaComponent));
        expect(listadoPeliculas.length).toBe(listaPeliculas.length);
    });
});

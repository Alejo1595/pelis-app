import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { CatalogoService } from '@shared/services/catalogo.service';

import { TarjetaComponent } from '@pelicula/shared/components/tarjeta/tarjeta.component';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculaLogicaService } from '@pelicula/shared/services/pelicula-logica.service';

import { RegistrarPeliculaComponent } from '@pelicula/components/registrar-pelicula/registrar-pelicula.component';
import {
    PeliculasServicesMock,
    CatalogoServiceMock,
    datosInicialesFormulario,
    datosCompletosFormulario,
    informacionPeliculaFormulario,
    listaPeliculas
} from '@pelicula/shared/mock/peliculas-mock';

describe('RegistrarPeliculaComponent', () => {
    let component: RegistrarPeliculaComponent;
    let fixture: ComponentFixture<RegistrarPeliculaComponent>;
    let peliculaServices: PeliculasService;
    let peliculaLogicaServices: PeliculaLogicaService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegistrarPeliculaComponent,
                TarjetaComponent
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatCardModule,
                MatInputModule,
                MatButtonModule,
                MatFormFieldModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule,
                SharedModule
            ],
            providers: [
                {
                    provide: PeliculasService,
                    useValue: PeliculasServicesMock
                },
                {
                    provide: CatalogoService,
                    useValue: CatalogoServiceMock
                },
                PeliculaLogicaService,
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrarPeliculaComponent);
        component = fixture.componentInstance;
        peliculaServices = fixture.debugElement.injector.get(PeliculasService);
        peliculaLogicaServices = fixture.debugElement.injector.get(PeliculaLogicaService);
        fixture.detectChanges();
    });

    it('Componente creado correctamente', () => {
        expect(component).toBeTruthy();
    });

    it('Numero de inputs igual al numero de campos del formulario', () => {
        const formElement = fixture.nativeElement.querySelector('#formularioPeliculas');
        const inputsElement = formElement.querySelectorAll('mat-form-field');
        expect(inputsElement.length).toBe(10);
    });

    it('Validando el valor inicial del formulario', () => {
        const formularioGroup = component.formularioPeliculas;
        expect(formularioGroup.value).toEqual(datosInicialesFormulario);
    });

    it('Validar errores del input tituloPelicula', () => {
        const tituloPeliculaElemento: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#tituloPelicula');
        const tituloPeliculaInput = component.formularioPeliculas.get('tituloPelicula');
        expect(tituloPeliculaElemento.value === tituloPeliculaInput.value);
        expect(tituloPeliculaInput.errors).not.toBeNull();
        expect(tituloPeliculaInput.errors.required).toBeTruthy();
    });

    it('Validar errores del input nombreDirector', () => {
        const nombreDirectorElemento: HTMLInputElement = fixture.nativeElement.querySelector('#nombreDirector');
        const nombreDirectorInput = component.formularioPeliculas.get('nombreDirector');
        expect(nombreDirectorElemento.value).toEqual(nombreDirectorInput.value);
        expect(nombreDirectorInput.errors).not.toBeNull();
        expect(nombreDirectorInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input actoresPrincipales', () => {
        const actoresPrincipalesElemento: HTMLInputElement = fixture.nativeElement.querySelector('#actoresPrincipales');
        const actoresPrincipalesInput = component.formularioPeliculas.get('actoresPrincipales');
        expect(actoresPrincipalesElemento.value).toEqual(actoresPrincipalesInput.value);
        expect(actoresPrincipalesInput.errors).not.toBeNull();
        expect(actoresPrincipalesInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input duracion', () => {
        const duracionElemento: HTMLInputElement = fixture.nativeElement.querySelector('#duracion');
        const duracionInput = component.formularioPeliculas.get('duracion');
        expect(duracionElemento.value).toEqual(duracionInput.value);
        expect(duracionInput.errors).not.toBeNull();
        expect(duracionInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input fechaEstreno', () => {
        const fechaEstrenoElemento: HTMLInputElement = fixture.nativeElement.querySelector('#fechaEstreno');
        const fechaEstrenoInput = component.formularioPeliculas.get('fechaEstreno');
        expect(fechaEstrenoElemento.value).toEqual(fechaEstrenoInput.value);
        expect(fechaEstrenoInput.errors).not.toBeNull();
        expect(fechaEstrenoInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input precioVenta', () => {
        const precioVentaElemento: HTMLInputElement = fixture.nativeElement.querySelector('#precioVenta');
        const precioVentaInput = component.formularioPeliculas.get('precioVenta');
        expect(precioVentaElemento.value).toEqual(precioVentaInput.value);
        expect(precioVentaInput.errors).not.toBeNull();
        expect(precioVentaInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input urlImagen', () => {
        const urlImagenElemento: HTMLInputElement = fixture.nativeElement.querySelector('#urlImagen');
        const urlImagenInput = component.formularioPeliculas.get('urlImagen');
        expect(urlImagenElemento.value).toEqual(urlImagenInput.value);
        expect(urlImagenInput.errors).not.toBeNull();
        expect(urlImagenInput.errors.required).toBeTruthy();
    });

    it('Validar errores en el input argumento', () => {
        const argumentoElemento: HTMLInputElement = fixture.nativeElement.querySelector('#argumento');
        const argumentoInput = component.formularioPeliculas.get('argumento');
        expect(argumentoElemento.value).toEqual(argumentoInput.value);
        expect(argumentoInput.errors).not.toBeNull();
        expect(argumentoInput.errors.required).toBeTruthy();
    });

    it('Validar input tituloPelicula después de recibir un valor', () => {
        const tituloPeliculaElemento: HTMLInputElement = fixture.nativeElement.querySelector('#tituloPelicula');
        tituloPeliculaElemento.value = 'God of war';
        tituloPeliculaElemento.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const tituloPeliculaInput = component.formularioPeliculas.get('tituloPelicula');
        expect(tituloPeliculaElemento.value).toEqual(tituloPeliculaInput.value);
        expect(tituloPeliculaInput.errors).toBeNull();
    });

    it('Validar el formulario cuando no se ingresa nada', () => {
        const formularioPeliculasElemento = component.formularioPeliculas;
        const btnGuardar = fixture.nativeElement.querySelector('#btn-guardar');

        btnGuardar.dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        expect(formularioPeliculasElemento.invalid).toBeTrue();
    });

    it('Validar el formulario cuando tiene todos los campos correcto', () => {
        const formularioPeliculas = component.formularioPeliculas;
        const btnGuardar = fixture.nativeElement.querySelector('#btn-guardar');

        formularioPeliculas.setValue(datosCompletosFormulario);
        btnGuardar.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(formularioPeliculas.valid).toBeTrue();
    });

    it('onGuardarPelicula, no deberia realizar nada cuando el formulario esta invalido', () => {
        const formularioPeliculasElemento = component.formularioPeliculas;
        component.onGuardarPelicula();
        expect(formularioPeliculasElemento.invalid).toBeTrue();
    });

    it('onGuardarPelicula, debería llamar al método peliculasService.guardarPelicula', () => {
        const formularioPeliculas = component.formularioPeliculas;
        const spyGuardarPelicula = spyOn(peliculaServices, 'guardarPelicula').and.callFake(() => of());
        const spyCrearCuerpoPeticion = spyOn((component as any), 'crearCuerpoPeticion').and.callThrough();
        formularioPeliculas.setValue(datosCompletosFormulario);

        component.onGuardarPelicula();

        expect(spyCrearCuerpoPeticion).toHaveBeenCalled();
        expect(spyGuardarPelicula).toHaveBeenCalled();
    });

    it('onGuardarPelicula, debería llamar al método peliculasService.editarPelicula', () => {
        const formularioPeliculas = component.formularioPeliculas;
        const spyEditarPelicula = spyOn(peliculaServices, 'editarPelicula').and.callFake(() => of());
        const spyCrearCuerpoPeticion = spyOn((component as any), 'crearCuerpoPeticion').and.callThrough();

        formularioPeliculas.setValue(datosCompletosFormulario);
        component.setPeliculaEditada = listaPeliculas[0];

        component.onGuardarPelicula();

        expect(spyCrearCuerpoPeticion).toHaveBeenCalled();
        expect(spyEditarPelicula).toHaveBeenCalled();
    });

    it('onLimpiarFormulario, limpia el formulario', () => {
        const formularioPeliculas = component.formularioPeliculas;
        const btnCancelar = fixture.nativeElement.querySelector('#btn-cancelar');
        const spyOnLimpiarFormulario = spyOn(component, 'onLimpiarFormulario').and.callThrough();
        formularioPeliculas.setValue(datosCompletosFormulario);
        btnCancelar.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(spyOnLimpiarFormulario).toHaveBeenCalled();
        expect(formularioPeliculas.value).toEqual(datosInicialesFormulario);
    });

    it('determinarNumeroCaracteresArgumento debe retornar 0 cuando el input Argumento esta vacio', () => {
        const totalCaracteres = component.determinarNumeroCaracteresArgumento();
        expect(totalCaracteres).toBe(0);
    });

    it('determinarNumeroCaracteresArgumento debe retornar 5 cuando el input Argumento tiene la cadena "12345"', () => {
        const argumentoInput = component.getArgumento;
        argumentoInput.setValue('12345');
        const totalCaracteres = component.determinarNumeroCaracteresArgumento();
        expect(totalCaracteres).toBe(5);
    });

    it('ngOnInit el formulario debe quedar con información si esta en modo edición', () => {
        const spyEscucharDatosEdicion = spyOn((component as any), 'escucharDatosEdicion').and.callThrough();
        peliculaLogicaServices.peliculaEditada = informacionPeliculaFormulario;
        component.ngOnInit();
        expect(spyEscucharDatosEdicion).toHaveBeenCalled();
        expect(component.formularioPeliculas.valid).toBeTrue();
    });
});

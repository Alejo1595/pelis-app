import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Catalogo } from '@shared/model/catalogo.model';
import { CatalogoService } from '@shared/services/catalogo.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculaLogicaService } from '@pelicula/shared/services/pelicula-logica.service';

@Component({
  selector: 'app-registrar-pelicula',
  templateUrl: './registrar-pelicula.component.html',
})
export class RegistrarPeliculaComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

  public formularioPeliculas: FormGroup;
  public readonly maximoCaracteresArgumento = 800;
  public validaciones;
  public fechaActual = new Date();

  public listaDeClasificacion$: Observable<Catalogo[]>;
  public listaDeGeneros$: Observable<Catalogo[]>;

  private valorInicialFormulario: Pelicula;
  private peliculaEditada: Pelicula;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly peliculasService: PeliculasService,
    private readonly catalogoService: CatalogoService,
    private readonly peliculaLogicaService: PeliculaLogicaService,
    private readonly snackBarService: SnackBarService,
  ) { }

  public get getPeliculaEditada(): Pelicula {
    return this.peliculaEditada;
  }

  public set setPeliculaEditada(pelicula: Pelicula) {
    this.peliculaEditada = pelicula;
  }

  public get getTituloPelicula(): AbstractControl {
    return this.formularioPeliculas.get('tituloPelicula');
  }

  public get getNombreDirector(): AbstractControl {
    return this.formularioPeliculas.get('nombreDirector');
  }

  public get getActoresPrincipales(): AbstractControl {
    return this.formularioPeliculas.get('actoresPrincipales');
  }

  public get getDuracion(): AbstractControl {
    return this.formularioPeliculas.get('duracion');
  }

  public get getIdClasificacion(): AbstractControl {
    return this.formularioPeliculas.get('idClasificacion');
  }

  public get getIdGenero(): AbstractControl {
    return this.formularioPeliculas.get('idGenero');
  }

  public get getFechaEstreno(): AbstractControl {
    return this.formularioPeliculas.get('fechaEstreno');
  }

  public get getPrecioVenta(): AbstractControl {
    return this.formularioPeliculas.get('precioVenta');
  }

  public get getUrlImagen(): AbstractControl {
    return this.formularioPeliculas.get('urlImagen');
  }

  public get getArgumento(): AbstractControl {
    return this.formularioPeliculas.get('argumento');
  }

  ngOnInit(): void {
    this._crearFormulario();
    this._crearValidaciones();
    this.valorInicialFormulario = this.formularioPeliculas.value;
    this.listaDeClasificacion$ = this.catalogoService.obtenerCatalogo('clasificacion');
    this.listaDeGeneros$ = this.catalogoService.obtenerCatalogo('genero');
    this.escucharDatosEdicion();
  }

  public onGuardarPelicula(): void {
    if (this.formularioPeliculas.invalid) {
      return;
    }

    const cuerpoPeticion: Pelicula = this.crearCuerpoPeticion();

    const peticion = this.getPeliculaEditada
      ? this.peliculasService.editarPelicula(cuerpoPeticion)
      : this.peliculasService.guardarPelicula(cuerpoPeticion);

    peticion.subscribe({
      complete: () => {
        this.onLimpiarFormulario();
        this.snackBarService.abrirSnackBar('Guardado exitosamente');
      }
    });
  }

  public onLimpiarFormulario(): void {
    this.formGroupDirective.resetForm();
    this.formularioPeliculas.reset(this.valorInicialFormulario);
  }

  public determinarNumeroCaracteresArgumento(): number {
    return (this.getArgumento.value && this.getArgumento.value.length > 0)
      ? this.getArgumento.value.length
      : 0;
  }

  public compararValor(pelicula1: Pelicula, pelicula2: Pelicula): boolean {
    return pelicula1 && pelicula2 ? pelicula1.id === pelicula2.id : pelicula1 === pelicula2;
}

  ngOnDestroy(): void {
    this.peliculaLogicaService.peliculaEditada = null;
  }

  private _crearFormulario(): void {
    this.formularioPeliculas = this.formBuilder.group({
      tituloPelicula: ['', Validators.required],
      nombreDirector: ['', Validators.required],
      actoresPrincipales: ['', Validators.required],
      duracion: ['', Validators.required],
      idClasificacion: ['', Validators.required],
      idGenero: ['', Validators.required],
      fechaEstreno: ['', Validators.required],
      precioVenta: ['', Validators.required],
      urlImagen: ['', Validators.required],
      argumento: ['', Validators.required],
    });
  }

  private _crearValidaciones(): void {
    this.validaciones = {
      tituloPelicula: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      nombreDirector: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      actoresPrincipales: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      duracion: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      idClasificacion: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      idGenero: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      fechaEstreno: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      precioVenta: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      urlImagen: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
      argumento: [
        { tipo: 'required', mensaje: 'Campo obligatorio' }
      ],
    };
  }

  private escucharDatosEdicion(): void {
    this.setPeliculaEditada = this.peliculaLogicaService.peliculaEditada;
    if (this.getPeliculaEditada) {
      this.formularioPeliculas.patchValue(this.getPeliculaEditada);
      this.getFechaEstreno.setValue(new Date(this.getPeliculaEditada.fechaEstreno));
      this.getIdClasificacion.setValue({ id: this.getPeliculaEditada.idClasificacion, descripcion: this.getPeliculaEditada.clasificacion });
      this.getIdGenero.setValue({ id: this.getPeliculaEditada.idGenero, descripcion: this.getPeliculaEditada.genero });
    }
  }

  private crearCuerpoPeticion(): Pelicula {
    return {
      ...this.formularioPeliculas.value,
      id: this.getPeliculaEditada ? this.getPeliculaEditada.id : null,
      duracion: Number(this.getDuracion.value),
      idClasificacion: Number(this.getIdClasificacion.value.id),
      idGenero: Number(this.getIdGenero.value.id),
      precioVenta: Number(this.getPrecioVenta.value),
      clasificacion: this.getIdClasificacion.value.descripcion,
      genero: this.getIdGenero.value.descripcion,
    };
  }
}

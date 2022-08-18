import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculaLogicaService } from '@pelicula/shared/services/pelicula-logica.service';
import { TabPeliculasService } from '@pelicula/shared/services/tab-peliculas.service';
import { PeliculasServicesMock, listaPeliculas } from '@pelicula/shared/mock/peliculas-mock';

import { TablaPeliculasComponent } from './tabla-peliculas.component';

describe('TablaPeliculasComponent', () => {
  let component: TablaPeliculasComponent;
  let fixture: ComponentFixture<TablaPeliculasComponent>;
  let peliculaLogicaService: PeliculaLogicaService;
  let peliculasService: PeliculasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TablaPeliculasComponent,
      ],
      providers: [
        {
          provide: PeliculasService,
          useValue: PeliculasServicesMock
        },
        PeliculaLogicaService,
        TabPeliculasService
      ],
      imports: [
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        SharedModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPeliculasComponent);
    component = fixture.componentInstance;
    peliculaLogicaService = fixture.debugElement.injector.get(PeliculaLogicaService);
    peliculasService = fixture.debugElement.injector.get(PeliculasService);
    fixture.detectChanges();
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });

  it('onEditarPelicula, debe mandar la información para editarla', () => {
    component.onEditarPelicula(listaPeliculas[0]);
    expect(peliculaLogicaService.peliculaEditada).toEqual(listaPeliculas[0]);
  });

  it('onEliminarPelicula, debe llamar al método para eliminar', () => {
    const services = spyOn(peliculasService, 'eliminarPelicula').and.callFake(() => of());
    component.onEliminarPelicula(listaPeliculas[0]);
    expect(services).toHaveBeenCalled();
  });
});

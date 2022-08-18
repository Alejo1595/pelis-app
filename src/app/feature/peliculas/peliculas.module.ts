import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '@shared/shared.module';

import { PeliculasRoutingModule } from '@pelicula/peliculas-routing.module';

import { TabPeliculasService } from '@pelicula/shared/services/tab-peliculas.service';
import { PeliculasService } from '@pelicula/shared/services/peliculas.service';
import { PeliculaLogicaService } from '@pelicula/shared/services/pelicula-logica.service';
import { TarjetaComponent } from '@pelicula/shared/components/tarjeta/tarjeta.component';
import { TarjetaCarritoComponent } from '@pelicula/components/tarjeta-carrito/tarjeta-carrito.component';

import { RegistrarPeliculaComponent } from '@pelicula/components/registrar-pelicula/registrar-pelicula.component';
import { ListarPeliculasComponent } from '@pelicula/components/listar-peliculas/listar-peliculas.component';
import { TabPeliculasComponent } from '@pelicula/components/tab-peliculas/tab-peliculas.component';
import { TablaPeliculasComponent } from '@pelicula/components/tabla-peliculas/tabla-peliculas.component';
import { CarritoComponent } from '@pelicula/components/carrito/carrito.component';

@NgModule({
  declarations: [
    RegistrarPeliculaComponent,
    ListarPeliculasComponent,
    TarjetaComponent,
    TabPeliculasComponent,
    TablaPeliculasComponent,
    CarritoComponent,
    TarjetaCarritoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    PeliculasRoutingModule,
    SharedModule
  ],
  providers: [
    CurrencyPipe,
    PeliculasService,
    PeliculaLogicaService,
    TabPeliculasService,
  ]
})
export class PeliculasModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { MensajeErrorCamposDirective } from '@shared/directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from '@shared/directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from '@shared/directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from '@shared/directivas/error-campos/componente/error-campos-plantilla.component';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { CatalogoService } from '@shared/services/catalogo.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { PrecioService } from '@shared/services/precio.service';

import { CabeceraComponent } from '@shared/components/cabecera/cabecera.component';


@NgModule({
  declarations: [
    CabeceraComponent,
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe
  ],
  imports: [ReactiveFormsModule, FormsModule, MatToolbarModule, MatCardModule],
  exports: [
    CabeceraComponent,
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    MatSnackBarModule,
  ],
  providers: [
    CatalogoService,
    SnackBarService,
    PrecioService
  ]
})
export class SharedModule { }

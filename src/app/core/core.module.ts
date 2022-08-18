import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

import { MenuService } from './services/menu.service';
import { StorageService } from './services/storage.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CarritoService } from '@core/services/carrito.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    SharedModule
  ],
  exports: [NavbarComponent],
  providers: [
    HttpService,
    SecurityGuard,
    MenuService,
    StorageService,
    CarritoService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError }
  ]
})
export class CoreModule { }

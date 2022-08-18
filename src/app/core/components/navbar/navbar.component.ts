import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from '@core/services/menu.service';
import { MenuItem } from '@core/modelo/menu-item';
import { CarritoService } from '@core/services/carrito.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public breakPointsList = [Breakpoints.XSmall, Breakpoints.Small];
  public isHandset$: Observable<boolean>;
  public infoMenu$: Observable<MenuItem[]>;

  private matches!: boolean;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    public readonly carritoService: CarritoService,
    public readonly menuService: MenuService) {
    this.createBreakPointObservable();
  }

  ngOnInit(): void {
    this.infoMenu$ = this.menuService.getInfoMenu();
    this.carritoService.obtenerListadoPeliculasCarrito();
  }

  public closeMenu(): void {
    if (this.matches) {
      this.sidenav.close();
    }
  }

  private createBreakPointObservable(): void {
    this.isHandset$ = this.breakpointObserver.observe(this.breakPointsList)
      .pipe(
        map(({ matches }) => matches),
        tap((matches => this.matches = matches)),
        shareReplay()
      );
  }

}

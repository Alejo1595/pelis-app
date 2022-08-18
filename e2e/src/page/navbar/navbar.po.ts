import { by, element } from 'protractor';

export class NavbarPage {
    linFormularioPeliculas = element(by.xpath('/html/body/app-root/app-navbar/mat-sidenav/mat-nav-list/button[1]'));

    async clickBotonProductos() {
        await this.linFormularioPeliculas.click();
    }
}

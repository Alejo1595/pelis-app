import { by, element } from 'protractor';

export class CarritoPeliculaPage {

    public async obtenerTotalPeliculasCarrito() {
        return element.all(by.tagName('app-tarjeta-carrito')).count();
    }
}

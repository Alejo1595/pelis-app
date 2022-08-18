import { by, element } from 'protractor';

export class ListarPeliculaPage {

    public async obtenerTotalPeliculas(): Promise<number> {
        return element.all(by.tagName('app-tarjeta')).count();
    }

    public async clickAgregarPelicula(numeroElementoPermitidos: number): Promise<void> {
        await element.all(by.css('.mat-card-actions > .mat-button-base')).each((elemento, index) => {
            if (index < numeroElementoPermitidos) {
                elemento.click();
            }
        });
    }

    public async obtenerTotalPeliculasSeleccionadas(): Promise<string> {
        return element(by.css('.mat-badge-content')).getText();
    }

    public async pagarPeliculas(): Promise<void> {
        await element(by.id('btn-pagar')).click();
    }

    public async calcularPrecioTotal() {
        let precioTotal = 0;
        await element.all(by.css('.precio-valido')).each(async (elemento) => {
            const textoPrecio = await elemento.getText();
            precioTotal += Number(textoPrecio.slice(1));
        });
        return precioTotal;
    }
}

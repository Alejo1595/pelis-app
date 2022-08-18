import { by, element, browser, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class PeliculaPage {

    public esperar(tiempo: number): void {
        browser.sleep(tiempo);
    }

    public async clickBoton(idBoton: string): Promise<void> {
        await element(by.id(idBoton)).click();
    }

    public async ingresarValorInputTexto(idElemento: string, valorElemento: string): Promise<void> {
        const elemento = element(by.id(idElemento));
        await elemento.sendKeys(valorElemento);
    }

    public async ingresarValorSelect(idElemento: string, valorCampo: string): Promise<void> {
        await element(by.id(idElemento)).click();
        await element(by.cssContainingText('mat-option .mat-option-text', valorCampo)).click();
        browser.waitForAngular();

    }

    public async ingresarFechaEstreno(dia: string, mes: string, anio: string): Promise<void> {
        await element(by.css('.mat-datepicker-toggle')).click();
        await element(by.css('.mat-calendar-arrow')).click();
        await element(by.cssContainingText('.mat-calendar-body-cell-content', anio)).click();
        await element(by.cssContainingText('.mat-calendar-body-cell-content', `${mes.toUpperCase()}.`)).click();
        await element(by.cssContainingText('.mat-calendar-body-cell-content', dia)).click();
    }

    public async obtenerSnackbar(): Promise<string> {
        const selectoCss = '.mat-simple-snackbar > span';
        return this.obtenerElemento(selectoCss).getText();
    }

    public async obtenerMensajesError(): Promise<number> {
        return element.all(by.css('.mat-error.mensaje-error')).count();
    }

    private obtenerElemento(selectoCSS: string): ElementFinder {
        const condiciones = protractor.ExpectedConditions;
        const snackBar = element(by.css(selectoCSS));
        browser.wait(condiciones.visibilityOf(snackBar), 5000);
        return snackBar;
    }
}

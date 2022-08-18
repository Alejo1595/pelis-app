import { browser, logging } from 'protractor';
import { AppPage } from '../app.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { CarritoPeliculaPage } from '../page/pelicula/carrito-pelicula.po';
import { ListarPeliculaPage } from '../page/pelicula/listado-peliculas.po';
import { PeliculaPage } from '../page/pelicula/registrar-pelicula.po';

describe('Listado Peliculas', () => {
    let page: AppPage;
    let navbar: NavbarPage;
    let listadoPeliculas: ListarPeliculaPage;
    let carritoPeliculas: CarritoPeliculaPage;
    let pelicula: PeliculaPage;

    const rutaRegistrarPeliculas = 'peliculas/listado';

    beforeEach(() => {
        page = new AppPage();
        navbar = new NavbarPage();
        listadoPeliculas = new ListarPeliculaPage();
        carritoPeliculas = new CarritoPeliculaPage();
        pelicula = new PeliculaPage();
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    it('total de peliculas seleccionadas en el carrito debe ser 3', async () => {
        page.navigateTo(rutaRegistrarPeliculas);
        navbar.clickBotonProductos();
        await listadoPeliculas.clickAgregarPelicula(3);
        page.navigateTo('peliculas/carrito');
        const totalPeliculas = await carritoPeliculas.obtenerTotalPeliculasCarrito();
        expect(totalPeliculas).toBe(3);
    });

    it('Validar proceso de compra de un listado de peliculas', async () => {
        page.navigateTo(rutaRegistrarPeliculas);
        navbar.clickBotonProductos();
        listadoPeliculas.clickAgregarPelicula(5);
        page.navigateTo('peliculas/carrito');
        const precioTotal = await listadoPeliculas.calcularPrecioTotal();
        listadoPeliculas.pagarPeliculas();
        const texto = await pelicula.obtenerSnackbar();
        expect(texto).toEqual(`Usted ha pagado $${precioTotal}`);
    });
});

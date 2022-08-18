import { AppPage } from '../app.po';
import { PeliculaPage } from '../page/pelicula/registrar-pelicula.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { browser, logging } from 'protractor';


describe('Registrar Peliculas', () => {
    let page: AppPage;
    let pelicula: PeliculaPage;
    let navbar: NavbarPage;

    const rutaRegistrarPeliculas = 'peliculas/formulario';

    beforeEach(() => {
        page = new AppPage();
        pelicula = new PeliculaPage();
        navbar = new NavbarPage();
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    it('Crear una pelicula', async () => {
        const TITULO_PELICULA = 'God of war';
        const NOMBRE_DIRECTOR = 'Julian';
        const ACTORES_PRINCIPALES = 'Kratos';
        const DURACION = '100';
        const PRECIO_VENTA = '300';
        const URL_IMAGEN = 'https://image.png';
        const ARGUMENTO = 'Una pelicula muy buena';

        page.navigateTo(rutaRegistrarPeliculas);
        navbar.clickBotonProductos();

        pelicula.ingresarValorInputTexto('tituloPelicula', TITULO_PELICULA);
        pelicula.ingresarValorInputTexto('nombreDirector', NOMBRE_DIRECTOR);
        pelicula.ingresarValorInputTexto('actoresPrincipales', ACTORES_PRINCIPALES);
        pelicula.ingresarValorInputTexto('duracion', DURACION);
        pelicula.ingresarValorSelect('idClasificacion', 'Para todos');
        pelicula.ingresarValorSelect('idGenero', 'Terror');
        pelicula.ingresarFechaEstreno('25', 'JUN', '2021');
        pelicula.ingresarValorInputTexto('precioVenta', PRECIO_VENTA);
        pelicula.ingresarValorInputTexto('urlImagen', URL_IMAGEN);
        pelicula.ingresarValorInputTexto('argumento', ARGUMENTO);
        pelicula.clickBoton('btn-guardar');
        const texto = await pelicula.obtenerSnackbar();
        expect(texto).toEqual('Guardado exitosamente');
    });

    it('validar mensaje errores', async () => {
        page.navigateTo(rutaRegistrarPeliculas);
        navbar.clickBotonProductos();
        pelicula.clickBoton('btn-guardar');
        const totalErrores = await pelicula.obtenerMensajesError();
        expect(totalErrores).toEqual(10);
    });
});

import { PeliculasService } from './peliculas.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pelicula } from '../model/pelicula.model';
import { environment } from 'src/environments/environment';
import { listaPeliculas } from '../mock/peliculas-mock';


describe('PeliculaServices', () => {
    let services: PeliculasService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PeliculasService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        services = TestBed.inject(PeliculasService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('Servicio creado', () => {
        expect(services).toBeTruthy();
    });

    it('obtenerListadoPeliculas retorna un lista de peliculas y usa el método GET', () => {
        services.obtenerListadoPeliculas().subscribe((listadoPeliculas: Pelicula[]) => expect(listadoPeliculas).toEqual(listaPeliculas));
        const req = httpMock.expectOne(environment.endpoint + `/lista-peliculas`);
        expect(req.request.method).toBe('GET');
        req.flush(listaPeliculas);
    });

    it('guardarPelicula retorna una pelicula y usa el método POST', () => {
        services.guardarPelicula(listaPeliculas[0]).subscribe((peli: Pelicula) => expect(peli).toEqual(listaPeliculas[0]));
        const req = httpMock.expectOne(environment.endpoint + `/pelicula`);
        expect(req.request.method).toBe('POST');
        req.flush(listaPeliculas[0]);
    });

    it('editarPelicula actualiza una pelicula y usa el método PUT', () => {
        services.editarPelicula(listaPeliculas[0]).subscribe((peli: Pelicula) => expect(peli).toEqual(listaPeliculas[0]));
        const req = httpMock.expectOne(`${environment.endpoint}/lista-peliculas/${listaPeliculas[0].id}`);
        expect(req.request.method).toBe('PUT');
        req.flush(listaPeliculas[0]);
    });

    it('eliminarPelicula elimina una pelicula por su id y usa el método DELETE', () => {
        services.eliminarPelicula(listaPeliculas[0].id).subscribe((peli: Pelicula) => expect(peli).toEqual(listaPeliculas[0]));
        const req = httpMock.expectOne(`${environment.endpoint}/pelicula-delete/${listaPeliculas[0].id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(listaPeliculas[0]);
    });
});

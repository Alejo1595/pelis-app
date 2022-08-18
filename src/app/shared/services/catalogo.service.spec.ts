import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoService } from '@shared/services/catalogo.service';
import { Catalogo } from '@shared/model/catalogo.model';
import { environment } from 'src/environments/environment';

const catalogoGenero = [
    {
        id: 1,
        descripcion: 'Terror'
    },
    {
        id: 2,
        descripcion: 'Acción'
    },
    {
        id: 3,
        descripcion: 'Fantasia'
    }
];

describe('CatalogoService', () => {
    let services: CatalogoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CatalogoService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        services = TestBed.inject(CatalogoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('Servicio creado', () => {
        expect(services).toBeTruthy();
    });

    it('obtenerCatalogo, retorna una lista de un catalogo llamado genero y usar el metodo GET', () => {
        services.obtenerCatalogo('genero').subscribe((listaGeneros: Catalogo[]) => expect(listaGeneros).toEqual(catalogoGenero));
        const req = httpMock.expectOne(environment.endpoint + `/catalogo-genero`);
        expect(req.request.method).toBe('GET');
        req.flush(catalogoGenero);
    });
});

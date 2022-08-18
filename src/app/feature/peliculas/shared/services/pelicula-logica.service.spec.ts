import { TestBed } from '@angular/core/testing';

import { PeliculaLogicaService } from './pelicula-logica.service';

describe('PeliculaLogicaService', () => {
  let service: PeliculaLogicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeliculaLogicaService]
    });
    service = TestBed.inject(PeliculaLogicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

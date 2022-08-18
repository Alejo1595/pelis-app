import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackBarService]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('Debe crearse el componente correctamente', () => {
    expect(service).toBeTruthy();
  });
});

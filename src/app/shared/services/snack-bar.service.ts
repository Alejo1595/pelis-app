import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  abrirSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar');
  }
}

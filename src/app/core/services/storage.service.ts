import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  public guardarInformacionLocalStorage(key: string, valor: string): void {
    localStorage.setItem(key, valor);
  }

  public obtenerInformacionLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }
}

import { Injectable } from '@angular/core';
import { Popup } from './pop-ups.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popups: Popup[] = [];

  constructor() { }

  // Método para agregar un nuevo popup
  addPopup(popup: Popup): void {
    this.popups.push(popup);

    // Cierra automáticamente el popup después de los segundos especificados si se habilita el cierre automático.
    if (popup.autoClose && popup.seconds) {
      setTimeout(() => {
        this.closePopup(popup);
      }, popup.seconds * 1000 + 1000); // Convierte segundos a milisegundos
    }

    popup.animationState = 'running';
  }

  // Método para obtener la lista de pop-ups
  getPopups(): Popup[] {
    return this.popups;
  }

  // Método para cerrar un popup
  closePopup(popup: Popup): void {
    const index = this.popups.indexOf(popup);
    if (index !== -1) {
      this.popups.splice(index, 1);
    }
  }
}
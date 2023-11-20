export enum configPopup {
  GENERAL = 0,
  SUCCESS = 1,
  ERROR = 2,
  WARNING = 3,
  INFO = 4,
}

export interface Popup {
  type: number;
  content?: string;
  title?: string;
  autoClose?: boolean;
  seconds?: number;
  animationDuration?: string;
  animationState?: string; // Agrega esta propiedad
}
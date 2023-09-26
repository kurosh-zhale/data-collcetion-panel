import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Popup, PopupOptions, PopupType } from '../models/popup.model';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popup$: Subject<Popup> = new Subject<Popup>();

  public get popup(): Observable<Popup> {
    return this.popup$.asObservable();
  }

  constructor() {}

  public open_popup(title: string, mode: PopupType, options?: Partial<PopupOptions>) {
    if (options) {
      this.popup$.next(
        new Popup({ message: title, type: mode, options: options })
      );
    } else {
      this.popup$.next(new Popup({ message: title, type: mode }));
    }
  }
}

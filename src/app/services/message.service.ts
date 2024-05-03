import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}
  //--- Initialization ---
  message: string[] = [];

  //--- add mesg fx ---
  add(message: string) {
    this.message.push(message);
  }

  //--- clear message fx ---
  clear() {
    this.message = [];
  }
}

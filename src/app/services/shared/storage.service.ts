import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
  }

  set(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  get(key: string) {
    let item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }

    return item;
  }

  getString(key: string) {
    let item = localStorage.getItem(key);
    if (item) {
      return item;
    }
    return item;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}

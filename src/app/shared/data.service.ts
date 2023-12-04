import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubjects: { [key: string]: BehaviorSubject<any> } = {};

  constructor() {}

  setData(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));

    if (!this.dataSubjects[key]) {
      this.dataSubjects[key] = new BehaviorSubject<any>(this.getStoredData(key));
    }

    this.dataSubjects[key].next(data);
  }

  getData(key: string): BehaviorSubject<any> {
    if (!this.dataSubjects[key]) {
      this.dataSubjects[key] = new BehaviorSubject<any>(this.getStoredData(key));
    }

    return this.dataSubjects[key];
  }

  clearData(key: string): void {
    sessionStorage.removeItem(key);

    if (this.dataSubjects[key]) {
      this.dataSubjects[key].next(null);
    }
  }
  
  private getStoredData(key: string): any {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
}

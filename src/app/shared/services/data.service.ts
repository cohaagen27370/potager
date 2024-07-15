import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public constructor(private dbService: NgxIndexedDBService) {}

  public getAll<T>(storeName: string): Observable<T[]> {
    return this.dbService.getAll<T>(storeName);
  }

  public get<T>(storeName: string,id: string): Observable<T> {
    return this.dbService.getByID(storeName,id);
  }

  public saveNew<T>(storeName: string,item: T): Observable<T> {
    return this.dbService.add(storeName,item);
  }

  public update<T>(storeName: string,id: string, item: T): Observable<T> {
    return this.dbService.update(storeName,item);
  }

  public remove(storeName: string, id: string): Observable<boolean> {
    return this.dbService.deleteByKey(storeName,id);
  }

}

import { Injectable } from '@angular/core';
import { CachedItem, NgForage, NgForageCache } from 'ngforage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly ngf: NgForage, private readonly cache: NgForageCache) {}

  public getItem<T>(key: string): Promise<T | null> {
    return this.ngf.getItem<T>(key);
  }

  public async getCachedItem<T = any>(key: string): Promise<T | null> {
    const r = await this.cache.getCached<T>(key);
    if (!r.hasData || r.expired) {
      return null;
    }
    return r.data;
  }

  public saveItem<T>(key: string, item:T) : Promise<T> {
    return this.ngf.setItem(key, item);
  }

  public removeItem<T>(key: string) {
    return this.ngf.removeItem(key);
  }

}

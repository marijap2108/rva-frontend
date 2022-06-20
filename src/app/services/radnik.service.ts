import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RADNIK_S_URI, RADNIK_URI } from '../constans';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root'
})
export class RadnikService {

  constructor(private httpClient: HttpClient) { } 
  //sluzi za instanciranje klase i dependencies injections-a

  public getRadnikBySektor(id: number): Observable<any>{
    return this.httpClient.get(`${RADNIK_S_URI}/${id}`);
  }

  public addRadnik(radnik: Radnik): Observable<any>{
    radnik.id = 500000;
    return this.httpClient.post(`${RADNIK_URI}`, radnik);
  }

  public updateRadnik(radnik: Radnik): Observable<any>{
    return this.httpClient.put(`${RADNIK_URI}`, radnik);
  }

  public deleteRadnik(id: number): Observable<any>{
    return this.httpClient.delete(`${RADNIK_URI}/${id}`);
  }
}

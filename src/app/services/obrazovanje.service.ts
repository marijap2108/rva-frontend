import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OBRAZOVANJE_URI } from '../constans';
import { Obrazovanje } from '../models/obrazovanje';
//injectable - dependencies injections u okviru modula
@Injectable({
  providedIn: 'root'
})
export class ObrazovanjeService {

  constructor(private httpClient: HttpClient) { } 
  //sluzi za instanciranje klase i dependencies injections-a

  public getAllObrazovanje(): Observable<any>{
    return this.httpClient.get(`${OBRAZOVANJE_URI}`);
  }

  public addObrazovanje(obrazovanje: Obrazovanje): Observable<any>{
    obrazovanje.id = 500000;
    return this.httpClient.post(`${OBRAZOVANJE_URI}`, obrazovanje);
  }

  public updateObrazovanje(obrazovanje: Obrazovanje): Observable<any>{
    return this.httpClient.put(`${OBRAZOVANJE_URI}`, obrazovanje);
  }

  public deleteObrazovanje(id: number): Observable<any>{
    return this.httpClient.delete(`${OBRAZOVANJE_URI}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, defaultIfEmpty, lastValueFrom, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatedProductsService {

  private readonly apiUrl = `${environment.apiUrl}/products/related/3`;

  constructor(private readonly http: HttpClient) { }



  getRelatedProducts(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            //"X-Api-Key": this._apiKey
        })
    };



    return this.http.get(this.apiUrl).pipe(
        switchMap((response: any) => {
            // Store the access token in the local storage
           console.log('data is =>'+ response)

            // Return a new observable with the response
            return of(response.data);
        }),
    );
}






}

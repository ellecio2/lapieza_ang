import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject, catchError, defaultIfEmpty, lastValueFrom, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodayDealsService {
  private readonly apiUrl = `${environment.apiUrl}/products/todays-deal`;
  private todayDealsSignal = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient) { }

  getTodayDeals(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        //"X-Api-Key": this._apiKey
      })
    };

    return this.http.get(this.apiUrl).pipe(
      switchMap((response: any) => {
        console.log('data is =>', response);
        this.todayDealsSignal.next(response.data);
        return of(response.data);
      }),
      catchError((error: any) => {
        this.todayDealsSignal.error(error);
        return of(null);
      })
    );
  }

  getTodayDealsSignal(): Observable<any> {
    return this.todayDealsSignal.asObservable();
  }
}

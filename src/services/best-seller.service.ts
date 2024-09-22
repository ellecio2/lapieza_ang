import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Adjust the import path

interface BestSellerResponse {
  data: any[];
  success: boolean;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsBestSellerService {
  private readonly apiUrl = `${environment.apiUrl}/products/best-seller`;
  private bestSellerSignal = new BehaviorSubject<any[]>([]); // Initialize with an empty array

  constructor(private readonly http: HttpClient) {}

  private handleSuccessResponse(response: BestSellerResponse): Observable<any[]> {
    console.log('Success response:', response); // Added log
    const responseData = response.data;
    if (response.success && Array.isArray(responseData)) {
      this.bestSellerSignal.next(responseData);
      return of(responseData);
    } else {
      const error = new Error('Response data is not an array or success is false');
      console.error(error); // Added log
      this.bestSellerSignal.error(error);
      return of([]);
    }
  }

  private handleErrorResponse(err: any): Observable<any[]> {
    console.error('Error response:', err); // Added log
    this.bestSellerSignal.error(err);
    return of([]);
  }

  getBestSeller(): Observable<any[]> {
    return this.http.get<BestSellerResponse>(this.apiUrl).pipe(
      switchMap(response => this.handleSuccessResponse(response)),
      catchError(err => this.handleErrorResponse(err))
    );
  }

  getBestSellerSignal(): Observable<any[]> {
    return this.bestSellerSignal.asObservable();
  }
}

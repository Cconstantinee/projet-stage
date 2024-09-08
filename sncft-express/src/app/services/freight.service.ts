import { Injectable } from '@angular/core';
import { Operation } from './operations';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreightService {

  private cachedFreightTypes: freight[] | null = null; // Cache for all operations
  private operationCache: Map<number, Operation> = new Map(); // Cache for individual operations

  REST_API: string = 'http://localhost:8082/api/freight';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Get all operations
  getFreightTypes(): Observable<freight[]> { 
    if (this.cachedFreightTypes) {
      return of(this.cachedFreightTypes); // Return cached data
    }
    return this.httpClient.get<freight[]>(this.REST_API).pipe(
      tap((data: freight[]) => this.cachedFreightTypes = data), // Cache the data
      catchError(this.handleError)
    );
  }
  

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
export interface freight{
  freight_type:string;
}
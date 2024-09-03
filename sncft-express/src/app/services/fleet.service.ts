import { Injectable } from '@angular/core';
import { fleet } from './fleet';
import { rig } from './fleet';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private cachedFleet: fleet[] | null = null; // Cache for all operations
  private rigCache: Map<number, rig> = new Map(); // Cache for individual operations

  REST_API: string = 'http://localhost:8082/api/fleet';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  getHoleFleet(): Observable<fleet[]> { 
    if (this.cachedFleet) {
      return of(this.cachedFleet); // Return cached data
    }
    return this.httpClient.get<fleet[]>(this.REST_API).pipe(
      tap((data: fleet[]) => this.cachedFleet = data), // Cache the data
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

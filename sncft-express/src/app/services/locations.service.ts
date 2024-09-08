import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private cachedLocations: location[] | null = null;

  REST_API: string = 'http://localhost:8082/api/locations';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  getLocations():Observable<location[]>{
    if(this.cachedLocations){
      return of(this.cachedLocations);
    }
    return this.httpClient.get<location[]>(this.REST_API).pipe(
      tap((data: location[]) => this.cachedLocations = data), // Cache the data
      catchError(this.handleError))
  }

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

export interface location{
  id:number;
  location_name:string;
}

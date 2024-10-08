import { Injectable } from '@angular/core';
import { Operation, OperationDetail } from './operations';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  public cachedOperations: Operation[] | null = null; // Cache for all operations
  private operationCache: Map<number, OperationDetail> = new Map(); // Cache for individual operations

  REST_API: string = 'http://localhost:8082/api/operations';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Get all operations
  getAllOperations(): Observable<Operation[]> { 
    if (this.cachedOperations) {
      return of(this.cachedOperations); // Return cached data
    }
    return this.httpClient.get<Operation[]>(this.REST_API).pipe(
      tap((data: Operation[]) => this.cachedOperations = data), // Cache the data
      catchError(this.handleError)
    );
  }

  // Get a single operation by ID
  getOperation(id: number): Observable<OperationDetail> { 
    if (this.operationCache.has(id)) {
      return of(this.operationCache.get(id)!); // Return cached data
    }
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get<OperationDetail>(API_URL).pipe(
      tap((res: OperationDetail) => this.operationCache.set(id, res)), // Cache the data
      map((res: OperationDetail) => res || {} as OperationDetail),
      catchError(this.handleError)
    );
  }

  deleteOperation(id?:number):Observable<any>{
    if(id){
      return this.httpClient.delete(`${this.REST_API}/${id}`);
    }
    return throwError('id type missmatch');
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

import { Injectable } from '@angular/core';
import { Operation } from './operations';
import { catchError,map } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  REST_API:string ='http://localhost:8082/api/operations';
  httpHeaders= new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient) { }

  getAllOperations():Observable<any>{ 
    return this.httpClient.get(this.REST_API);
  }

  getOperation(id:any):Observable<any>{ 
    let API_URL= `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL).pipe(map(
      (res:any)=>{
        return res || {}
      }
    ),
    catchError(this.handleError)
  );
  }


//error handling//-------------------------------------------------------------------

  handleError(error:HttpErrorResponse){
    let errorMessage= '';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }
    else{
      errorMessage=`Error message Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}

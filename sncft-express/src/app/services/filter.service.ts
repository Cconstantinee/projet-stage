import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private REST_API = 'http://localhost:8082/api'; // Replace with your API URL

  constructor(private httpClient: HttpClient) { }

  // Method to send form data
  sendFormData(formData?: any, isTimeRangeOn?: boolean): Observable<any> {
    let fullUrl: string;
    let queryParams = new URLSearchParams();
  
    if (formData) {
      // Check if 'date' key should be used
      if (formData.date && !isTimeRangeOn) {
        
        const dateOnly = formData.date; 
        const isoDate = new Date(Date.UTC(dateOnly.getFullYear(), dateOnly.getMonth(), dateOnly.getDate())).toISOString();
        queryParams.append('date', isoDate);

        console.log(formData.date,'--->',isoDate);
      } else if (isTimeRangeOn && formData.date_range) {
        // Convert and append date range parameters
        if (formData.date_range.start) {
          queryParams.append('date_range[start]', new Date(formData.date_range.start).toISOString());
        }
        if (formData.date_range.end) {
          queryParams.append('date_range[end]', new Date(formData.date_range.end).toISOString());
        }
        console.log('time range on?:',isTimeRangeOn);
      }
  
      // Add other form data as query parameters, checking for null or empty values
      Object.keys(formData).forEach(key => {
        if (key !== 'date_range' && key!=='date' && formData[key]) {
          if (Array.isArray(formData[key])) {
            // Handle array parameters (like freight[]), appending each value
            formData[key].forEach((value: any) => {
              queryParams.append(`${key}[]`, value);
            });
          } else {
            // Add single value parameters
            queryParams.append(key, formData[key].toString());
          }
        }
      });
  
      // Build the full API URL with query parameters
      fullUrl = `${this.REST_API}/operations?${queryParams.toString()}`;
      console.log('Constructed URL with query parameters:', fullUrl);
  
      // Make the GET request with query parameters
      return this.httpClient.get<any>(fullUrl);
    } else {
      // If no formData is provided, call the normal API URL without any parameters
      fullUrl = `${this.REST_API}/operations`;
      console.log('Constructed URL without query parameters:', fullUrl);
      
      // Make the GET request without query parameters
      return this.httpClient.get<any>(fullUrl);
    }
  }
  

  
  
}

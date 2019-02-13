import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { 
    
  }

  // API tp get all the user's repos
  getUserRepos (user: any): Observable<any> {
    return this.http.get(`https://api.github.com/users/${user.userName}/repos`)
    .pipe(
      catchError(this.handleError)
    );
  }
  // Api to get details of particular repo of the user
  getUserReposDetails (user: any): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${user.userName}/${user.repo}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

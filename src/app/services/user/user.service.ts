import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {API_URL} from "../../env/endpoint";
import {User} from "../../interfaces/user";
import {MessagesService} from "../messages.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessagesService) {}

    addUser(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/usuario/register', user)
      .pipe(
        tap(() => this.messageService
          .updateNotification('Cuenta creada satisfactoriamente, revisa tu correo electronico')),
        catchError(this.handleError<User>('addUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch(error.status){
        case 401:
          this.log('No autorizado', 'red')
          break;
        case 500:
          this.log(`${operation} failed: ${error.message}`, 'red')
          break;
        default:
          this.log(`${operation} failed: ${error.message}`, 'red')
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log (message: string, color: string = 'red') {
    this.messageService.updateNotification(`UserService: ${message}`, color)
  }

  getUser(): Observable<User> {
    return this.http.get<User>(API_URL + '/usuario')
      .pipe(
        tap(() => this.log('fetched user')),
        catchError(this.handleError<User>('getUser '))
      );
  }
}

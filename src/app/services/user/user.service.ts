import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {API_URL} from "../../env/endpoint";
import {User} from "../../interfaces/user";
import {MessagesService} from "../messages.service";
import {Login} from "../../interfaces/login";
import {Token} from "../../interfaces/token";

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
      console.log(error)
      switch(error.status){
        case 401:
          this.log(error.message, 'red')
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
  private log (message: string, color: string = 'green') {
    this.messageService.updateNotification(`UserService: ${message}`, color)
  }



  getUser(): Observable<User> {
    return this.http.get<User>(API_URL + '/usuario')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<User>('getUser '))
      );
  }
  getVerificationCode(signedUrl: string): Observable<string> {
    return this.http.get<string>(signedUrl).pipe(
      tap(() => this.log('fetched verification code')),
      catchError(this.handleError<string>('getVerificationCode'))
    )
  }

  verifyCode(verification_url: string, codigo: string): Observable<string | object> {
    return this.http.post<string | object>(verification_url, {'codigo': codigo}).
    pipe(
      tap(() => this.messageService
        .updateNotification('Cuenta verificada satisfactoriamente')),
      catchError(this.handleError<string>('getVerificationCode'))
    )
  }

  login(request: Login): Observable<Token> {
    return this.http.post<Token>(API_URL + '/usuario/login', request)
      .pipe(
        tap(() => this.log('login')),
        catchError(this.handleError<Token>('login'))
      )
  }


}

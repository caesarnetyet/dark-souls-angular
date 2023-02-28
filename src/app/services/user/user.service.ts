import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {API_URL} from "../../env/endpoint";
import {User} from "../../interfaces/user";
import {MessagesService} from "../messages.service";
import {Login} from "../../interfaces/login";
import {Token} from "../../interfaces/token";
import {Message} from "../../interfaces/notification";
import {Model} from "../../interfaces/model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessagesService) {}

  addUser(user: User): Observable<Message> {
    return this.http.post<Message>(API_URL + '/user', user)
      .pipe(
        catchError((errorResponse) => {
          let message: Message;
          if (errorResponse.error && errorResponse.error.message) {
            message = { message: errorResponse.error.message };
          } else if (errorResponse.error && errorResponse.error.error) {
            message = { error: errorResponse.error.error };
          } else {
            message = { message: 'An error occurred while processing your request.' };
          }
          return of(message);
        }),
        tap((message) => this.messageService.updateNotification(message))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      switch(error.status){
        case 401:
          this.log(`${operation}`, 'red')
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



  getUser(): Observable<Model<User>> {
    return this.http.get<Model<User>>(API_URL + '/user')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Model<User>>('getUser '))
      );
  }
  getVerificationCode(signedUrl: string): Observable<any> {
    return this.http.get<string>(signedUrl).pipe(
      tap(() => this.log('fetched verification code')),
      catchError(this.handleError<any>('getVerificationCode'))
    )
  }

  verifyCode(verification_url: string, codigo: string): Observable<string | object> {
    return this.http.post<string | object>(verification_url, {'code': codigo}).
    pipe(
      tap(() => this.messageService
        .updateNotification('Cuenta verificada satisfactoriamente')),
      catchError(this.handleError<string>('getVerificationCode'))
    )
  }

  login(request: Login): Observable<Token> {
    return this.http.post<Token>(API_URL + '/user/login', request)
      .pipe(
        tap(() => this.log('login')),
        catchError(this.handleError<Token>('login'))
      )
  }


}

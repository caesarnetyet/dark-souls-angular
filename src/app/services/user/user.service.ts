import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { API_URL } from '../../env/endpoint';
import { User } from '../../interfaces/user';
import { MessagesService } from '../messages.service';
import { Login } from '../../interfaces/login';
import { Token } from '../../interfaces/token';
import { Message } from '../../interfaces/notification';
import { Model } from '../../interfaces/model';
import {socket} from "../../env/socket";
@Injectable({
  providedIn: 'root',
})
export class UserService {

  

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {}




  addUser(user: User): Observable<Message> {
    return this.http.post<Message>(API_URL + '/user', user).pipe(
      tap((message) => this.messageService.updateNotification(message)),
      catchError(
        this.handleError<Message>('addUser', {
          message: 'Error al crear usuario',
        })
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
    
      this.log(JSON.stringify(error.error.errors[0].message), 'red');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string | Message, color: string = 'green') {
    this.messageService.updateNotification(message, color);
  }

  getUser(): Observable<Model<User>> {
    return this.http.get<Model<User>>(API_URL + '/user').pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError<Model<User>>('getUser '))
    );
  }
  getVerificationCode(signedUrl: string): Observable<any> {
    return this.http.get<string>(signedUrl).pipe(
      tap(() => this.log('Codigo de verificacion enviado')),
      catchError(this.handleError<any>('getVerificationCode'))
    );
  }

  verifyCode(
    verification_url: string,
    codigo: string
  ): Observable<string | object> {
    return this.http
      .post<string | object>(verification_url, { code: codigo })
      .pipe(
        tap(() =>
          this.messageService.updateNotification(
            'Cuenta verificada satisfactoriamente'
          )
        ),
        catchError(this.handleError<string>('getVerificationCode'))
      );
  }

  login(request: Login): Observable<Token> {
    return this.http.post<Token>(API_URL + '/user/login', request).pipe(
      tap(() => this.log('login')),
      catchError(this.handleError<Token>('login'))
    );
  }

  genericRequest(path: string, method: string, body: object): Observable<any> {
    console.log(path, method, body);
    return this.http.request(method, API_URL+path, { body: body }).pipe(
      tap(() => this.log('Accion Realizada')),
      catchError(this.handleError<any>('generic request'))
    );
  }

  delete(delete_url: string): Observable<any> {
    return this.http.delete<any>(API_URL+delete_url).pipe(
      tap(() => this.log('delete')),
      catchError(this.handleError<any>('delete'))
    );
  }

  getUsers(): Observable<Model<User>[]> {
    return this.http.get<Model<User>[]>(API_URL + '/users').pipe(
      tap(() => this.log('fetched users')),
      catchError(this.handleError<Model<User>[]>('getUsers', []))
    );
  }

  getRoles(): Observable<{ id: number; name: string }[]> {
    return this.http
      .get<{ id: number; name: string }[]>(API_URL + '/roles')
      .pipe(
        catchError(
          this.handleError<{ id: number; name: string }[]>('getRoles', [])
        )
      );
  }
}

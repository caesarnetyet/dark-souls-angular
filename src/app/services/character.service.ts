import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Model} from "../interfaces/model";
import {Character} from "../interfaces/character";
import {MessagesService} from "./messages.service";
import {API_URL} from "../env/endpoint";
import {HttpClient} from "@angular/common/http";
<<<<<<< HEAD
import {Class} from "../interfaces/class";
import {Character} from "../interfaces/character";
import {Classes} from "../interfaces/classes";
=======
>>>>>>> 26e0b01131e65c1b8d3bd1979138df062c2fc0f0

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private messageService: MessagesService, private http: HttpClient) {}

  getCharacters(): Observable<Model<Character>[]>{
    return this.http.get<Model<Character>[]>(API_URL + '/characters')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Model<Character>[]>('getCharacters'))
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

<<<<<<< HEAD
  getClass():Observable<Class[]> {
    return this.http.get<Class[]>(API_URL + '/clases')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Class[]>('getClasses'))
      );
  }

  getClasses() {
    return this.http.get<Model<Classes>[]>(API_URL + '/clases/classes')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Model<Classes>[]>('getClasses'))
      );
  }
=======
>>>>>>> 26e0b01131e65c1b8d3bd1979138df062c2fc0f0
}

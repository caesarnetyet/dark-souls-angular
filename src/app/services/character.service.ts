import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Model} from "../interfaces/model";
import {CharacterData} from "../interfaces/characterData";
import {MessagesService} from "./messages.service";
import {API_URL} from "../env/endpoint";
import {HttpClient} from "@angular/common/http";
import {Class} from "../interfaces/class";
import {Character} from "../interfaces/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private messageService: MessagesService, private http: HttpClient) {}



  addCharacter(character: CharacterData): Observable<Model<CharacterData>> {
    return this.http.post<Model<CharacterData>>(API_URL + '/personajes', character)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Model<CharacterData>>('addCharacter'))
      );
  }
  getCharacters(): Observable<Model<Character>[]>{
    return this.http.get<Model<Character>[]>(API_URL + '/personajes')
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
  private log (message: string, color: string = 'green') {
    this.messageService.updateNotification(`UserService: ${message}`, color)
  }

  getClasses():Observable<Class[]> {
    return this.http.get<Class[]>(API_URL + '/clases')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Class[]>('getClasses'))
      );
  }
}

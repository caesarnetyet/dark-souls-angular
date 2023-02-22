import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Model} from "../interfaces/model";
import {Character} from "../interfaces/character";
import {LIST_CHARACTERS} from "../mock/listCharacters";
import {MessagesService} from "./messages.service";
import {API_URL} from "../env/endpoint";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private messageService: MessagesService, private http: HttpClient) {}

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

}

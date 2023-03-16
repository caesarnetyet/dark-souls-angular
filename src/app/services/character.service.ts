import {ApplicationRef, ChangeDetectorRef, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, Subject, tap} from "rxjs";
import {Model} from "../interfaces/model";
import {MessagesService} from "./messages.service";
import {API_URL} from "../env/endpoint";
import {HttpClient} from "@angular/common/http";
import {Class} from "../interfaces/class";
import {Character} from "../interfaces/character";
import {Classes} from "../interfaces/classes";
import {socket } from "../env/socket";

@Injectable({
  providedIn: 'root'
})


export class CharacterService {


  characters: BehaviorSubject<Model<Character>[]> = new BehaviorSubject<Model<Character>[]>([])
  classes: BehaviorSubject<Model<Classes>[]> = new BehaviorSubject<Model<Classes>[]>([])

  constructor(private messageService: MessagesService, private http: HttpClient) {

  }

  listenSocket(){

    socket.on('updateCharacter', (data: any) => {
      console.log(data)
      console.log(this)
      this.characters.next(data)
    })
  }

  getCharacters(): Observable<Model<Character>[]> {
    const source = new EventSource(API_URL+ "/addclass");
    source.addEventListener('new:class', (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
    });
    return this.http.get<Model<Character>[]>(API_URL + '/characters')
      .pipe(
        tap((data) => this.characters.next(data)),
        catchError(this.handleError<Model<Character>[]>('getCharacters'))
      );
  }

  addCharacter(character: Character): Observable<Model<Character>> {
    return this.http.post<Model<Character>>(API_URL + '/character', character)
      .pipe(
        tap(() => {
          this.updateCharacters()
  }),
        catchError(this.handleError<Model<Character>>('addCharacter'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      switch (error.status) {
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

  private log(message: string, color: string = 'green') {
    this.messageService.updateNotification(`UserService: ${message}`, color)
  }

  getClass(): Observable<Class[]> {
    return this.http.get<Class[]>(API_URL + '/class')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError<Class[]>('getClasses'))
      );
  }

  updateCharacters() {
    this.getCharacters().subscribe((data) => {
      this.characters.next(data)
    }
    )
  }

  getClasses() {
    return this.http.get<Model<Classes>[]>(API_URL + '/classes')
      .pipe(
        tap((data) => this.classes.next(data)),
        catchError(this.handleError<Model<Classes>[]>('getClasses'))
      );
  }


  updateClasses() {
    this.getClasses().subscribe((data) => {
      this.classes.next(data)
    })
  }
}

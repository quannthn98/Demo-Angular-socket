import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserToken} from '../interface/user-token';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserToken> {
    return this.http.post<UserToken>('http://localhost:8080/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }


}

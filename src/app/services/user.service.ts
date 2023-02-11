import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, take } from 'rxjs';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8080/api/user';
  private currentUser = {} as User;

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
  public user$ = this.userSubject.asObservable();

  constructor(public ui: UiService, public http:HttpClient) {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email !== null && password !== null) {
      this.getUserByEmailAndPassword(email, password);
    }
   }

  //Create
  public createUser(newUser: User): void{
    this.http.post<User>(this.url, newUser)
    .pipe(take(1))
    .subscribe({
      next: user => {
        this.userSubject.next(user);
        this.ui.openSnackBar(`Welcome ${user.username}!`);
      },
      error: err => {
        console.error(err);
        this.ui.onError(err);
      }
    });
  }

  //Read
  public getUserByEmailAndPassword(email: string, password: string): void{
    this.http.get<User>(`${this.url}/email/${email}/pass/${password}`)
    .pipe(take(1))
    .subscribe({
      next: user => {
        this.currentUser = user;
        this.ui.onValidLogin(user);
        this.userSubject.next(this.currentUser);
        this.ui.openSnackBar(`Welcome back ${this.currentUser.username}!`);
      },
      error: err => {
        console.error(err);
        this.ui.onError(err);
      }
    });
  }

  //Update

  //Delete

}

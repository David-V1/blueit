import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UiService  {

  constructor(public http: HttpClient, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  public onValidLogin(loginData: User): void {
    localStorage.setItem('email', loginData.email);
    localStorage.setItem('password', loginData.password);
  }

  public onLogout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  public onError(msg: string): void {
    this._snackBar.open(msg, undefined, {
      duration: 3000
    })
  }

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, "close", {
      duration: 4000
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UiService } from './ui.service';
import { PageName } from '../enums/PageEnum';
import { Community } from '../models/Community';
import { Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService implements OnInit {
  pageName = PageName;
  url: string = 'http://localhost:8080/b';

  private communites: Subject<Community[]> = new Subject<Community[]>();
  public communities$ = this.communites.asObservable();

  private community: Subject<Community> = new Subject<Community>();
  public community$ = this.community.asObservable();

  constructor(public ui: UiService, private http: HttpClient ) {
    this.getAllCommunities();
   }

  ngOnInit(): void {
  }

  // Create
  public createCommunity(community: Community): void {
    this.http.post<Community>(`${this.url}`, community).pipe(take(1))
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Community created successfully');
        this.getAllCommunities();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // Read
  public getAllCommunities(): void {
    this.http.get<Community[]>(`${this.url}`).pipe(take(1))
    .subscribe({
      next: (communities) => {
        this.communites.next(communities);
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error getting communities');

      }
    });
  }

  public getCommunityById(id: number): void{
    this.http.get<Community>(`${this.url}/${id}`).pipe(take(1))
    .subscribe({
      next: (community) => {
        this.community.next(community);
        this.getAllCommunities();
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error getting community');

      }
    });
  }

  public getCommunityByName(name: string): void{
    this.http.get<Community>(`${this.url}/${name}`).pipe(take(1))
    .subscribe({
      next: (community) => {
        this.community.next(community);
        this.getAllCommunities();
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error getting community');

      }
    });
  }

  // Update

  // Delete

}

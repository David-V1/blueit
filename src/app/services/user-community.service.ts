import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Community } from '../models/Community';
import { BehaviorSubject, switchMap, take } from 'rxjs';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class UserCommunityService {
  url: string = 'http://localhost:8080/api/u_community';
  
  private isMemberSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMemberObservable$ = this.isMemberSubject.asObservable();

  private membersSubject = new BehaviorSubject<number>(0);
  public members$ = this.membersSubject.asObservable();

  constructor(private ui: UiService, private http: HttpClient) { }
  


  //TODO: Add method to leave Community. BTN must reflect the current community status.
  // Create
  public joinCoummunity(community: Community): void {
    const user = this.ui.currentUserId;
    this.http.post<void>(`${this.url}/join_community/u/${user}/b/${community.id}`, null).pipe(take(1))
    .subscribe({
      next: () => {
      this.ui.openSnackBar('Joined Community');

      if (community.id) {
        this.getNumberOfMembers(community.id);
        this.isMemberSubject.next(true);
      }
      
    },
    error: () => {
      this.ui.onError('Already a member of this community');
    }})
  }

  // Read
  public getNumberOfMembers(communityId: Number): void {
    this.http.get<number>(`${this.url}/members/${communityId}`).pipe(take(1))
    .subscribe({
      next: (numOfMembers) => {
        this.membersSubject.next(numOfMembers);
      },
      error: () => {
        console.error('Error getting number of members');
        this.ui.onError('Oops! Something went wrong');
      }
    })
  }

  public getIsMember(communityId: Number): void {
    const user = this.ui.currentUserId;
    this.http.get<boolean>(`${this.url}/is_member/u/${user}/b/${communityId}`).pipe(take(1))
    .subscribe({
      next: (isMember) => {
        this.isMemberSubject.next(isMember);
        console.log('isMember ',isMember);
      },
      error: () => {
        console.error('Error getting number of members');
        this.ui.onError('Oops! Something went wrong');
      }
    })
  }

  // Update

  // Delete
  public leaveCommunity(community: Community): void {
    const user = this.ui.currentUserId;
    this.http.delete<void>(`${this.url}/leave_community/u/${user}/b/${community.id}`).pipe(take(1))
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Left Community');
        if (community.id) {
          this.getNumberOfMembers(community.id);
          this.isMemberSubject.next(false);
        }
      },
      error: () => {
        this.ui.onError('Error leaving community');
      }
    })
  }
}

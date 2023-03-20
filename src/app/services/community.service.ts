import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UiService } from './ui.service';
import { PageName } from '../enums/PageEnum';
import { Community } from '../models/Community';
import { BehaviorSubject, catchError, Observable, of, retry, Subject, switchMap, take, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UserCommunityService } from './user-community.service';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class CommunityService implements OnInit {
  pageName = PageName;
  url: string = 'http://localhost:8080/b';
  menuItems: MenuItem[] = [];
  communityMenuItems = {} as MenuItem;
  selectedCommunityId = Number(localStorage.getItem('selectedCommunityId'))

  private communitites: Subject<Community[]> = new Subject<Community[]>();
  public communities$ = this.communitites.asObservable();

  private communitySubject: Subject<Community> = new Subject<Community>();
  public community$ = this.communitySubject.asObservable();

  private selectedComunnitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.selectedCommunityId);
  public selectedCommunity$: Observable<number> = this.selectedComunnitySubject.asObservable();

  private communityDescriptionSubject: Subject<string> = new Subject<string>();
  public communityDescription$ = this.communityDescriptionSubject.asObservable();

  private navbarMenuSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>(this.menuItems);
  public navbarMenu$ = this.navbarMenuSubject.asObservable();

  constructor(public ui: UiService, private http: HttpClient, private userCommunityService: UserCommunityService) {
    this.getAllCommunities();
    // persist community view
    if (this.selectedCommunityId !== null || this.selectedCommunityId !== 0) {
      this.onCommunitySelection(this.selectedCommunityId);
    }
      
   }

  ngOnInit(): void {
  }

  
  public imageFormData(community: Community): FormData {
    const formData = new FormData();

    if (!community.logo) {
      this.ui.onError('Please select a logo');
      return formData;
    }
    // formData.append('community',
    // new Blob([JSON.stringify(community)], {type: 'application/json'}));

    formData.append('imageFile', community.logo.file, community.logo.file.name,);
    
    return formData;
  }


  // Create

  public createCommunity(community: Community, admin: string): void {
    this.http.post<Community>(`${this.url}/admin/${admin}`, community).pipe(take(1))
    .subscribe({
      next: () => {
        //TODO: Fix this
        // this.getAllCommunities();
        location.reload();
      },
      error: (err) => {
        console.log(err);
        this.ui.openSnackBar('Error creating community');
      }
    });
  }

  // Community object for Nav Bar
  public navbarCommunities(): MenuItem[] {
    this.getAllCommunities();
    this.communitites.pipe(take(1), retry(3))
    .subscribe((communities) => {
      this.menuItems = [...communities.map((community) => {
        return {
          label: community.name,
          icon: 'pi pi-fw pi-home',
          command: () => {
            if (!community.id) {
              this.ui.onError('Invalid community id');
            }
            this.onCommunitySelection(community.id!);
            this.ui.changePage(this.pageName.COMMUNITY_PAGE);
            
          }
        }
      })]
    });
    return this.menuItems;
  }

  public addCommunityLogo(imageFile:Community): void {
    if (imageFile.logo === undefined) {
      this.ui.onError('Please select a logo');
      return;
    }
    const comId = this.selectedCommunityId;
    const image = this.imageFormData(imageFile);
    
    this.http.post<Community>(`${this.url}/upload/${comId}`, image).pipe(take(1))
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Logo added');
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error adding logo');
      }
    });
  }

  public addDescription(id:number ,description: string): void {
    if (!id) {
      this.ui.onError('Oops! Something went wrong');
      return;
    }
    this.http.post<string>(`${this.url}/description/${id}`, description).pipe(take(1))
    .subscribe({
      next: () => {
        this.selectedComunnitySubject.next(id);
        this.ui.openSnackBar('Description added');
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error adding description');
      }
    });
  }

  // Read
  public getAllCommunities(): void {
    this.http.get<Community[]>(`${this.url}`).pipe(take(1))
    .subscribe({
      next: (communities) => {
        this.communitites.next(communities);
      },
      error: (err) => {
        console.error(err);
        this.ui.openSnackBar('Error getting communities');

      }
    });
  }

  public onCommunitySelection(id: number): void {
    console.log('onCommunitySelection RAN!')
    if (!id) {
      this.ui.onError('No community selected');
      return;
    }
    localStorage.setItem('selectedCommunityId', id.toString())
    this.selectedComunnitySubject.next(id);
    this.userCommunityService.getNumberOfMembers(id);
  }
  
  public selection$ = this.selectedCommunity$.pipe(
    switchMap((communityId: number | null) => this.http.get<Community>(`${this.url}/comId/${communityId}`)),
    catchError((err) => {
      console.error(err);
      this.ui.openSnackBar('Error getting community');
      return of(err);
    }),
    retry(1),
  );

  public onCommunityDescriptionChange(description: string): void {
    this.communityDescriptionSubject.next(description);
  }

  communityPosts$ = this.selectedCommunity$.pipe(
    switchMap((communityId: number) => this.http.get<Post[]>(`http://localhost:8080/api/post/community/${communityId}`)),
    take(1),
    tap((posts) => console.log(posts)),
    catchError((err) => {
      console.error(err);
      this.ui.openSnackBar('Error getting posts');
      return of(err);
    }),
    retry(1),
  );

  // Update

  // Delete

}

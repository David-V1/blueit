import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { PageName } from 'src/app/enums/PageEnum';
import { User } from 'src/app/models/User';
import { FileHandler } from 'src/app/models/FileHandler';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  pageName = PageName;
  file: File | null = null;
  uploadedFiles: any[] = [];

  user: User ={
    id: this.ui.currentUserId,
    username: '',
    email: '',
    password: '',
    imageName: '',
    imgType: '',
    // profilePicture: '',
    profilePicture: null,
    // profilePic: null,
  }

  constructor(public ui: UiService, public userService: UserService, private sanitizer: DomSanitizer) { }
  // TODO: Need to add pictures to profile
  //TODO: CRUD for profile
  
  public onUploadPic(event: any){
    if (event.currentFiles){
      const file = event.currentFiles[0];
      const fileHandle: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.user.profilePicture = fileHandle;
      console.log('fileHandle',fileHandle)
      console.log('user.profilePicture: ',this.user.profilePicture)
    }
  }

  public addNewProfilePic(): void {
    this.userService.addProfilePic(this.user)
  }

 
  test(){
    this.userService.user$.subscribe(user => {
      console.log(user)
    });
    console.log('USER THIS: ',this.user)
  }
}

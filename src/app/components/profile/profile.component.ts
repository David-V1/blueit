import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { PageName } from 'src/app/enums/PageEnum';
import { User } from 'src/app/models/User';
import { FileHandler } from 'src/app/models/FileHandler';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

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
    profilePicture: null,
  }

  constructor(public ui: UiService, public userService: UserService, private sanitizer: DomSanitizer, public commentService: CommentService, public postService: PostService) { }
  
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
    location.reload();
  }

 
  test() {
    console.log('test ran!')
    // this.userService.user$.subscribe(user => {
    //   console.log(user)
    // });
    // this.postService.getAllPostByUserId(this.ui.currentUserId!)
    this.postService.getAllPosts();
    // this.postService.posts$.subscribe(x => console.log(x))
    this.postService.userPosts$.subscribe(x => console.log(x))

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Post } from '../models/Post';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = 'http://localhost:8080/api/post';
  public postUrl: string = 'http://localhost:8080/api/post/create';

  constructor(private http: HttpClient, private ui: UiService) { }

  public prepareFormData(post: Post): FormData {
    // Preparing the post {} and the image[] to be sent to the backend
    const formData = new FormData();
    
    formData.append(
      'post',
      new Blob([JSON.stringify(post)], { type: 'application/json' })  
    );
    for(let i = 0; i < post.image.length; i++) {
      formData.append('imageFile', post.image[i].file, post.image[i].file.name);
    }
    return formData;
  }

  //Create
  public createPost(post: FormData): void{
    this.http.post<Post>(this.postUrl+"/"+this.ui.currentUserId, post)
    .subscribe({
      next: () => {
        this.ui.openSnackBar('Post created successfully');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Read

  //Update

  //Delete
}

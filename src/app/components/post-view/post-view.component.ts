import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent {

  constructor(public postService: PostService) {
    this.postService.getPostById(this.postService.currentPostId);
   }

  test(){
  }

}

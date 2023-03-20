import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import {PostComponent} from './components/post/post.component';
import {ProfileComponent} from './components/profile/profile.component';
import { CommunityComponent } from './components/community/community.component';
import { CommunitySearchComponent } from './components/community-search/community-search.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { CommentComponent } from './components/comment/comment.component';

//PrimeNG
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { VotingComponent } from './components/voting/voting.component';
import { ProfileCommentsComponent } from './components/profile-comments/profile-comments.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { CommunityPageComponent } from './components/community-page/community-page.component';
import { CommunityAboutComponent } from './components/community-about/community-about.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CommunityPostComponent } from './components/community-post/community-post.component';
import { CommunityPageHeaderComponent } from './components/community-page-header/community-page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    PostComponent,
    ProfileComponent,
    CommunityComponent,
    CommunitySearchComponent,
    PostCardComponent,
    PostViewComponent,
    CommentComponent,
    CommentCardComponent,
    VotingComponent,
    ProfileCommentsComponent,
    ProfilePostsComponent,
    CommunityPageComponent,
    CommunityAboutComponent,
    CommunityPostComponent,
    CommunityPageHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    DividerModule,
    RippleModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    SelectButtonModule,
    EditorModule,
    FileUploadModule,
    DropdownModule,
    CarouselModule,
    CardModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

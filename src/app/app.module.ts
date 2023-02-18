import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';

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
import {PostComponent} from './components/post/post.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import { CommunityComponent } from './components/community/community.component';
import { CommunitySearchComponent } from './components/community-search/community-search.component';
import { PostCardComponent } from './components/post-card/post-card.component';


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
    PostCardComponent
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
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

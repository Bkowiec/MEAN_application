import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component'
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import {GameComponent} from "./components/game/game.component";
import {Camera} from "./game/camera";
import {ShapeDrawer} from "./game/shape.drawer";
import {GameMenuComponent} from "./components/game/game-menu/game.menu.component";
import {GameEndComponent} from "./components/game/game-end/game.end.component";
import {GameScoreService} from "./services/game.score.service";
import {GameScoreComponent} from "./components/game-score/game.score.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent,
    GameComponent,
    GameMenuComponent,
    GameEndComponent,
    GameScoreComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, BlogService, Camera, ShapeDrawer, GameScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

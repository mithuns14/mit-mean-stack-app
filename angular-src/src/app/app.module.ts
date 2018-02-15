import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import  {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import {ValidateService} from './services/validate.service'
import { FlashMessagesModule } from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {HttpModule} from '@angular/http';
import {AuthenticationGuard} from './guards/auth.guard';
const appRoutes:Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthenticationGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthenticationGuard]}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
   RouterModule.forRoot(appRoutes),
   FormsModule,
   FlashMessagesModule.forRoot(),
   HttpModule
  ],
  providers: [ValidateService,AuthService,AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

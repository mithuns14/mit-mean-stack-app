import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt'
@Injectable()
export class AuthService {

  authToken:any;
  user:any;
  constructor(private http:Http) { }

  registerUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register',user,{headers:headers}).map(res=>res.json());
  }
  authenticateUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate',user,{headers:headers}).map(res=>res.json());
  }
  storeUserData(token,user){
    sessionStorage.setItem('id_token',token);
    sessionStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  logOut(){
    this.authToken=null;
    this.user=null;
    sessionStorage.clear();
  }
  getProfile(){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    debugger
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile',{headers:headers}).
    map(res=>res.json());
  }

  loadToken(){
    const token=sessionStorage.getItem('id_token');
    this.authToken=token;
  }
  isLoggedIn(){
    debugger
    if(sessionStorage.getItem('id_token')!=null){
      return true;
    }else{
      return false;
    }
  }

}

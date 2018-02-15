import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private valService:ValidateService,
    private flashMsg: FlashMessagesService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onLogOut(){
    this.authService.logOut();
    this.flashMsg.show('You are logged out..!!',{cssClass:'alert-success',timeout:3000}); 
    this.router.navigate(['login']);
    return false;
  }
  

}

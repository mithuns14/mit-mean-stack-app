import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private valService:ValidateService,
    private flashMsg: FlashMessagesService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  submitForm(loginForm){

    this.authService.authenticateUser(loginForm).subscribe((data)=>{
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashMsg.show('You are logged in',{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['dashboard']);
      }else{
          this.flashMsg.show(''+data.msg,{cssClass:'alert-danger',timeout:3000});
          this.router.navigate(['login']);
      }
    })
  }

  

}

import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private valService:ValidateService,
  private flashMsg: FlashMessagesService,
  private authService:AuthService,
  private router:Router) { }  
  ngOnInit() {
  }
  submitForm(registerForm){

      console.log(registerForm);
      const user={
        name:registerForm.name,
        username:registerForm.username,
        email:registerForm.email,
        password:registerForm.password
      }

      if(!this.valService.validateRegister(registerForm)){
        //alert('Please fill all the Fields');
        this.flashMsg.show('Please fill all form Fields',{ cssClass: 'alert-warning', timeout: 3000 });
        
      }

      else if(!this.valService.validateEmail(registerForm.email)){
        //alert('Please use a valid email');
        this.flashMsg.show('Please use a valid email',{ cssClass: 'alert-warning', timeout: 3000 });
        
      }

      if(this.valService.getValidStatus()){
        //alert('Form Valid');
        this.flashMsg.show('Form Valid',{ cssClass: 'alert-success', timeout: 3000 });
        this.registerUser(user);
      }else{
        //alert('Form Invalid');
        this.flashMsg.show('Form Invalid',{ cssClass: 'alert-warning', timeout: 3000 });
      }

      

  }

  registerUser(user){
     this.authService.registerUser(user).subscribe((resultData)=>{
       debugger
        if(resultData.success){
          this.flashMsg.show('You are Registred',{ cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        }else{
          this.flashMsg.show(''+resultData.msg,{ cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
     });
    
  }



}

import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  validForm:boolean=true;
  constructor() { }

  validateRegister(user){
    
    if(user.name ==undefined || user.username ==undefined || user.email==undefined || user.password==undefined){
      this.validForm=false;
      return false;
    }else{
      this.validForm=true;
      return true;
    }
  }

  validateEmail(email){
    
    const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.validForm=re.test(email);
  }

  getValidStatus(){
    debugger
    return this.validForm;
  }

}

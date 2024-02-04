import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email=new FormControl("",Validators.required);
    password=new FormControl("",Validators.required);
    loading:boolean=false;
    error?:string;
    isError:boolean=false;

    constructor(private router:Router,private loginService:LoginService){

    }

    login(){
      this.isError=false;
      this.loading=true;
      if(!this.email.valid || !this.password.valid){
        this.isError=true;
        this.loading=false;
        this.error="Sikertelen bejelentkezés!";
        return;
      }
      this.loginService.loginWithEmailAndPassword(this.email.value!,this.password.value!).then(cred => {
        this.router.navigateByUrl("/main");
      }).catch(error => {
        this.isError=true;
        this.error="Sikertelen bejelentkezés!";
      }).finally(()=>{
        this.loading=false;
      });
    }
}

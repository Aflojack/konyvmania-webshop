import { User } from './../../shared/models/user';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { UserDatabaseService } from 'src/app/shared/services/user-database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  regisztracio=new FormGroup({
    email:new FormControl('',Validators.required),
    jelszo:new FormControl('',[Validators.required,Validators.minLength(6)]),
    ujraJelszo:new FormControl('',[Validators.required,Validators.minLength(6)]),
    nev:new FormGroup({
      vezeteknev:new FormControl('',Validators.required),
      keresztnev:new FormControl('',Validators.required)
    }),
    cim:new FormGroup({
      iranyitoszam:new FormControl('',[Validators.required,Validators.minLength(4)]),
      varos:new FormControl('',Validators.required),
      utcaEsHazszam:new FormControl('',Validators.required)
    })
  })

  errorArray?:Array<string>;
  error:boolean=false;

  constructor(private router:Router, private registrationService:RegistrationService, private database:UserDatabaseService){
    this.errorArray=new Array<string>();
  }

  onSubmit(){
    this.error=false;
    this.errorArray=new Array<string>();
    if(!this.isEmailCorrect()){
      this.errorArray?.push("Nem megfelelő email!");
      this.error=true;
    }
    if(!this.isJelszoCorrect()){
      this.errorArray?.push("Nem megfelelő jelszó vagy azok nem egyeznek!");
      this.error=true;
    }
    if(!this.isNevCorrect()){
      this.errorArray?.push("Nem megfelelő név!");
      this.error=true;
    }
    if(!this.isCimCorrect()){
      this.errorArray?.push("Nem megfelelő cím!");
      this.error=true;
    }
    if(this.error){
      return;
    }
    this.errorArray=new Array<string>();
    this.registrationService.registWithEmailAndPassword(this.regisztracio.get("email")!.value!, this.regisztracio.get("jelszo")!.value!).then(_=>{
          const user: User = {
            email: this.regisztracio!.get('email')!.value!,
            felhasznalonev: this.regisztracio!.get('email')!.value!.split('@')[0],
            vezeteknev: this.regisztracio!.get('nev.vezeteknev')!.value!,
            keresztnev: this.regisztracio!.get('nev.keresztnev')!.value!,
            iranyitoszam: this.regisztracio.get("cim.iranyitoszam")!.value!,
            varos: this.regisztracio.get("cim.varos")!.value!,
            utcaEsHazszam: this.regisztracio.get("cim.utcaEsHazszam")!.value!
          };
          this.database.create(user).then(_=> {
            this.router.navigateByUrl("/login");
          }).catch(_=>{
            this.errorArray?.push("Regisztráció sikertelen!");
            this.error=true;
            return;
        })
    }).catch(_=>{
      this.errorArray?.push("Regisztráció sikertelen!");
      this.error=true;
      return;
    });
  }

  reset(){
    this.regisztracio.reset();
  }

  isEmailCorrect():boolean{
    if(this.regisztracio.get("email")?.valid){
      return true;
    }
    return false;
  }

  isJelszoCorrect():boolean{
    let jelszo=this.regisztracio.get("jelszo");
    let jelszoUjra=this.regisztracio.get("ujraJelszo");
    if(jelszo?.valid && jelszoUjra?.valid && jelszo.value===jelszoUjra.value){
      return true;
    }
    return false;
  }

  isNevCorrect():boolean{
    let nev=this.regisztracio.get("nev");
    if(nev?.valid){
      return true;
    }
    return false;
  }

  isCimCorrect():boolean{
    let cim=this.regisztracio.get("cim");
    if(cim?.valid){
      return true;
    }
    return false;
  }
}

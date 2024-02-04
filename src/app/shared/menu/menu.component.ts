import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit{
  loggedInUser?: firebase.default.User|null;
  sidenav: MatSidenav|any;

  constructor(private auth:LoginService, private router:Router){

  }

  ngOnInit(){
    this.auth.isUserLoggedIn().subscribe(user=>{
      this.loggedInUser=user;
      localStorage.setItem("user",JSON.stringify(user));
    },error=>{
      console.error(error);
      localStorage.setItem("user",JSON.stringify("null"));
    });
  }

  close(){
    console.log(this.loggedInUser);
    this.sidenav.close();
  }

  onToggleSidenav(sidenav: MatSidenav){
    this.sidenav=sidenav;
    sidenav.toggle();
  }

  logout(){
    this.auth.logout().then(_=>{
      this.router.navigateByUrl("/login");
    }).catch(_=>{
      console.log(_)
    })
  }
}

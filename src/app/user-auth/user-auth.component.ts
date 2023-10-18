import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data.type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  authError:string = "";
  OpenSignUpPage:boolean = true;
  constructor(private user:UserService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  SignUp(userSignUp:SignUp){
    this.user.userSignUp(userSignUp)
  }
  login(userLogin:Login){
    this.user.userLogin(userLogin);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError = "Please enter valid user details";
      }
    })
  }
  openLogin(){
    this.OpenSignUpPage = false;
  }
  openSignUp(){
    this.OpenSignUpPage = true;
  }
}

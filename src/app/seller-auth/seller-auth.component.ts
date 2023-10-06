import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data.type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService,private router:Router){}
  
  isLoginEnabled:boolean = false;
  authError:string='';

  ngOnInit(): void {
    //this.seller.reloadSeller()
  }
  SignUp(data:SignUp):void{
    this.seller.userSignUp(data)
  }
  LogIn(data:Login):void{
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.authError = 'Email or password is incorrect';
      }
    })
  }
  openLogin(){
    this.isLoginEnabled=true;
  }
  openSignUp(){
    this.isLoginEnabled=false;
  }
}

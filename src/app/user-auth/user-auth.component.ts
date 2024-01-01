import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart } from '../data.type';
import { UserService } from '../services/user.service';
import { Product } from '../data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  authError:string = "";
  OpenSignUpPage:boolean = true;
  constructor(private user:UserService, private product:ProductService){}

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
      }else{
        this.localCartToRemoteCart();
      }
    })
  }
  openLogin(){
    this.OpenSignUpPage = false;
  }
  openSignUp(){
    this.OpenSignUpPage = true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:Product[] = JSON.parse(data);

      cartDataList.forEach((product:Product,index)=>{
        let cartData: cart={
          ...product,
          productId:product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Cart Item Stored in DB");
            }
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart')
          }
        },500);
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000);
    
  }
}

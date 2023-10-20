import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, cart } from '../data.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart:boolean = false;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
    })

    let cartData = localStorage.getItem('localCart');
    if(cartData && productId){
      let items = JSON.parse(cartData);
      items = items.filter((item:Product)=>item.id.toString() == productId)
      if(items.length){
        this.removeCart = true;
      }else{
        this.removeCart = false;
      }
    }

    let user = localStorage.getItem('user');
    if(user){
      let userId = user && JSON.parse(user);
      this.product.getCartDetails(userId)
      this.product.cartData.subscribe((result)=>{
        let items = result.filter((item:Product)=>productId?.toString() === item.productId?.toString())
        if(items.length){
          this.removeCart = true;
        }
      })
    }
  }
  handleQuantity(val: string) {
    if (val === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    } else if (val === 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id;
        let cartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartDetails(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  RemoveFromCart(productId:number){
    this.product.removeFromCart(productId);
    this.removeCart = false;
  }
}

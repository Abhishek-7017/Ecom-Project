import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined|Product;
  productQuantity:number = 1;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}
  
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData = result
    })
  }
  handleQuantity(val:string){
    if(val === 'min' && this.productQuantity>1){
      this.productQuantity-=1;
    }else if(val === 'plus' && this.productQuantity<20){
      this.productQuantity+=1;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProductList:undefined|Product[];

  constructor(private product:ProductService){}
  
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnInit(): void {
    this.product.popularProduct().subscribe((result)=>{
      this.popularProductList = result;
    })
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data.type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:order[]|undefined;
  constructor(private productService:ProductService){}
  ngOnInit(): void {
   this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    if(orderId){
      this.productService.cancelOrder(orderId).subscribe((result)=>{
        this.getOrderList();
      })
    }
  }
  getOrderList(){
    this.productService.orderList().subscribe((result)=>{
      if(result){
        this.orderData = result;
      }
    })
  }
}

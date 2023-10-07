import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data.type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productMessage: undefined | string;
  productList: undefined | Product[];
  deleteIcon = faTrash
  editIcon = faEdit
  
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.List();
  }
  deleteItem(id: number) {
    this.product.deleteItem(id).subscribe((result)=>{
      if(result){
        this.productMessage = 'Item deleted successfully';
        this.List();
      }
    })
    setTimeout(()=>{
      this.productMessage = undefined
    },3000)
  }
  List(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    })
  }

}

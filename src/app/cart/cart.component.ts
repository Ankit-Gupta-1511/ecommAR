import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: Product[];
  totalPrice = 0;
  taxAmount = 0;
  tax = 18;
  priceToPay = 0;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(list => {
      this.productList = list.products;
      this.getTotalPrice();
      this.getTaxAmount();
      this.getPriceToPay();
    });

  }

  getTotalPrice() {
    let total = 0;
    this.productList.forEach(product => {
      total += product.price;
    });

    this.totalPrice = total;
  }

  getTaxAmount() {
    this.taxAmount = this.totalPrice * 18 / 100;
  }

  getPriceToPay() {
    this.priceToPay = this.totalPrice + this.taxAmount;
  }

}

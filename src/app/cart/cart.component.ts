import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: Product[] = [];
  totalPrice = 0;
  taxAmount = 0;
  tax = 18;
  priceToPay = 0;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser().subscribe(user => {
      console.log(user);
      if (user.cart) {
        user.cart.products.forEach(cartProduct => {
          this.productService.getProductByid(cartProduct.product).subscribe(product => {
            product.cartId = cartProduct._id;
            this.productList.push(product);
            this.getTotalPrice();
            this.getTaxAmount();
            this.getPriceToPay();
            console.log(product);
          });
        });
      }
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

  removeFromCart(_id, product) {
    console.log("the id is: ", _id);
    this.productService.removeFromCart(_id).subscribe(data => console.log(data));
    this.productList = this.productList.filter(element => {
      return !(element._id === product._id);
    });
    this.getTotalPrice();
    this.getTaxAmount();
    this.getPriceToPay();
  }

}

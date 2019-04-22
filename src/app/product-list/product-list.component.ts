import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    // this.productList = this.productService.getMockProducts();
    this.getProductList();
  }

  getProductList() {
    this.productService.getAllProducts().subscribe(list => {
      this.productList = list.products;
    });
  }

}

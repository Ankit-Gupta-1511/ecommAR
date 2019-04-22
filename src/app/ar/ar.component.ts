import { Component, OnInit, OnDestroy } from '@angular/core';
import { initVirtualMirror, destroyVirtualMirror, changeModel } from './utils/BRFv4DemoMinimalWebcam';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css']
})
export class ArComponent implements OnInit, OnDestroy {

  currentProduct: Product;
  productList: Product[];
  productId: string;
  currentModel;

  constructor(
    private productService: ProductService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productId = this.routes.snapshot.paramMap.get('id');
    
    this.getAllProducts();
    this.getProductById();
  }

  getProductById() {
    this.productService.getProductByid(this.productId).subscribe(product => {
      this.currentProduct = product;
      initVirtualMirror(product.arModel);
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(list => {
      this.productList = list.products;
    });
  }

  productChange(product) {
    this.currentProduct = product;
    this.currentModel = product.arModel;
    changeModel(this.currentModel);
  }

  ngOnDestroy() {
    destroyVirtualMirror();
  }

}

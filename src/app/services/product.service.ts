import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../GLOBAL';

export interface ProductAPidata {
  products: Product[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<ProductAPidata> {
    return this.http.get<ProductAPidata>(GLOBAL.HOST + GLOBAL.PRODUCT);
  }

  getProductByid(_id): Observable<Product> {
    return this.http.get<Product>(GLOBAL.HOST + GLOBAL.PRODUCT + '/' + _id);
  }

  addToCart(_id): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  localStorage.getItem('token'))
    };

    return this.http.put<any>(GLOBAL.HOST + GLOBAL.PRODUCT + '/' + _id + GLOBAL.ADD_TO_CART, {}, header);
  }

  removeFromCart(_id): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  localStorage.getItem('token'))
    };

    return this.http.put<any>(GLOBAL.HOST + GLOBAL.PRODUCT + '/' + _id + GLOBAL.REMOVE_FROM_CART, {}, header);
  }

  getMockProduct(_id): Product {
    return {
      _id: '1',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg', 'assets/images/glasses.jpeg', 'assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    };
  }

  getMockProducts(): Product[] {
    return [{
      _id: '1',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '2',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '3',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '4',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '5',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '6',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '7',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '8',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    },
    {
      _id: '9',
      name: 'ABCD',
      price: 400,
      images: ['assets/images/glasses.jpeg'],
      date: new Date(),
      description: 'asdjhgkjdsfhkj adsjkfhkjjkha fsdjbajsfdkjashdkjf adsjkhkjhaksdf'
    }];
  }

}

import { Product } from './../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  productsPath: string = '/products';
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list(`${this.productsPath}`).push(product);
  }

  getAll() {
    const data = this.db.list(
      `${this.productsPath}`).snapshotChanges();
    return data.pipe(
      map(products =>
        products.map(product => {
          const key = product.key;
          const payload = product.payload.val();
          return { key, ...payload } as Product;
        }))
    );
  }

  get(productId) {
    const data = this.db.object(`${this.productsPath}/${productId}`);
    return data.valueChanges();
  }

  update(productId, product) {
    const data = this.db.object(`${this.productsPath}/${productId}`);
    return data.update(product);
  }

  delete(productId) {
    const data = this.db.object(`${this.productsPath}/${productId}`);
    return data.remove();
  }
}

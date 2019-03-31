import { Product } from '../../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  productsPath: string = '/products';
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    const productRef = this.db.list(`${this.productsPath}`);
    return productRef.push(product);
  }

  getAll() {
    const productsRef = this.db.list(
      `${this.productsPath}`).snapshotChanges();
    return productsRef.pipe(
      map(products =>
        products.map(product => {
          const key = product.key;
          const payload = product.payload.val();
          return { key, ...payload } as Product;
        }))
    );
  }

  get(productId) {
    const productRef = this.db.object(`${this.productsPath}/${productId}`);
    return productRef.valueChanges();
  }

  update(productId, product) {
    const productRef = this.db.object(`${this.productsPath}/${productId}`);
    return productRef.update(product);
  }

  delete(productId) {
    const productRef = this.db.object(`${this.productsPath}/${productId}`);
    return productRef.remove();
  }
}

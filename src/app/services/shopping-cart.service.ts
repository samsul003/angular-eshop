import { take, map } from 'rxjs/operators';
import { Product } from './../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  cartsPath: string = "/shopping-carts";

  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    const cartRef = this.db.object(`${this.cartsPath}/${cartId}`);
    const cartItem = cartRef.valueChanges();
    return cartItem.pipe(map(cart => new ShoppingCart(cart["items"])));
  }

  async addToCart(product: Product) {
    this.updateCartItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCartItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    const cartRef = this.db.object(`${this.cartsPath}/${cartId}/items`);
    cartRef.remove();
  }

  private create() {
    const cartRef = this.db.list(`${this.cartsPath}`);
    return cartRef.push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItem(cartId: string, productId: string) {
    const cartItemRef = this.db.object(
      `${this.cartsPath}/${cartId}/items/${productId}`
    );
    return cartItemRef;
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    const cartRef = await this.create();
    localStorage.setItem("cartId", cartRef.key);
    return cartRef.key;
  }

  private async updateCartItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const cartItemRef = this.getCartItem(cartId, product.key);
    const cartItem = cartItemRef.valueChanges();
    cartItem.pipe(take(1)).subscribe(item => {
      let quantity = ((item && item["quantity"]) || 0) + change;
      if (quantity === 0) cartItemRef.remove();
      else cartItemRef.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
}

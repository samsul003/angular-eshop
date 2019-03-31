import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  ordersPath = '/order';

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) {}

  async createOrder(order) {
    let orderRef = this.db.list(`${this.ordersPath}`).push(order);
    this.cartService.clearCart();
    return orderRef;
  }

}

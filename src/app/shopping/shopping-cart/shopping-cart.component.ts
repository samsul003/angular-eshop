import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  basket$;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.basket$ = await this.cartService.getCart();
  }

  async clearCart() {
    this.cartService.clearCart();
  }

}

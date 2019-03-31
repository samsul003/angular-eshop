import { ShoppingCartService } from '../../shared/services/shopping-cart/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { switchMap, take } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../shared/models/shopping-cart';

@Component({
  selector: "products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: any;
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    let cartRef = await this.cartService.getCart();
    this.cart$ = cartRef;
    this.transformProducts();
  }

  private applyFilter() {
    const dataQuery = this.products.
      filter(query => query.category === this.category);
    this.filteredProducts = (this.category) ? dataQuery : this.products;
  }

  private transformProducts() {
    const productsToTransform = this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    );

    productsToTransform.subscribe(params => {
      this.category = params.get("category");
      this.applyFilter();
    });
  }

}

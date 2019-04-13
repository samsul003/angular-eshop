import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Product } from "../../../shared/models/product";
import { ProductService } from "../../../shared/services/product/product.service";

@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );
  }

  filter(query: string) {
    const dataQuery = this.products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredProducts = query ? dataQuery : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

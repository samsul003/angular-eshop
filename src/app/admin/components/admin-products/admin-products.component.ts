import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';

@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnDestroy {
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  // columnsToDisplay: string[] = ["no", "title", "price", "edit"];
  // tableData = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        products =>
          (this.filteredProducts = this.products = products)
          // (this.tableData.data = this.products = products)
      );
  }

  filter(query: string) {
    // let filteredProducts: any[];
    const dataQuery = this.products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()));
    this.filteredProducts = (query) ? dataQuery : this.products;
    // this.tableData.data = filteredProducts;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ngOnInit() {
  //   this.tableData.sort = this.sort;
  //   this.tableData.paginator = this.paginator;
  // }

}

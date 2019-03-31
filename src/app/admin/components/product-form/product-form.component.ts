import { Category } from '../../../shared/models/category';
import { ProductService } from '../../../shared/services/product/product.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories: Category[] = [];
  product: any = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const obs = this.productService.get(this.id).pipe(take(1));
      obs.subscribe(id => this.product = id);
    }

  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm(`Are you sure, you want to remove the product?`)) {
      return;
    } else {
      this.productService.delete(this.id);
      this.router.navigate(["/admin/products"]);
    }
  }

}

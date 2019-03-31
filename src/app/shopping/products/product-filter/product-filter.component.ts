import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent {
  categories: Category[] = [];
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(categories => this.categories = categories);
  }


}

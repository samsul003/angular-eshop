import { Category } from './../models/category';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categoriesPath: string = '/categories';

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    const action = query => query.orderByChild("name");
    const data = this.db.list(
      `${this.categoriesPath}`, action).snapshotChanges();
    return data.pipe(
      map(categories =>
        categories.map(category => {
          const key = category.key;
          const payload = category.payload.val();
          return { key, ...payload } as Category;
        }))
    );
  }
}

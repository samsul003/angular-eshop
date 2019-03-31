import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { httpInterceptorProvider } from './services/interceptors';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [CommonModule],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [httpInterceptorProvider]
})
export class SharedModule { }

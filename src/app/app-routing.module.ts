import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { LoginComponent } from './core/components/login/login.component';
import { OrderSuccessComponent } from './shopping/order-success/order-success.component';
import { PersonalOrdersComponent } from './shopping/personal-orders/personal-orders.component';
import { ProductsComponent } from './shopping/products/products.component';
import { AuthGuard } from './shared/services/auth/auth-guard.service';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "products", component: ProductsComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "login", component: LoginComponent },
  // Protected Users routes
  { path: "check-out", component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: "order-success/:id", component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: "personal/orders", component: PersonalOrdersComponent, canActivate: [AuthGuard] },
  // Protected Admin routes
  { path: "admin/products/new", component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard] },
  { path: "admin/products/:id", component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard] },
  { path: "admin/products", component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard] },
  { path: "admin/orders", component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

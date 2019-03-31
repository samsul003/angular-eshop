import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }

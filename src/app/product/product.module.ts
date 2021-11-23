import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductDeleteComponent} from './product-delete/product-delete.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductListComponent} from './product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProductModule { }

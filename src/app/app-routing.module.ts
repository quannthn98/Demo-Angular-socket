import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {AuthGuard} from './helper/auth.guard';


const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

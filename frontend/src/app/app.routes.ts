// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [

  // LOGIN
  { path: 'login', component: LoginComponent },

  // LISTADO DE PRODUCTOS
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./products/product-list/product-list.component')
        .then(c => c.ProductListComponent)
  },

  // CREAR PRODUCTO
  {
    path: 'products/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./products/product-create/product-create.component')
        .then(c => c.ProductCreateComponent)
  },

  // EDITAR PRODUCTO
  {
    path: 'products/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./products/product-edit/product-edit.component')
        .then(c => c.ProductEditComponent)
  },

  // DEFAULT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 404
  { path: '**', redirectTo: 'login' }
];

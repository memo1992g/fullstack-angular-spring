import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productos: Producto[] = [];
  error: string | null = null;
  loading = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Producto[]>(`${environment.apiUrl}/api/productos`, { headers })
      .subscribe({
        next: (data) => {
          this.productos = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudieron cargar los productos';
          this.loading = false;
        }
      });
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return; // Cancelado

      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.delete(`${environment.apiUrl}/api/productos/${id}`, { headers })
        .subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== id);
          },
          error: () => {
            this.error = 'No se pudo eliminar el producto';
          }
        });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

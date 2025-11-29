import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {

  id!: number;
  loading = true;

  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    tipo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProducto();
  }

  cargarProducto() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(`${environment.apiUrl}/api/productos/${this.id}`, { headers })
      .subscribe({
        next: (data: any) => {
          this.producto = data;
          this.loading = false;
        },
        error: () => {
          alert('Error al cargar el producto');
          this.router.navigate(['/products']);
        }
      });
  }

  actualizarProducto(form: NgForm) {
    if (form.invalid) return;

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`${environment.apiUrl}/api/productos/${this.id}`, this.producto, { headers })
      .subscribe({
        next: () => {
          alert('Producto actualizado');
          this.router.navigate(['/products']);
        },
        error: () => alert('Error al actualizar')
      });
  }
}

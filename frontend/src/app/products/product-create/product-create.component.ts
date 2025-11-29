import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {

  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    tipoProducto: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  crearProducto(form: NgForm) {
    if (form.invalid) return;

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${environment.apiUrl}/api/productos`, this.producto, { headers })
      .subscribe({
        next: () => {
          alert('Producto creado!');
          this.router.navigate(['/products']);
        },
        error: () => alert('Error al crear')
      });
  }
}

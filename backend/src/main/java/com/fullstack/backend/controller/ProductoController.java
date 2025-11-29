package com.fullstack.backend.controller;

import com.fullstack.backend.entity.Producto;
import com.fullstack.backend.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // para el front Angular
public class ProductoController {

    private final ProductoService productoService;

    // GET /api/productos  -> listar todos (ROLE_USER, ROLE_ADMIN)
    @GetMapping
    public List<Producto> listarTodos() {
        return productoService.findAll();
    }

    // GET /api/productos/{id}  -> detalle de uno
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        return ResponseEntity.ok(producto);
    }

    // POST /api/productos  -> crear (solo ADMIN según SecurityConfig)
    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        Producto creado = productoService.create(producto);
        // location: /api/productos/{id}
        return ResponseEntity
                .created(URI.create("/api/productos/" + creado.getId()))
                .body(creado);
    }

    // PUT /api/productos/{id}  -> actualizar (solo ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id,
                                               @Valid @RequestBody Producto producto) {
        Producto actualizado = productoService.update(id, producto);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE /api/productos/{id}  -> eliminar (solo ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.fullstack.backend.service.impl;

import com.fullstack.backend.entity.Producto;
import com.fullstack.backend.repository.ProductoRepository;
import com.fullstack.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public Producto findById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    @Override
    public Producto create(Producto producto) {
        producto.setId(null); // por si acaso
        return productoRepository.save(producto);
    }

    @Override
    public Producto update(Long id, Producto producto) {
        Producto existente = findById(id);

        existente.setNombre(producto.getNombre());
        existente.setDescripcion(producto.getDescripcion());
        existente.setPrecio(producto.getPrecio());
        existente.setStock(producto.getStock());
        existente.setTipo(producto.getTipo());

        return productoRepository.save(existente);
    }

    @Override
    public void delete(Long id) {
        Producto existente = findById(id);
        productoRepository.delete(existente);
    }
}

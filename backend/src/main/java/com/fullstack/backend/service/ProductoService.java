package com.fullstack.backend.service;

import com.fullstack.backend.entity.Producto;

import java.util.List;

public interface ProductoService {

    List<Producto> findAll();

    Producto findById(Long id);

    Producto create(Producto producto);

    Producto update(Long id, Producto producto);

    void delete(Long id);
}

package com.fullstack.backend.config;

import com.fullstack.backend.entity.Usuario;
import com.fullstack.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            String email = "admin@mail.com";
            String rawPassword = "admin123";

            Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);

            Usuario user;
            if (optionalUsuario.isPresent()) {
                user = optionalUsuario.get();
                System.out.println("Actualizando password de admin@mail.com");
            } else {
                user = new Usuario();
                user.setEmail(email);
                user.setRole("ADMIN");
                System.out.println("Creando usuario admin@mail.com");
            }

            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setRole("ADMIN"); // por si acaso
            usuarioRepository.save(user);

            System.out.println(">>> Usuario admin@mail.com listo con password: " + rawPassword);
        };
    }
}

package com.fullstack.backend.service.impl;

import com.fullstack.backend.dto.LoginRequest;
import com.fullstack.backend.dto.LoginResponse;
import com.fullstack.backend.entity.Usuario;
import com.fullstack.backend.repository.UsuarioRepository;
import com.fullstack.backend.security.JwtUtil;
import com.fullstack.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationServiceImpl(
            BCryptPasswordEncoder passwordEncoder,
            UsuarioRepository usuarioRepository,
            JwtUtil jwtUtil) {

        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Usuario user = usuarioRepository.findByEmail(request.getEmail().trim())
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        System.out.println("REQUEST EMAIL: [" + request.getEmail() + "]");
        System.out.println("REQUEST PASSWORD: [" + request.getPassword() + "]");
        System.out.println("DB PASSWORD: [" + user.getPassword() + "]");
        System.out.println("ENCODER INSTANCE: " + passwordEncoder);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new LoginResponse(token);
    }


}

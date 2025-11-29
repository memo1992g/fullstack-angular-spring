package com.fullstack.backend.service;

import com.fullstack.backend.dto.LoginRequest;
import com.fullstack.backend.dto.LoginResponse;

public interface AuthenticationService {
    LoginResponse login(LoginRequest request);
}

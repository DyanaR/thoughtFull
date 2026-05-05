package com.thoughtfull.api.thoughtfull_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

// specifies which endpoints require authentication and
// how the JWT tokens should be validated
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disables CSRF protection for REST API
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated() // requires every endpoint to have a valid JWT
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}

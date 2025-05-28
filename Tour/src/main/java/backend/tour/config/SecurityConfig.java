package backend.tour.config;

import backend.tour.config.JwtFilter;
import backend.tour.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailService CustomUserDetailService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors()
                .and()
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/tours/page/{page}",
                                "/tours/latest",
                                "/tours/{id}",
                                "/tour-schedules/tour/{tourId}",
                                "/users/register",
                                "/users/login"
                        ).permitAll()
                        .requestMatchers(
                                "/tours/create",
                                "/tours/update",
                                "/tours/delete/{id}",
                                "/tour-schedules/create",
                                "/tour-schedules/update",
                                "/tour-schedules/delete/{id}",
                                "/users/update",
                                "/users/delete/{id}",
                                "/users/page/{page}"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                "/bookings/update-status/{id}"
                        ).hasRole("USER")
                        .requestMatchers(
                                "/payments/**",
                                "/users/current-user/{username}",
                                "/bookings/user/{userId}",
                                "/bookings/create",
                                "/bookings/delete/{id}"
                        ).authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}

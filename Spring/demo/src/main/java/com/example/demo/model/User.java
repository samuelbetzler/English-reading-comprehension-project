package com.example.demo.model;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"User\"") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    
    @Column(name = "username", nullable = false)
    private String username;

   
    @Column(name = "email", nullable = false, unique = true)
    private String email;

   
    @Column(name = "password", nullable = false)
    private String password;
    @PrePersist
    protected void encryptPassword() {
        this.password = new BCryptPasswordEncoder().encode(this.password);
    }
    // Getters and setters...
    public Long getId() {
        return userId;
    }
    
    public void setId(Long id) {
        this.userId = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String rawPassword) {
        this.password = rawPassword;
    }

    
}

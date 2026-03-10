package com.jonathanb.jobtracker.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name darf nicht leer sein")
    private String name;

    @Email(message = "Keine gültige E-Mail Adresse")
    @NotBlank(message = "E-Mail darf nicht leer sein")
    private String email;

    @Size(min = 8, message = "Passwort muss mindestens 8 Zeichen haben")
    @NotBlank(message = "Passwort darf nicht leer sein")
    private String password;
}
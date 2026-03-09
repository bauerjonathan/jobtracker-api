package com.jonathanb.jobtracker.dto;

import com.jonathanb.jobtracker.entity.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class JobApplicationRequest {

    @NotBlank(message = "Company darf nicht leer sein")
    private String company;

    @NotBlank(message = "Position darf nicht leer sein")
    private String position;

    @NotNull(message = "Status darf nicht null sein")
    private ApplicationStatus status;

    private String notes;

    private LocalDate appliedAt;
}
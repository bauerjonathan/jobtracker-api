package com.jonathanb.jobtracker.dto;

import com.jonathanb.jobtracker.entity.ApplicationStatus;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class JobApplicationResponse {

    private Long id;
    private String company;
    private String position;
    private ApplicationStatus status;
    private String notes;
    private LocalDate appliedAt;
}
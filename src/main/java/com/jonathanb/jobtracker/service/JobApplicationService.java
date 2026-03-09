package com.jonathanb.jobtracker.service;

import com.jonathanb.jobtracker.exception.ResourceNotFoundException;
import com.jonathanb.jobtracker.dto.JobApplicationRequest;
import com.jonathanb.jobtracker.dto.JobApplicationResponse;
import com.jonathanb.jobtracker.entity.JobApplication;
import com.jonathanb.jobtracker.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public List<JobApplicationResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public JobApplicationResponse create(JobApplicationRequest request) {
        JobApplication application = JobApplication.builder()
                .company(request.getCompany())
                .position(request.getPosition())
                .status(request.getStatus())
                .notes(request.getNotes())
                .appliedAt(request.getAppliedAt())
                .build();
        return toResponse(repository.save(application));
    }

    public JobApplicationResponse getById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Bewerbung nicht gefunden"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Bewerbung nicht gefunden");
        }
        repository.deleteById(id);
    }

    private JobApplicationResponse toResponse(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .company(application.getCompany())
                .position(application.getPosition())
                .status(application.getStatus())
                .notes(application.getNotes())
                .appliedAt(application.getAppliedAt())
                .build();
    }
}
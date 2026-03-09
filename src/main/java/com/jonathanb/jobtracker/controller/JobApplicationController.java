package com.jonathanb.jobtracker.controller;

import com.jonathanb.jobtracker.repository.JobApplicationRepository;
import com.jonathanb.jobtracker.entity.JobApplication;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationRepository repository;

    @GetMapping
    public List<JobApplication> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public JobApplication create(@RequestBody @Valid JobApplication application) {
        return repository.save(application);
    }

    @GetMapping("/{id}")
    public JobApplication getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
package com.jonathanb.jobtracker.controller;

import com.jonathanb.jobtracker.dto.JobApplicationRequest;
import com.jonathanb.jobtracker.dto.JobApplicationResponse;
import com.jonathanb.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService service;

    @GetMapping
    public List<JobApplicationResponse> getAll() {
        return service.getAll();
    }

    @PostMapping
    public JobApplicationResponse create(@RequestBody @Valid JobApplicationRequest request) {
        return service.create(request);
    }

    @GetMapping("/{id}")
    public JobApplicationResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public JobApplicationResponse update(@PathVariable Long id, @RequestBody @Valid JobApplicationRequest request) {
        return service.update(id, request);
    }
}
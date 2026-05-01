package com.thoughtfull.api.thoughtfull_api.controller;

import com.thoughtfull.api.thoughtfull_api.dto.CreateEntryRequest;
import com.thoughtfull.api.thoughtfull_api.dto.EntryResponse;
import com.thoughtfull.api.thoughtfull_api.dto.UpdateEntryRequest;
import com.thoughtfull.api.thoughtfull_api.service.EntryService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController // marks this as an API controller
@RequestMapping("/api/v1/entries")
public class EntryController {

    private final EntryService entryService;

    // constructor injection
    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

    // create entry
    @PostMapping
    public EntryResponse createEntry(
            @AuthenticationPrincipal Jwt jwt, // current user token
            @RequestBody CreateEntryRequest request // request body from frontend
    ) {
        return entryService.createEntry(jwt, request);
    }

    // get all entries
    @GetMapping
    public List<EntryResponse> getEntries(
            @AuthenticationPrincipal Jwt jwt
    ) {
        return entryService.getEntries(jwt);
    }

    // get one entry
    @GetMapping("/{id}")
    public EntryResponse getEntryById(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id // id from URL
    ) {
        return entryService.getEntryById(jwt, id);
    }

    // update entry
    @PatchMapping("/{id}")
    public EntryResponse updateEntry(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id,
            @RequestBody UpdateEntryRequest request
    ) {
        return entryService.updateEntry(jwt, id, request);
    }

    // delete entry
    @DeleteMapping("/{id}")
    public void deleteEntry(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id
    ) {
        entryService.deleteEntry(jwt, id);
    }

}

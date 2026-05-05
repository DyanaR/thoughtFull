package com.thoughtfull.api.thoughtfull_api.service;

import com.thoughtfull.api.thoughtfull_api.dto.CreateEntryRequest;
import com.thoughtfull.api.thoughtfull_api.dto.EntryResponse;
import com.thoughtfull.api.thoughtfull_api.dto.UpdateEntryRequest;
import com.thoughtfull.api.thoughtfull_api.model.Entry;
import com.thoughtfull.api.thoughtfull_api.model.Mood;
import com.thoughtfull.api.thoughtfull_api.model.User;
import com.thoughtfull.api.thoughtfull_api.repository.EntryRepository;
import com.thoughtfull.api.thoughtfull_api.repository.MoodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EntryService {

    // repositories = database access
    private final EntryRepository entryRepository;
    private final MoodRepository moodRepository;

    // service dependency - used to get current user
    private final UserService userService;

    // constructor (dependency) injection
    public EntryService(
            EntryRepository entryRepository,
            MoodRepository moodRepository,
            UserService userService
    ) {
        this.entryRepository = entryRepository;
        this.moodRepository = moodRepository;
        this.userService = userService;
    }

    // create entry
    public EntryResponse createEntry(Jwt jwt, CreateEntryRequest request) {
        // step 1: get current user from token
        User user = userService.getOrCreateUser(jwt);

        // step 2: create new Entry object
        Entry entry = new Entry(user, request.getTitle(), request.getContent());

        // step 3: attach moods if provided
        if (request.getMoodIds() != null && !request.getMoodIds().isEmpty()) {
            Set<Mood> moods = getMoodsByIds(request.getMoodIds());
            entry.setMoods(moods);
        }

        // step 4: save to database
        Entry savedEntry = entryRepository.save(entry);

        // step 5: convert to response DTO
        return toEntryResponse(savedEntry);
    }

    // get all entries for user
    public List<EntryResponse> getEntries(Jwt jwt){
        // step 1: get current user
        User user = userService.getOrCreateUser(jwt);

        // step 2: fetch entries from DB
        return entryRepository.findByUserOrderByCreatedAtDesc(user)
                .stream() // convert List<Entry> -> stream
                .map(this::toEntryResponse) // convert each to DTO
                .toList();

    }

    // get single entry
    public EntryResponse getEntryById(Jwt jwt, UUID entryId){
        User user = userService.getOrCreateUser(jwt);

        // ensure entry exists AND belongs to user
        Entry entry = getOwnedEntry(entryId, user);

        return toEntryResponse(entry);

    }

    // update entry
    public EntryResponse updateEntry(Jwt jwt, UUID entryId, UpdateEntryRequest request){
        User user = userService.getOrCreateUser(jwt);

        // get entry + ownership check
        Entry entry = getOwnedEntry(entryId, user);

        // update only provided fields (PATCH behavior)
        if (request.getTitle() != null){
            entry.setTitle(request.getTitle());
        }

        if (request.getContent() != null) {
            if (request.getContent().isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Content cannot be blank"
                );
            }
            entry.setContent(request.getContent());
        }

        if (request.getMoodIds() != null){
            Set<Mood> moods = getMoodsByIds(request.getMoodIds());
            entry.setMoods(moods);
        }

        // save update entry in db
        Entry updateEntry = entryRepository.save(entry);

        return toEntryResponse(updateEntry);
    }

    // delete entry
    public void deleteEntry(Jwt jwt, UUID entryId){
        User user = userService.getOrCreateUser(jwt);

        Entry entry = getOwnedEntry(entryId, user);

        entryRepository.delete(entry);
    }

    // ------------- HELPERS ----------------


    // helper: ensure entry exists and belongs to current user
    private Entry getOwnedEntry(UUID entryId, User user){
        // step 1: find entry
        Entry entry = entryRepository.findById(entryId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Entry not found."
                ));

        // step 2: check ownership
        if (!entry.getUser().getId().equals(user.getId())){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, // hide existence for security
                    "Entry not found."
            );
        }
        return entry;
    }

    // helper: convert mood IDS -> Mood Objects
    private Set<Mood> getMoodsByIds(Set<UUID> moodIds){
        return moodIds.stream()
                .map(id -> moodRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Invalid mood ID."
                        )))
                .collect(Collectors.toSet());
    }

    // helper: convert Entry -> EntryResponse (DTO)
    private EntryResponse toEntryResponse(Entry entry) {

        // extract mood names
        Set<String> moodNames = entry.getMoods()
                .stream()
                .map(Mood::getName)
                .collect(Collectors.toSet());

        return new EntryResponse(
                entry.getId(),
                entry.getTitle(),
                entry.getContent(),
                moodNames,
                entry.getCreatedAt(),
                entry.getUpdatedAt()
        );
    }
}
















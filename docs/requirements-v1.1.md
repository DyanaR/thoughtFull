# Requirements V1.1

# ThoughtFull Requirements — V1.1

## Overview

Version 1.1 focuses on improving the journaling experience after the core V1 flow is complete. The goal is to make ThoughtFull more useful over time by adding audio journaling, search, insights, empty states, and profile/settings support.

## Goals

- Make journaling faster and more flexible.
- Help users find past entries easily.
- Give users lightweight insight into their mood patterns.
- Improve polish for first-time and low-data states.
- Allow users to manage their display name and basic profile settings.

---

## 1. Audio Journaling

### Description

Allow users to record a voice journal entry and convert it into text. The transcribed text should populate the journal content field so the user can edit before saving.

### User Story

As a user, I want to speak my journal entry instead of typing it, so that I can capture my thoughts faster and more naturally.

### Requirements

- User can tap the microphone button from the Add Entry page.
- App requests microphone permission if needed.
- User can start and stop recording.
- Recorded audio can be sent to the backend for transcription.
- Transcribed text appears in the journal content textarea.
- User can edit the transcription before saving.
- User can save the entry using the existing create-entry flow.

### Acceptance Criteria

- Clicking the microphone icon starts a recording flow.
- User receives clear feedback while recording.
- Stopping the recording triggers transcription.
- Transcription fills the content field.
- User can still manually edit title and content.
- If transcription fails, user sees an error message and can continue typing manually.

### Notes

- Backend may use an audio transcription API.
- Consider file size and supported audio formats.
- Do not create the entry until the user confirms with the check button.

---

## 2. Search Entries

### Description

Allow users to search through their journal entries by title, content, and possibly mood.

### User Story

As a user, I want to search my past journal entries, so that I can quickly find something I wrote before.

### Requirements

- Add a search input on the Home page above the entry list.
- Search should filter entries by title and content.
- Search should be case-insensitive.
- Optional: support mood name matching.
- Empty search should show all entries.

### Acceptance Criteria

- Typing in the search box updates the visible entry list.
- Matching entries remain visible.
- Non-matching entries are hidden.
- Clearing the search input restores all entries.
- If no entries match, show a friendly empty search message.

### Notes

- V1.1 can use frontend filtering since entries are already fetched.
- Backend search can be added later if entry volume grows.

---

## 3. Entry Statistics

### Description

Show simple insights based on the user’s journal history and selected moods.

### User Story

As a user, I want to see patterns in my journaling and moods, so that I can better understand how I have been feeling over time.

### Requirements

- Show total number of entries.
- Show entries written this week.
- Show most selected mood.
- Optional: show current journaling streak.
- Optional: show a small mood summary section on Home page.

### Acceptance Criteria

- Stats update when entries are created or deleted.
- Most selected mood is calculated from existing entries.
- If there is not enough data, show a soft empty state instead of broken stats.
- Stats should not overwhelm the Home page UI.

### Notes

- Start with simple frontend calculations.
- Keep the design minimal and aligned with ThoughtFull’s calm visual style.

---

## 4. Empty States

### Description

Improve the user experience when there are no journal entries, no search results, or no moods selected.

### User Story

As a user, I want helpful empty states, so that the app feels intentional instead of blank or broken.

### Requirements

- Home page should show a friendly message when the user has no entries.
- Search should show a friendly message when no results match.
- Mood selection can show helper text explaining that up to 2 emotions can be selected.
- Add Entry page should show validation messages when title or content is missing.

### Acceptance Criteria

- New users see a clear prompt to create their first entry.
- Empty states use gentle, brand-aligned wording.
- Empty states do not block core actions.
- Empty-state UI works well with the fixed Add Entry button.

### Suggested Copy

- No entries yet: “No journal entries yet. Capture your first thought.”
- No search results: “No matching entries found.”
- Mood helper: “Select up to 2 emotions.”

---

## 5. Settings / Profile

### Description

Add a simple profile/settings page where users can update their display name and log out.

### User Story

As a user, I want to change my display name, so that ThoughtFull addresses me the way I prefer.

### Requirements

- Add a Settings or Profile page.
- User can view current display name.
- User can update display name.
- Display name update uses existing `PATCH /api/v1/users/me` endpoint.
- User can log out from this page.
- Optional: show user email from Auth0 as read-only.

### Acceptance Criteria

- User can navigate to settings from Home page.
- Current display name is prefilled.
- Saving updates the backend user record.
- Home page greeting updates after name change.
- Empty display name is not allowed.
- User sees an error if saving fails.

### Notes

- Display name does not need to be unique.
- Display name is separate from Auth0 authentication identity.
- Auth0 email should not be editable inside ThoughtFull.

---

## Suggested V1.1 Priority Order

1. Empty States
2. Settings / Profile
3. Search Entries
4. Entry Statistics
5. Audio Journaling

This order is recommended because empty states and settings are quick polish wins, search and stats build on existing data, and audio journaling is the largest feature with backend/API complexity.

## Out of Scope for V1.1

- Social sharing
- Public profiles
- Password management inside ThoughtFull
- Advanced analytics dashboards
- AI-generated mental health advice
- Push notifications
- Calendar integrations

## Success Criteria

V1.1 is complete when users can:

- Record or type journal entries.
- Search past entries.
- See basic mood and entry insights.
- Understand empty states clearly.
- Update their display name from the app.

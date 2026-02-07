# Requirements

## Overview

This application is a private journaling web application focused on intentional reflection through voice-based entries. Users record journal entries directly within the app, which are transcribed to text and stored securely. The product emphasizes mindful use, emotional awareness, and personal insight rather than content import or social sharing.

The system is built with a React frontend and a Spring Boot backend using RESTful APIs. The backend is designed to be frontend-agnostic to support future mobile expansion.

---

## MVP Requirements (V1)

### Authentication & User Access

- Users must be able to:
  - Sign up
  - Log in
  - Log out
- Users may only view, edit, or delete **their own** journal entries.

---

### Journal Entry Creation

- Users can create journal entries via **in-app audio recording** or **typed text input**.
- Audio entries are transcribed to text using an AI transcription service.
- The **transcribed or typed text** is the primary content stored for each entry.
- Audio files may be stored temporarily or optionally for playback, but the app is not intended to function as an audio archive.
- Uploading external audio files is **not supported in V1**.

---

### Journal Entry Metadata

Each journal entry includes:

- Title
- Date and time created
- Day of the week
- Transcribed text content
- Moods

---

### Journal Entry Management

- Entries are displayed by default in **most recent first** order.
- Users can:
  - View entries
  - Edit entries
  - Delete entries
- Entries are editable unless deleted.

---

### Journal Entry Deletion

- Users may permanently delete journal entries.
- Deletion is a hard delete and irreversible.
- Deleted entries are fully removed from the system.
- The application clearly communicates that deleted entries cannot be recovered.
- A confirmation step is required before permanent deletion.

---

### Mood / Emotional Tracking

- Users may optionally select a mood for each journal entry.
- Users may select **up to two moods per entry**.
- Mood selection can be skipped.
- Mood selection is intentionally limited to reduce cognitive load.
- Each mood has a default associated color.

#### AI-Derived Mood (Optional)

- The system may derive additional moods using AI analysis of the journal entry.
- AI-derived moods are:
  - Optional
  - Hidden by default
  - Presented as suggestions only
- Users may accept or dismiss AI-suggested moods.

---

### Design & UX Principles

- Recording is the primary interaction; journaling is an intentional act.
- The application avoids features that encourage content dumping or misuse.
- The app is designed to feel private, calm, and reflective.
- RESTful APIs are used throughout to support future mobile clients.

---

## Out of Scope (V1)

The following are explicitly excluded from the MVP:

- Social features (sharing, feeds, likes, followers)
- Batch audio uploads
- Public journal entries
- Gamification mechanics
- AI therapeutic or diagnostic claims

---

## Future / Phase 2 Features

These features are intentionally deferred to preserve focus on core journaling behavior in V1.

### Post-Entry Mood Reflection

- Allow users to log or adjust mood **after** journaling.
- May include simplified or color-based mood selection.

---

### Filtering & Organization

- Users can filter journal entries by date:
  - Year
  - Month
  - Week

---

### Entry Privacy Locking

- Users can lock individual journal entries for privacy.
- Locked entries remain visible in the journal list and are marked with a lock icon.
- Opening a locked entry requires a passcode or equivalent authentication.
- Locked entries can be viewed and edited after authentication.

---

### Media Attachments

- Allow users to attach images or additional media to journal entries.
- Media is optional and secondary to text content.

---

### Journal Prompts

- Display optional daily reflection prompts on the home page.
- Prompts are non-intrusive and dismissible.

---

### Calendar View & Streaks

- Visual calendar showing journaling activity.
- Supports:
  - Mood visualization
  - Journaling streaks

---

### Mood Analytics

- Aggregate mood data over time.
- Display simple trends and statistics (weekly, monthly).

---

## Technical Notes

- The Spring Boot backend serves as a shared API for all future clients (web, mobile).
- API contracts are designed to remain stable as new clients are added.
- Frontend logic is kept platform-agnostic to support future React Native migration.

---

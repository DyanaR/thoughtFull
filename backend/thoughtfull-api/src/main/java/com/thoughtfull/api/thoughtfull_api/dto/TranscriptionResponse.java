package com.thoughtfull.api.thoughtfull_api.dto;

public class TranscriptionResponse {

    private String transcript;

    public TranscriptionResponse(String transcript) {
        this.transcript = transcript;
    }

    public String getTranscript() {
        return transcript;
    }
}
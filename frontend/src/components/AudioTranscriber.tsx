import { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosMic } from "react-icons/io";
import { transcribeAudio } from "../services/transcriptions";

type AudioTranscriberProps = {
  onTranscriptReady: (transcript: string) => void;
  onStatusChange?: (status: string) => void;
  onError?: (error: string) => void;
};

const MAX_RECORDING_MS = 360000; // 6 minutes

function AudioTranscriber({
  onTranscriptReady,
  onStatusChange,
  onError,
}: AudioTranscriberProps) {
  const { getAccessTokenSilently } = useAuth0();

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const recordingTimerRef = useRef<number | null>(null);

  const handleMicClick = async () => {
    if (isRecording) {
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }

      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      onStatusChange?.("Transcribing...");
      return;
    }

    try {
      onError?.("");
      onStatusChange?.("Recording... tap mic to stop");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          setIsTranscribing(true);

          if (recordingTimerRef.current) {
            clearTimeout(recordingTimerRef.current);
          }

          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          const audioFile = new File([audioBlob], "journal-audio.webm", {
            type: "audio/webm",
          });

          const token = await getAccessTokenSilently();
          const result = await transcribeAudio(token, audioFile);

          onTranscriptReady(result.transcript);
          onStatusChange?.("");
        } catch (err) {
          console.error(err);
          onError?.("Could not transcribe audio. Please try again.");
          onStatusChange?.("");
        } finally {
          setIsTranscribing(false);
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      recordingTimerRef.current = window.setTimeout(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        onStatusChange?.("Recording limit reached. Transcribing...");
      }, MAX_RECORDING_MS);
    } catch (err) {
      console.error(err);
      onError?.("Microphone access was denied.");
      onStatusChange?.("");
    }
  };

  return (
    <button
      type="button"
      className={`group-button ${isRecording ? "recording" : ""}`}
      onClick={handleMicClick}
      disabled={isTranscribing}
    >
      <IoIosMic className="icons" />
    </button>
  );
}

export default AudioTranscriber;

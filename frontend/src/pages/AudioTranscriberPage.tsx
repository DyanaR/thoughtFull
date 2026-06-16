"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { transcribeAudio } from "../services/transcriptions";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMicOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { CiPause1, CiPlay1 } from "react-icons/ci";

const MAX_RECORDING_MS = 360000; // 6 minutes
const BAR_COUNT = 42;

export default function AudioTranscriberPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAccessTokenSilently } = useAuth0();

  const [isPaused, setIsPaused] = useState(false);
  const cancelledRef = useRef(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const [, setStatus] = useState("");
  const [error, setError] = useState("");

  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(10));
  const volumeRef = useRef(10);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const autoStartedRef = useRef(false);

  // AUDIO BARS VISUALIZER
  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 512;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);
    let animationId: number;
    let frame = 0;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      frame++;

      if (frame % 4 !== 0) return;

      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i] - 128;
        sum += Math.abs(value);
      }

      const average = sum / dataArray.length;
      const targetVolume = Math.min(180, Math.max(40, average * 12));

      volumeRef.current = volumeRef.current * 0.8 + targetVolume * 0.2;

      const nextBars = Array.from({ length: BAR_COUNT }, (_, i) => {
        const center = BAR_COUNT / 2;
        const distanceFromCenter = Math.abs(i - center) / center;
        const shapeFactor = 1 - distanceFromCenter * 0.75;
        const randomMovement = Math.sin(frame * 0.08 + i) * 8;

        return Math.max(40, volumeRef.current * shapeFactor + randomMovement);
      });

      setBars(nextBars);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      try {
        source.disconnect();
      } catch {}
      audioContext.close();
    };
  }, [isRecording]); // only run when recording starts

  const getSupportedMimeType = () => {
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
      return "audio/webm;codecs=opus";
    }

    if (MediaRecorder.isTypeSupported("audio/mp4")) {
      return "audio/mp4";
    }

    if (MediaRecorder.isTypeSupported("audio/aac")) {
      return "audio/aac";
    }

    return "";
  };

  const getAudioExtension = (mimeType: string) => {
    if (mimeType.includes("mp4")) return "mp4";
    if (mimeType.includes("aac")) return "aac";
    if (mimeType.includes("mpeg")) return "mp3";
    if (mimeType.includes("wav")) return "wav";
    if (mimeType.includes("ogg")) return "ogg";
    return "webm";
  };

  const startRecording = async () => {
    try {
      setError("");
      //setStatus("Recording... tap mic to stop");

      cancelledRef.current = false;
      setIsPaused(false);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const supportedMimeType = getSupportedMimeType();

      const mediaRecorder = supportedMimeType
        ? new MediaRecorder(stream, { mimeType: supportedMimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        if (cancelledRef.current) return;

        try {
          setIsTranscribing(true);

          if (recordingTimerRef.current) {
            clearTimeout(recordingTimerRef.current);
          }

          const recorderMimeType =
            mediaRecorderRef.current?.mimeType ||
            audioChunksRef.current[0]?.type ||
            "audio/webm";

          const audioBlob = new Blob(audioChunksRef.current, {
            type: recorderMimeType,
          });

          if (audioChunksRef.current.length === 0 || audioBlob.size === 0) {
            setError("No audio was captured. Please try recording again.");
            setIsTranscribing(false);
            return;
          }

          const extension = getAudioExtension(recorderMimeType);

          const audioFile = new File(
            [audioBlob],
            `journal-audio.${extension}`,
            {
              type: recorderMimeType,
            },
          );

          const token = await getAccessTokenSilently();
          const result = await transcribeAudio(token, audioFile);

          const returnTo = location.state?.returnTo;

          navigate(
            returnTo === "edit-entry"
              ? `/entries/${location.state?.entryId}`
              : "/add-entry",
            {
              state: {
                transcript: result.transcript,
                moodIds: location.state?.moodIds,
                selectedMoods: location.state?.selectedMoods,
                userTitle: location.state?.userTitle,
                userContent: location.state?.userContent,
              },
            },
          );
        } catch (err) {
          console.error(err);
          const message = err instanceof Error ? err.message : "Unknown error";
          setError(message);
          setStatus("");
        } finally {
          setIsTranscribing(false);
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start(1000); // makes recorder emit audio chunks every 1 sec
      setIsRecording(true);

      recordingTimerRef.current = window.setTimeout(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        setStatus("Recording limit reached. Transcribing...");
      }, MAX_RECORDING_MS);
    } catch (err) {
      console.error(err);
      setError("Microphone access was denied.");
      setStatus("");
    }
  };

  const cancelRecording = () => {
    cancelledRef.current = true;

    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (
      mediaRecorderRef.current?.state === "recording" ||
      mediaRecorderRef.current?.state === "paused"
    ) {
      mediaRecorderRef.current.stop();
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());

    const returnTo = location.state?.returnTo;

    navigate(
      returnTo === "edit-entry"
        ? `/entries/${location.state?.entryId}`
        : "/add-entry",
      {
        state: {
          moodIds: location.state?.moodIds,
          selectedMoods: location.state?.selectedMoods,
          userTitle: location.state?.userTitle,
          userContent: location.state?.userContent,
        },
      },
    );
  };

  const togglePauseRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    if (recorder.state === "recording") {
      recorder.pause();
      setIsPaused(true);
      setStatus("Recording paused");
    } else if (recorder.state === "paused") {
      recorder.resume();
      setIsPaused(false);
      //   setStatus("Recording... tap check to finish");
    }
  };

  const finishRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    if (recorder.state === "recording" || recorder.state === "paused") {
      recorder.requestData();
      recorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      setIsTranscribing(true);
      setStatus("Transcribing...");
    }
  };

  useEffect(() => {
    if (!location.state?.startRecording) return;
    if (autoStartedRef.current) return;

    autoStartedRef.current = true;
    startRecording();
  }, []);

  return (
    <div className="audio-recording-page" style={{ paddingTop: "6rem" }}>
      <div className="audio-recording-main">
        <div className="audio-mic-circle">
          <IoMicOutline />
        </div>

        <div className="audio-message-slot">
          {isTranscribing ? (
            <p className="messages-text">Transcribing your audio...</p>
          ) : isPaused ? (
            <p className="messages-text">Recording paused</p>
          ) : isRecording ? (
            <p className="messages-text">Recording</p>
          ) : (
            <p className="messages-text">Starting recording...</p>
          )}
        </div>

        {/* AUDIO BARS */}
        <div className="audio-bars-slot">
          {isRecording && !isPaused && !isTranscribing && (
            <div className="audio-bars">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="audio-bar"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="audio-actions-slot">
          {!isTranscribing && (
            <div className="audio-recording-actions buttons-group">
              <button
                type="button"
                className="third-button outline"
                onClick={cancelRecording}
              >
                <RiResetLeftFill className="icons" />
              </button>

              <button
                type="button"
                className="third-button mic recording"
                onClick={togglePauseRecording}
                disabled={!isRecording}
              >
                {isPaused ? (
                  <CiPlay1 className="icons" />
                ) : (
                  <CiPause1 className="icons" />
                )}
              </button>

              <button
                type="button"
                className="third-button outline"
                onClick={finishRecording}
                disabled={!isRecording}
              >
                <FaCheck className="icons" />
              </button>
            </div>
          )}
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

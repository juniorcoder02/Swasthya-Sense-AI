import React, { useState, useRef } from "react";

const VoiceAnalysis = ({ onAnalysisComplete }) => {
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("Click 'Start' to analyze voice");
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const dataArrayRef = useRef(null);

  const startRecording = async () => {
    try {
      setMessage("Recording... Speak now!");
      setRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      setTimeout(() => stopRecording(), 8000); // Auto stop after 8 seconds
    } catch (error) {
      setMessage("Error accessing microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      analyzeVoice();
    }
  };

  const analyzeVoice = () => {
    if (!analyserRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average =
      dataArrayRef.current.reduce((a, b) => a + b, 0) /
      dataArrayRef.current.length;

    let emotion = "Neutral";
    if (average > 160) emotion = "Excited";
    else if (average > 120) emotion = "Happy";
    else if (average > 80) emotion = "Calm";
    else if (average > 50) emotion = "Sad";
    else emotion = "Tired";

    setMessage(`Detected Emotion: ${emotion}`);
    onAnalysisComplete(emotion);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-3">Voice Analysis</h2>
      <h4 className="mb-3">
        <span className="font-bold">Read the following line :</span> The mind
        is like the sky—sometimes clear, sometimes cloudy. Take a deep breath
        and share how your sky looks today.
      </h4>

      <button
        onClick={recording ? stopRecording : startRecording}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {recording ? "Stop" : "Start"} Recording
      </button>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default VoiceAnalysis;

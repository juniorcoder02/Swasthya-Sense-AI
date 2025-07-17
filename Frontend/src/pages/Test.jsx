import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacialRecognition from "../components/FaceRecognition";
import VoiceAnalysis from "../components/VoiceAnalysis";

const Test = () => {
  const [bp, setBP] = useState("");
  const [pulse, setPulse] = useState("");
  const [respiratory, setRespiratory] = useState("");
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState("");
  const [result, setResult] = useState("");
  const [emotion, setEmotion] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();

    const bpValue = Number(bp);
    const pulseValue = Number(pulse);
    const respiratoryValue = Number(respiratory);

    // Validation: All fields are required
    if (!bp || !pulse || !respiratory) {
      setResult("⚠️ All fields are required. Please enter all values.");
      return;
    }

    // Normal Ranges
    const isBPNormal = bpValue >= 90 && bpValue <= 120;
    const isPulseNormal = pulseValue >= 60 && pulseValue <= 100;
    const isRespiratoryNormal =
      respiratoryValue >= 12 && respiratoryValue <= 20;

    if (isBPNormal && isPulseNormal && isRespiratoryNormal) {
      setResult("🎉 Congratulations! You are completely fine.");
    } else {
      setResult("⚠️ Please take a complete psychiatrist test.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        Health & Voice Analysis
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* BP Input */}
        <label className="block mb-2 font-medium text-gray-700">
          BP Rate (Systolic or Diastolic)
        </label>
        <input
          type="number"
          placeholder="Enter BP Rate"
          value={bp}
          onChange={(e) => setBP(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          required
        />

        {/* Pulse Input */}
        <label className="block mb-2 font-medium text-gray-700">
          Pulse Rate (BPM)
        </label>
        <input
          type="number"
          placeholder="Enter Pulse Rate"
          value={pulse}
          onChange={(e) => setPulse(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          required
        />

        {/* Respiratory Input */}
        <label className="block mb-2 font-medium text-gray-700">
          Respiratory Rate (Breaths per Minute)
        </label>
        <input
          type="number"
          placeholder="Enter Respiratory Rate"
          value={respiratory}
          onChange={(e) => setRespiratory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          required
        />

 

        <VoiceAnalysis onAnalysisComplete={(result) => setEmotion(result)} />
        {emotion && <p className="mt-3 text-lg">Detected Emotion: {emotion}</p>}

        {/* Facial Recognition Section */}
        <FacialRecognition onEmotionDetect={setDetectedEmotion} />

        {/* Display Detected Emotion */}
        {detectedEmotion && (
          <p className="mt-4 text-lg font-medium text-gray-700">
            📌 Detected Emotion:{" "}
            <span className="font-bold text-blue-600">{detectedEmotion}</span>
          </p>
        )}
        <button
          type="submit"
          className=" cursor-pointer mt-6 w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-6 text-lg font-medium text-center">
          {result}
          {result.includes("test") && (
            <button
              onClick={() => navigate("/test-2")}
              className="block mt-4 text-blue-600 underline"
            >
              Take the Full Test
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;

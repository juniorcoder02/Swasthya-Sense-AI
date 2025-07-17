import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FacialRecognition = ({ onEmotionDetect }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [emotionResult, setEmotionResult] = useState("");

  const API_KEY = "your_api_key"; // Replace with your Face++ API Key
  const API_SECRET = "your_api_secret"; // Replace with your Face++ API Secret

  // Capture Image from Webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    analyzeEmotion(imageSrc);
  };

  // Convert base64 to Blob for API request
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
  };

  // Analyze Emotion using Face++ API
  const analyzeEmotion = async (imageSrc) => {
    const formData = new FormData();
    formData.append("api_key", API_KEY);
    formData.append("api_secret", API_SECRET);
    formData.append("return_attributes", "emotion");
    formData.append("image_file", base64ToBlob(imageSrc));

    try {
      const response = await axios.post("https://api-us.faceplusplus.com/facepp/v3/detect", formData);
      const emotions = response.data.faces[0]?.attributes?.emotion;

      if (emotions) {
        const dominantEmotion = Object.keys(emotions).reduce((a, b) => (emotions[a] > emotions[b] ? a : b));
        setEmotionResult(`Detected Emotion: ${dominantEmotion}`);
        onEmotionDetect(dominantEmotion);
      } else {
        setEmotionResult("No face detected. Try again!");
      }
    } catch (error) {
      console.error("Error detecting emotion:", error);
      setEmotionResult("Error detecting emotion. Try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-center mb-3">🎭 Facial Emotion Detection</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-md"
      />
      <button
        onClick={captureImage}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Capture & Analyze Emotion
      </button>
      {capturedImage && <img src={capturedImage} alt="Captured" className="mt-4 rounded-md" />}
      {emotionResult && <p className="mt-3 text-center text-gray-700">{emotionResult}</p>}
    </div>
  );
};

export default FacialRecognition;

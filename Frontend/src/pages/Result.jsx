import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const stages = {
  "Mild Hypertension": {
    color: "#22c55e", // Green (Mild)
    recommendations: [
      "Engage in regular physical activity like walking or yoga.",
      "Practice mindfulness and meditation.",
      "Maintain a balanced diet and stay hydrated.",
    ],
    avoid: [
      "Avoid excessive salt and processed foods.",
      "Limit caffeine and alcohol intake.",
      "Reduce screen time before bed.",
    ],
  },
  "Moderate Anxiety": {
    color: "#facc15", // Yellow (Moderate)
    recommendations: [
      "Try deep breathing exercises to calm your mind.",
      "Follow a structured daily routine.",
      "Take short breaks when feeling overwhelmed.",
    ],
    avoid: [
      "Avoid excessive consumption of caffeine and sugar.",
      "Reduce exposure to stressful news and social media.",
    ],
  },
  "Severe Anxiety": {
    color: "#fb923c", // Orange (Severe)
    recommendations: [
      "Consider talking to a therapist or counselor.",
      "Engage in creative activities like painting or journaling.",
      "Develop a nighttime relaxation routine.",
    ],
    avoid: [
      "Avoid self-isolation; reach out to loved ones.",
      "Reduce workload and prioritize self-care.",
    ],
  },
  Depression: {
    color: "#ef4444", // Red (Critical)
    recommendations: [
      "Seek professional mental health support.",
      "Try to engage in social activities, even if small.",
      "Set small, achievable goals to boost confidence.",
    ],
    avoid: [
      "Avoid negative self-talk and self-blame.",
      "Reduce alcohol and drug consumption.",
      "Don't ignore persistent negative feelings; seek help.",
    ],
  },
};

const getStage = (score) => {
  if (score <= 10) return "Mild Hypertension";
  if (score <= 20) return "Moderate Anxiety";
  if (score <= 30) return "Severe Anxiety";
  return "Depression";
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const stage = getStage(score);
  const resultRef = useRef(null);

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit? Your progress will not be saved.")) {
      navigate("/");
    }
  };

  const handleDownloadPDF = async () => {
    const element = resultRef.current;
    
    // Small delay for better rendering
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.setFont("helvetica", "bold");
    pdf.text("SwasthySense AI - Mental Health Report", 10, 10);
    pdf.addImage(imgData, "PNG", 10, 20, pdfWidth - 20, pdfHeight);
    pdf.save("swasthysense-ai-result.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Assessment Result</h1>

      {/* Capture this section for PDF */}
      <div ref={resultRef} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">SwasthySense AI</h2>
        
        {/* Color bar */}
        <div style={{ backgroundColor: stages[stage].color }} className="w-full h-6 rounded-full mt-4"></div>
        
        <p className="mt-4 text-lg font-semibold text-center">Your Mental Health Stage: {stage}</p>
        <h3 className="mt-4 font-bold">Your Score: {score}</h3>

        {/* Recommendations */}
        <h3 className="mt-4 font-bold">Recommendations:</h3>
        <ul className="list-disc pl-5">
          {stages[stage].recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>

        {/* Things to Avoid */}
        <h3 className="mt-4 font-bold">Things to Avoid:</h3>
        <ul className="list-disc pl-5">
          {stages[stage].avoid.map((av, index) => (
            <li key={index}>{av}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button onClick={handleExit} className=" cursor-pointer px-6 py-2 bg-red-500 text-white rounded-lg">Exit</button>
        <button onClick={handleDownloadPDF} className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg">Download report</button>
      </div>
    </div>
  );
};

export default Result;

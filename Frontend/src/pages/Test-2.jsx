import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question:
      "Have recent conflicts or challenges in your relationships (family, romantic, friendships) been causing you significant stress/emotional distress?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Do you feel unsupported or misunderstood by your family or close friends in times of need?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question: "Are you present in the moment while being around others?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Do you feel anxious, worried, or fearful about your future regarding education, career, or personal goals?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Do you feel tired or out of energy after performing little physical work?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Have you experienced any past trauma (such as abuse, violence, loss, or a difficult event) that still affects your emotional well-being?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question: "Do you sweat excessively?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Do you feel excessive breathing or shivering in stressful situations?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Do you overthink incidents or daily life events/work in a regular routine?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question:
      "Have you experienced any intrusive thoughts or flashbacks about past traumatic events even when you are not thinking about them?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
];

const Test2 = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const handleSelect = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((acc, val) => acc + (val !== null ? val : 0), 0);
    navigate("/result", { state: { score: totalScore } }); // Navigate to Result page with score
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Psychological Assessment</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              {qIndex + 1}. {q.question}
            </h2>
            {q.options.map((option, oIndex) => (
              <div
                key={oIndex}
                className={`p-2 mb-2 border rounded-lg cursor-pointer ${
                  answers[qIndex] === oIndex ? "bg-blue-300" : "bg-gray-100"
                }`}
                onClick={() => handleSelect(qIndex, oIndex)}
              >
                {option}
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Test2;

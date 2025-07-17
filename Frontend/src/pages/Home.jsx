import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Logo from "../assests/logo.png";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate("/signup");
    } else {
      navigate("/test");
    }
  };

  return (
    <div className="flex flex-col h-[65.9vh]">
      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-6 md:px-20 py-10 bg-white">
        <div className="md:w-1/2 flex justify-center">
          <img src={Logo} alt="Logo" className="w-40 md:w-80" />
        </div>

        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className={`text-2xl font-semibold ${user ? "text-[#008080]" : "text-red-600"}`}>
            {user ? `Welcome, ${user.name}! Now you can start.` : "Log in first before getting started."}
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-[#008080]">
            Your Mental Health Companion
          </h1>
          <p className="text-lg text-[#666666]">
            AI-powered detection and personalized recommendations for anxiety & hypertension.
          </p>

          <button
            onClick={handleGetStarted}
            className="bg-[#008080] text-white px-6 py-3 cursor-pointer rounded-lg text-lg font-medium hover:bg-[#007070] transition"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

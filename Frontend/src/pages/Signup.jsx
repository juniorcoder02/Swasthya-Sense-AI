import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection

const SignupLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); //  Initialize navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = isLogin ? "http://localhost:8080/api/auth/login" : "http://localhost:8080/api/auth/signup";
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // ✅ Always parse JSON
      console.log(data); // For debugging purposes
  
      alert(data.msg); // ✅ Properly display message
  
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // ✅ Redirect on success
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };
  

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-700 text-white font-bold py-2 rounded-lg hover:bg-teal-800 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-700 font-bold hover:underline"
          >
            {isLogin ? "Signup here" : "Login here"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default SignupLogin;

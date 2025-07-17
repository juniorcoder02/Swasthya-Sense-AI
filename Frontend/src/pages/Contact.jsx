import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-teal-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Have questions? We'd love to hear from you!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-28 resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white font-bold py-2 rounded-lg hover:bg-teal-800 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-8 text-center text-gray-700">
          <p><strong>Email:</strong> aadiqureshi89@gmail.com</p>
          <p><strong>Phone:</strong> +91 7249100670</p>
          <p><strong>Address:</strong> Shirpur, MH, India</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

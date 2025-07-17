import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">SwasthyaSense <span className="text-green-400">AI</span></h2>
          <p className="text-gray-300 mt-2">Empowering Mental Well-being with AI</p>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} SwasthyaSense AI. All rights reserved.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="mt-4 md:mt-0">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="mt-4 md:mt-0">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-light-blue-500">Twitter</a>
            <a href="#" className="hover:text-red-400">YouTube</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

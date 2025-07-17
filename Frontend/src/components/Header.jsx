import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Removed User icon
import { UserContext } from "../context/UserContext"; // Import context

const Header = () => {
  const { user, logout } = useContext(UserContext); // Get user & logout from context
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Calls logout function from context
    navigate("/"); // Redirect to home after logout
  };

  return (
    <header className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left Side - Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          SwasthyaSense <span className="text-green-400">AI</span>
        </Link>

        {/* Middle - Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
        </nav>

        {/* Right Side - Authentication */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="bg-light-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Signup/Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-teal-800 text-white py-4 px-6 space-y-4">
          <Link to="/" className="block">Home</Link>
          <Link to="/contact" className="block">Contact Us</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="block bg-light-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition"
            >
              Signup/Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;

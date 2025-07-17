import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Test2 from "./pages/Test-2";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/test" element={<Test />} />
            <Route path="/test-2" element={<Test2 />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;

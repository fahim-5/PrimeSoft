import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./ui/navbar/Navbar";
import Footer from "./ui/footer/Footer";
import CustomerService from "./features/CustomerCare/CustomerService";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Login from "./features/Auth/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/customer_service" element={<CustomerService />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

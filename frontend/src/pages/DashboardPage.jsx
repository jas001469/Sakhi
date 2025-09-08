import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Feature from "../components/FeatureSection";
import StatsTestimonialsSection from "../components/StatsTestimonialsSection";
import CommunityPage from "./CommunityPage";
import TestimonialPage from "../components/TestimonialPage";
import ContactSection from "../components/ContactSection";


const DashboardPage = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/MainUspPage", { replace: true }); // replaces history entry
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <CommunityPage />
      <StatsTestimonialsSection />
      <TestimonialPage />
      <ContactSection />
      
      
      
    
      
    </>
  );
};

export default DashboardPage;

import Navbar from "../components/Navbar";
import FloatingShape from "../components/FloatingShape";
import Hero from "../components/Hero";
import About from "../components/About";
import Feature from "../components/FeatureSection";
import StatsTestimonialsSection from "../components/StatsTestimonialsSection";
import Cta from "../components/CallToActionSection";

const DashboardPage = () => {
  return (
   
    <>
   
    <Navbar />  
    <Hero/>
    <About />
    <Feature />
    <StatsTestimonialsSection />
    <Cta/>
 

    </>
  );
};
export default DashboardPage;
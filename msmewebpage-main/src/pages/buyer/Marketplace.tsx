import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";
import FooterSection from "@/components/home/FooterSection";
import MainSection from "@/components/buyer/MainSection";
import WhyChooseSection from "@/components/buyer/WhyChooseSection";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import News from "@/pages/buyer/News";

const Marketplace = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, isLoading } = useAuth();

  console.log('=== Marketplace Component Debug ===');
  console.log('Auth State:', { isAuthenticated, isLoading, user: authUser });
  console.log('Current Location:', window.location.pathname);

  // Add useEffect to track component mounting
  useEffect(() => {
    console.log('Marketplace component mounted');
    return () => {
      console.log('Marketplace component unmounted');
    };
  }, []);

  if (!isAuthenticated && !isLoading) {
    console.log('Not authenticated, redirecting to login');
    navigate('/login');
    return null;
  }

  // Add a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-[#cf7d76] to-[#e3b3af]">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img 
                src="/lovable-uploads/34eef80b-db30-4981-aa71-f838c66de8dd.png" 
                alt="RepoMarket Logo" 
                className="w-16 h-16"
              />
              <div className="hidden md:flex items-center space-x-6">
                <a href="/buyer/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="/buyer/news" className="text-gray-700 hover:text-blue-600 transition-colors">New's</a>
                <a href="#FeaturedRepos" className="text-gray-700 hover:text-blue-600 transition-colors">Marketplace</a>
                <a href="#hackathons" className="text-gray-700 hover:text-blue-600 transition-colors">Hackathons</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/buyer/cart" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Cart</span>
              </Link>
              <Link 
                to="/buyer/profile" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-6 h-6" />
                <span>
                  {isLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : authUser?.name || "Profile"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        <MainSection />
        <WhyChooseSection />
        <FooterSection />
      </motion.div>
    </div>
  );
};

export default Marketplace;
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedRepos from "@/components/home/FeaturedRepos";
import Testimonials from "@/components/home/Testimonials";
import Hackathons from "@/components/home/Hackathons";
import FooterSection from "@/components/home/FooterSection";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#" },
  {
    label: "Features",
    href: "#features",
    children: [
      { label: "Smart Search", href: "#features" },
      { label: "Version Control", href: "#features" },
      { label: "Team Collaboration", href: "#features" },
    ],
  },
  { label: "Marketplace", href: "#FeaturedRepos" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-200",
          isScrolled ? "bg-white/90 border-gray-200 shadow-sm" : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="focus:outline-none"
              >
                <img 
                  src="/lovable-uploads/34eef80b-db30-4981-aa71-f838c66de8dd.png" 
                  alt="RepoMarket Logo" 
                  className="w-16 h-16"
                />
              </motion.a>

              <div className="hidden lg:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative nav-dropdown">
                    <button
                      onClick={() => {
                        if (link.children) {
                          setActiveDropdown(activeDropdown === link.label ? null : link.label);
                        } else {
                          scrollToSection(link.href);
                        }
                      }}
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span>{link.label}</span>
                      {link.children && (
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === link.label ? "rotate-180" : ""
                        )} />
                      )}
                    </button>

                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                      >
                        {link.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => scrollToSection(child.href)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                          >
                            {child.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repositories..." 
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all duration-300 hover:bg-gray-100"
                />
              </form>
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="hover:bg-gray-100"
              >
                Sign In
              </Button>

              <Button 
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign Up
              </Button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4 bg-white">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <button
                        onClick={() => {
                          if (link.children) {
                            setActiveDropdown(activeDropdown === link.label ? null : link.label);
                          } else {
                            scrollToSection(link.href);
                          }
                        }}
                        className="flex items-center justify-between w-full px-2 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg"
                      >
                        <span>{link.label}</span>
                        {link.children && (
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform",
                            activeDropdown === link.label ? "rotate-180" : ""
                          )} />
                        )}
                      </button>

                      {link.children && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="pl-4 mt-2 space-y-2"
                        >
                          {link.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => scrollToSection(child.href)}
                              className="block w-full text-left px-2 py-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg"
                            >
                              {child.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-100">
                    <form onSubmit={handleSearch} className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search repositories..." 
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </form>

                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/login")}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={() => navigate("/signup")}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <FeaturedRepos />
        <Hackathons />
        <Testimonials />
        <FooterSection />
      </motion.main>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, User, Bell, Search,
  Menu, X, ChevronDown, Activity,
  Package, MessageSquare, Star,
  TrendingUp, Filter, ArrowRight,
  Heart, Eye, Download, Tag,
  Clock, CheckCircle, Shield,
  Mail, ArrowUp, Zap, Users,
  BarChart, Gift, Sparkles,
  Bookmark, Share2, DollarSign,
  Award, Cpu, Code2, GitBranch,
  Layers, Settings2, Repeat, Rocket,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/home/FooterSection";
import MainSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/buyer/WhyChooseSection";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Repository {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  downloads: number;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
  thumbnail: string;
  featured?: boolean;
  trending?: boolean;
  lastUpdated: string;
  demoUrl?: string;
  documentation?: string;
  techStack: string[];
  features: string[];
  compatibility: string[];
  discount?: {
    percentage: number;
    endDate: string;
  };
  badges?: string[];
}

interface MarketplaceStats {
  totalRepositories: number;
  activeUsers: number;
  totalDownloads: number;
  averageRating: number;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: "1",
      title: "E-Commerce Platform Pro",
      description: "Complete e-commerce solution with advanced features, payment integration, and inventory management.",
      price: 299,
      rating: 4.8,
      reviews: 156,
      downloads: 1200,
      category: "E-Commerce",
      tags: ["React", "Node.js", "MongoDB"],
      author: {
        name: "TechPro Solutions",
        avatar: "/avatars/techpro.png",
        rating: 4.9
      },
      thumbnail: "/thumbnails/ecommerce-pro.png",
      featured: true,
      lastUpdated: "2024-03-15",
      demoUrl: "https://demo.ecommerce-pro.com",
      documentation: "https://docs.ecommerce-pro.com",
      techStack: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
      features: [
        "Multi-vendor support",
        "Real-time analytics",
        "AI-powered recommendations",
        "Advanced SEO tools"
      ],
      compatibility: ["Web", "Mobile", "API"],
      discount: {
        percentage: 20,
        endDate: "2024-04-01"
      },
      badges: ["Best Seller", "Top Rated", "Verified"]
    },
    {
      id: "2",
      title: "AI Chat Assistant",
      description: "Intelligent chatbot with natural language processing and customizable responses.",
      price: 199,
      rating: 4.7,
      reviews: 89,
      downloads: 800,
      category: "AI/ML",
      tags: ["Python", "TensorFlow", "NLP"],
      author: {
        name: "AI Innovators",
        avatar: "/avatars/ai-innovators.png",
        rating: 4.8
      },
      thumbnail: "/thumbnails/ai-chat.png",
      trending: true,
      lastUpdated: "2024-03-10",
      techStack: ["Python", "TensorFlow", "Flask", "Docker"],
      features: [
        "Natural language processing",
        "Multi-language support",
        "Custom training options",
        "API integration"
      ],
      compatibility: ["Web", "API", "Cloud"]
    },
    // Add more repository data as needed
  ]);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "ecommerce", name: "E-Commerce" },
    { id: "ai-ml", name: "AI/ML" },
    { id: "analytics", name: "Analytics" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "security", name: "Security" }
  ];

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [stats] = useState<MarketplaceStats>({
    totalRepositories: 15000,
    activeUsers: 50000,
    totalDownloads: 1000000,
    averageRating: 4.8
  });

  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filters, setFilters] = useState({
    rating: 0,
    techStack: [] as string[],
    features: [] as string[],
    compatibility: [] as string[]
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log('Marketplace component mounted');
    return () => {
      console.log('Marketplace component unmounted');
    };
  }, []);

  useEffect(() => {
    const handleShowScrollTop = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleShowScrollTop);
    return () => window.removeEventListener('scroll', handleShowScrollTop);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again."
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buyer/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const profileMenuItems = [
    { label: "My Profile", href: "/buyer/profile", icon: User },
    { label: "My Orders", href: "/buyer/orders", icon: Package },
    { label: "Messages", href: "/buyer/messages", icon: MessageSquare },
    { label: "Divider", divider: true, icon: null },
    { label: "Sign Out", icon: Activity, onClick: handleLogout }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    setEmail("");
    setShowNewsletter(false);
  };

  if (!isAuthenticated && !isLoading) {
    console.log('Not authenticated, redirecting to login');
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const FeaturedSection = () => (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Repositories</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repositories.filter(repo => repo.featured).map(repo => (
            <motion.div
              key={repo.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img 
                  src={repo.thumbnail} 
                  alt={repo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {repo.category}
                  </span>
                  {repo.featured && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{repo.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{repo.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={repo.author.avatar} 
                      alt={repo.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{repo.author.name}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{repo.author.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900">${repo.price}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      <span>{repo.downloads}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      <span>{repo.rating}</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const TrendingSection = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {repositories.filter(repo => repo.trending).map(repo => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <img 
                  src={repo.author.avatar} 
                  alt={repo.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{repo.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{repo.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900">${repo.price}</p>
                <Button size="sm">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const CategorySection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200",
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              )}
            >
              <p className="font-medium text-center">{category.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );

  const WhyChooseUsSection = () => (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose RepoMarket</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Secure & Verified",
              description: "All repositories are thoroughly vetted for security and quality."
            },
            {
              icon: CheckCircle,
              title: "Quality Assured",
              description: "Rigorous quality checks and peer reviews for all submissions."
            },
            {
              icon: Clock,
              title: "24/7 Support",
              description: "Round-the-clock technical support and assistance."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const StatisticsSection = () => (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Package, value: stats.totalRepositories.toLocaleString(), label: "Total Repositories" },
            { icon: Users, value: stats.activeUsers.toLocaleString(), label: "Active Users" },
            { icon: Download, value: stats.totalDownloads.toLocaleString(), label: "Total Downloads" },
            { icon: Star, value: stats.averageRating.toFixed(1), label: "Average Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const NewsletterSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get notified about new repositories, features, and developer updates.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex space-x-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );

  const PopularTagsSection = () => {
    const popularTags = [
      "React", "Node.js", "Python", "Machine Learning", "API",
      "Database", "Cloud", "Security", "Mobile", "Analytics"
    ];

    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
            {popularTags.map((tag, index) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const NewArrivalsSection = () => (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-gray-600 mt-2">Check out our latest repository additions</p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>View All New</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repositories.slice(0, 3).map(repo => (
            <motion.div
              key={repo.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                  New
                </div>
                <img 
                  src={repo.thumbnail} 
                  alt={repo.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{repo.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{repo.description}</p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Mobile Menu Component
  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 bg-white z-50 lg:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <img 
                src="/lovable-uploads/34eef80b-db30-4981-aa71-f838c66de8dd.png" 
                alt="RepoMarket Logo" 
                className="w-12 h-12"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {[
                  { path: "/buyer/marketplace", label: "Home", icon: Activity },
                  { path: "/buyer/news", label: "News", icon: Package },
                  { path: "/buyer/explore", label: "Explore", icon: Star },
                  { path: "/buyer/hackathons", label: "Hackathons", icon: Zap },
                  { path: "/buyer/contact", label: "Contact", icon: Mail }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <Button
                onClick={handleLogout}
                className="w-full justify-center"
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Scroll to Top Button
  const ScrollToTopButton = () => (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <ArrowUp className="w-6 h-6 text-gray-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );

  // Enhanced Quick View Modal
  const QuickViewModal = () => {
    if (!selectedRepo) return null;

    return (
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedRepo.thumbnail}
                  alt={selectedRepo.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                {selectedRepo.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full">
                    {selectedRepo.discount.percentage}% OFF
                  </div>
                )}
                <button
                  onClick={() => setShowQuickView(false)}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {selectedRepo.badges?.map(badge => (
                    <span key={badge} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {badge}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedRepo.title}</h2>
                <p className="text-gray-600 mb-6">{selectedRepo.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedRepo.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {selectedRepo.discount && (
                        <span className="text-sm text-gray-500 line-through">
                          ${selectedRepo.price}
                        </span>
                      )}
                      <p className="text-2xl font-bold text-gray-900">
                        ${selectedRepo.discount 
                          ? selectedRepo.price * (1 - selectedRepo.discount.percentage / 100)
                          : selectedRepo.price
                        }
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Enhanced Filter Section
  const FilterSection = () => (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded",
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                )}
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded",
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Repeat className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  // Enhanced Featured Card
  const RepositoryCard = ({ repo }: { repo: Repository }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group"
    >
      <div className="relative">
        <img 
          src={repo.thumbnail} 
          alt={repo.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/90 rounded-full shadow-lg"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
        {repo.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {repo.discount.percentage}% OFF
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {repo.badges?.map(badge => (
            <span key={badge} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              {badge}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {repo.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{repo.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tech}
            </span>
          ))}
          {repo.techStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              +{repo.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src={repo.author.avatar} 
              alt={repo.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{repo.author.name}</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{repo.author.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {repo.discount && (
              <span className="text-sm text-gray-500 line-through block">
                ${repo.price}
              </span>
            )}
            <p className="text-xl font-bold text-gray-900">
              ${repo.discount 
                ? repo.price * (1 - repo.discount.percentage / 100)
                : repo.price
              }
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              <span>{repo.downloads}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>{repo.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{new Date(repo.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          <Button 
            onClick={() => {
              setSelectedRepo(repo);
              setShowQuickView(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Quick View
          </Button>
        </div>
      </div>
    </motion.div>
  );

  // Enhanced Features Section
  const FeaturesSection = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Build Amazing Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Code2,
              title: "Clean Code",
              description: "Well-documented and maintainable code following best practices"
            },
            {
              icon: Rocket,
              title: "Quick Setup",
              description: "Get started in minutes with our detailed documentation"
            },
            {
              icon: Settings2,
              title: "Customizable",
              description: "Easily adapt and modify to match your specific needs"
            },
            {
              icon: Shield,
              title: "Secure",
              description: "Built with security best practices and regular updates"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

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
                {[
                  { path: "/buyer/marketplace", label: "Home" },
                  { path: "/buyer/news", label: "News" },
                  { path: "#FeaturedRepos", label: "Marketplace" },
                  { path: "#hackathons", label: "Hackathons" },
                  { path: "#contact", label: "Contact" }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                      window.location.pathname === item.path && "text-blue-600"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
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

              <Link 
                to="/buyer/cart" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* Profile Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {authUser?.name?.charAt(0) || "U"}
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    showProfileMenu ? "rotate-180" : ""
                  )} />
                </Button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{authUser?.name}</p>
                        <p className="text-sm text-gray-500">{authUser?.email}</p>
                      </div>
                      {profileMenuItems.map((item, index) => (
                        item.divider ? (
                          <div key={index} className="my-2 border-b border-gray-100" />
                        ) : (
                          <button
                            key={index}
                            onClick={() => {
                              setShowProfileMenu(false);
                              if (item.onClick) {
                                item.onClick();
                              } else if (item.href) {
                                navigate(item.href);
                              }
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
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
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        <MainSection />
        <StatisticsSection />
        <FeaturesSection />
        <FilterSection />
        <CategorySection />
        <FeaturedSection />
        <NewArrivalsSection />
        <TrendingSection />
        <PopularTagsSection />
        <WhyChooseUsSection />
        <NewsletterSection />
        <FooterSection />
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Marketplace;
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  ArrowRight, 
  Filter,
  Search,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Award,
  Briefcase,
  GraduationCap,
  Timer,
  X,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Opportunity {
  id: string;
  type: 'hackathon' | 'job' | 'internship';
  title: string;
  company: string;
  location: string;
  deadline: string;
  description: string;
  tags: string[];
  status: 'active' | 'upcoming' | 'closed';
  salary?: string;
  duration?: string;
  prizePool?: string;
  requirements?: string[];
}

const Opportunities = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'hackathon' | 'job' | 'internship'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: 'all',
    salary: 'all',
    experience: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('deadline');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const opportunities: Opportunity[] = [
    {
      id: "hack1",
      type: "hackathon",
      title: "Global Tech Innovation Challenge",
      company: "TechCorp",
      location: "Virtual",
      deadline: "2024-04-15",
      description: "48-hour hackathon focused on AI and sustainability solutions. Build innovative solutions that address real-world environmental challenges.",
      tags: ["AI", "Sustainability", "Innovation"],
      status: "upcoming",
      prizePool: "$50,000",
      duration: "48 hours",
      requirements: ["Team of 2-4", "Open to all skill levels", "Valid student ID"]
    },
    {
      id: "job1",
      type: "job",
      title: "Senior Full Stack Developer",
      company: "InnovateX",
      location: "Remote / New York",
      deadline: "2024-03-30",
      description: "Join our team to build scalable web applications using modern technologies. Work on challenging projects with global impact.",
      tags: ["React", "Node.js", "MongoDB"],
      status: "active",
      salary: "$120k - $160k",
      requirements: ["5+ years experience", "BS in Computer Science", "Strong problem-solving skills"]
    },
    {
      id: "intern1",
      type: "internship",
      title: "Summer Software Engineering Intern",
      company: "StartupHub",
      location: "San Francisco",
      deadline: "2024-04-01",
      description: "3-month internship program for aspiring developers. Get hands-on experience with real projects and mentorship.",
      tags: ["JavaScript", "Python", "Machine Learning"],
      status: "active",
      salary: "$45/hour",
      duration: "3 months",
      requirements: ["Currently enrolled student", "Programming experience", "Strong communication skills"]
    },
    {
      id: "hack2",
      type: "hackathon",
      title: "Blockchain Innovation Hackathon",
      company: "CryptoTech",
      location: "Hybrid",
      deadline: "2024-05-01",
      description: "Build the future of Web3. Create innovative solutions using blockchain technology and smart contracts.",
      tags: ["Blockchain", "Web3", "Smart Contracts", "DeFi"],
      status: "upcoming",
      prizePool: "$75,000",
      duration: "72 hours",
      requirements: ["Knowledge of Solidity", "Team of 3-5"]
    },
    {
      id: "job2",
      type: "job",
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote",
      deadline: "2024-04-10",
      description: "Help us build and maintain robust cloud infrastructure. Work with cutting-edge technologies and automation tools.",
      tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
      status: "active",
      salary: "$130k - $180k",
      requirements: ["4+ years DevOps experience", "Cloud certification"]
    },
    {
      id: "intern2",
      type: "internship",
      title: "Data Science Intern",
      company: "DataMinds",
      location: "Boston",
      deadline: "2024-03-25",
      description: "Work on real-world data science projects. Apply machine learning to solve complex business problems.",
      tags: ["Python", "ML", "Data Analysis", "Statistics"],
      status: "active",
      salary: "$40/hour",
      duration: "6 months",
      requirements: ["Statistics background", "Python proficiency"]
    },
    {
      id: "hack3",
      type: "hackathon",
      title: "HealthTech Innovation Challenge",
      company: "MedTech Solutions",
      location: "Virtual",
      deadline: "2024-06-01",
      description: "Create innovative solutions for healthcare challenges using modern technology and AI.",
      tags: ["Healthcare", "AI", "IoT", "Mobile"],
      status: "upcoming",
      prizePool: "$40,000",
      duration: "36 hours",
      requirements: ["Healthcare domain knowledge", "Team of 2-4"]
    },
    {
      id: "job3",
      type: "job",
      title: "Mobile App Developer",
      company: "AppNova",
      location: "Austin",
      deadline: "2024-04-20",
      description: "Join our mobile development team to create cutting-edge iOS and Android applications.",
      tags: ["React Native", "iOS", "Android", "Mobile"],
      status: "active",
      salary: "$110k - $150k",
      requirements: ["3+ years mobile development", "App Store publications"]
    }
  ];

  const applyFilters = (opps: Opportunity[]) => {
    return opps.filter(opp => {
      const matchesTab = activeTab === 'all' || opp.type === activeTab;
      const matchesSearch = searchQuery === '' || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = filters.location === 'all' || opp.location.includes(filters.location);
      const matchesStatus = filters.status === 'all' || opp.status === filters.status;
      
      return matchesTab && matchesSearch && matchesLocation && matchesStatus;
    });
  };

  const sortOpportunities = (opps: Opportunity[]) => {
    return [...opps].sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'salary':
          const getSalaryValue = (salary?: string) => {
            if (!salary) return 0;
            const match = salary.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
          };
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        default:
          return 0;
      }
    });
  };

  const filteredOpportunities = sortOpportunities(applyFilters(opportunities));

  const tabs = [
    { id: 'all', label: 'All Opportunities', icon: Briefcase },
    { id: 'hackathon', label: 'Hackathons', icon: Award },
    { id: 'job', label: 'Jobs', icon: Building },
    { id: 'internship', label: 'Internships', icon: GraduationCap }
  ];

  const opportunityVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Opportunities
            </h1>
            <p className="text-gray-600 mt-2">
              Discover new project opportunities and collaborations
            </p>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:w-auto w-full">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Opportunities</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tabs */}
        <motion.div 
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <TooltipProvider key={tab.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className="flex items-center"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View {tab.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          /* Opportunities Grid */
          <AnimatePresence mode="wait">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredOpportunities.map((opp, index) => (
                <motion.div
                  key={opp.id}
                  layoutId={opp.id}
                  variants={opportunityVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setExpandedCard(expandedCard === opp.id ? null : opp.id)}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="collapsed"
                    animate={expandedCard === opp.id ? "expanded" : "collapsed"}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">{opp.title}</h3>
                      <Badge variant={
                        opp.status === 'active' ? "default" :
                        opp.status === 'upcoming' ? "secondary" : "outline"
                      }>
                        {opp.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {opp.company}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {opp.location}
                      </div>
                      {opp.salary && (
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {opp.salary}
                        </div>
                      )}
                      {opp.duration && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {opp.duration}
                        </div>
                      )}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: expandedCard === opp.id ? 1 : 0,
                        height: expandedCard === opp.id ? "auto" : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 text-sm mb-4">
                        {opp.description}
                      </p>

                      {opp.requirements && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {opp.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opp.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        Apply now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filteredOpportunities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No opportunities found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  location: 'all',
                  salary: 'all',
                  experience: 'all',
                  status: 'all'
                });
                setActiveTab('all');
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Opportunities; 
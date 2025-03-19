import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GitBranch, Search, Filter,
  Plus, Star, Eye, Lock,
  Calendar, Users, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  email: string;
  name: string;
  description: string;
  organization: string;
  isActive: boolean;
  createdAt: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userEmail = localStorage.getItem('email'); // Get user email from storage
        if (!userEmail) {
          setError('User email not found');
          setLoading(false);
          return;
        }

        // Add retry mechanism
        const fetchWithRetry = async (attempt: number) => {
          try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
            const response = await fetch(`${baseUrl}/api/projects/developer/${userEmail}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            setProjects(data.data || []); // Assuming the API returns data in { data: Project[] } format
            setLoading(false);
          } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt < MAX_RETRIES - 1) {
              setRetryCount(attempt + 1);
              // Exponential backoff
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
              return fetchWithRetry(attempt + 1);
            }
            throw error;
          }
        };

        await fetchWithRetry(0);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to connect to the server. Please check if the server is running and try again.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Projects
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and collaborate on your development projects
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/developer/projects/new")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              whileHover="hover"
              className={cn(
                "relative overflow-hidden rounded-xl bg-gradient-to-br backdrop-blur-sm p-6 shadow-lg border border-white/20",
                project.isActive ? "from-green-500/5 to-green-500/10" : "from-gray-500/5 to-gray-500/10"
              )}
              onClick={() => navigate(`/developer/projects/${project._id}`)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <Eye className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description || 'No description provided'}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{project.organization}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
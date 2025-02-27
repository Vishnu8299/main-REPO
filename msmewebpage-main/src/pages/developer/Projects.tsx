import { useState } from "react";
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

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Example projects data
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      visibility: "public",
      stars: 128,
      lastUpdated: "2 hours ago",
      contributors: 5,
      status: "active",
      gradient: "from-blue-500/5 to-blue-500/10"
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      description: "Real-time analytics dashboard with data visualization",
      visibility: "private",
      stars: 89,
      lastUpdated: "1 day ago",
      contributors: 3,
      status: "completed",
      gradient: "from-purple-500/5 to-purple-500/10"
    },
    {
      id: 3,
      name: "Mobile App Template",
      description: "Production-ready mobile app starter template",
      visibility: "public",
      stars: 256,
      lastUpdated: "3 days ago",
      contributors: 8,
      status: "in-progress",
      gradient: "from-green-500/5 to-green-500/10"
    }
  ];

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
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className={cn(
                "relative overflow-hidden rounded-xl bg-gradient-to-br backdrop-blur-sm p-6 shadow-lg border border-white/20",
                project.gradient
              )}
              onClick={() => navigate(`/developer/projects/${project.id}`)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.visibility === "public" ? (
                    <Eye className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{project.contributors}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{project.lastUpdated}</span>
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
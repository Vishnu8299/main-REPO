import { motion } from "framer-motion";
import { 
  Search, 
  History, 
  Users, 
  Shield, 
  Zap, 
  Code2,
  MessageSquare,
  Star,
  Download,
  Share2,
  Boxes,
  Settings
} from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Smart Discovery",
    description: "Find the perfect projects with our advanced search and filtering system.",
    color: "bg-blue-500",
  },
  {
    icon: <History className="w-6 h-6" />,
    title: "Version History",
    description: "Track changes and manage different versions of your projects seamlessly.",
    color: "bg-purple-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Work together efficiently with built-in collaboration tools and features.",
    color: "bg-green-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security First",
    description: "Enterprise-grade security with automated vulnerability scanning.",
    color: "bg-red-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Performance",
    description: "Lightning-fast project operations and downloads.",
    color: "bg-yellow-500",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Code Quality",
    description: "Built-in code quality tools and automated code reviews.",
    color: "bg-indigo-500",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Easy Sharing",
    description: "Share your projects with the community or keep them private.",
    color: "bg-pink-500",
  },
  {
    icon: <Boxes className="w-6 h-6" />,
    title: "Project Templates",
    description: "Start quickly with customizable project templates and boilerplates.",
    color: "bg-orange-500",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Custom Workflows",
    description: "Create and customize your development workflows easily.",
    color: "bg-teal-500",
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600"
          >
            Platform Features
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Everything You Need to Build Amazing Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl text-gray-600"
          >
            Powerful features to help you develop, manage, and grow your software projects
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} text-white flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-16 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
          >
            <span className="font-medium">Explore all features</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
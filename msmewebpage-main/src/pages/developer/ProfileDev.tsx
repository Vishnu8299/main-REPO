import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "@/types";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Edit2, LogOut, Save, X, MapPin, Building2, 
  Phone, Mail, Circle, Users, BookOpen, Star,
  Calendar, ShoppingBag, CreditCard, Heart, Package, Bell, Settings,
  Truck, History, UserCircle,
  GitBranch, Code, Terminal, FileCode,
  GitCommit, GitPullRequest, Activity, Lock,
  Newspaper,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const ProfileDev = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        if (authUser) {
          setUser(authUser);
          setError(null);
        } else {
          setError('No user data available');
        }
      } catch (error) {
        console.error("Error initializing profile:", error);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      initializeProfile();
    }
  }, [authUser, authLoading]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || ''
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await api.put(`/api/users/${user?.id}`, editForm);
      setUser({ ...user, ...editForm } as User);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#f6f8fa] py-12 px-4"
      >
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please log in to view your profile</p>
            <Button onClick={() => navigate('/login')} className="mt-4">
              Go to Login
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-[#cf7d76] to-[#e3b3af]">
      {/* Navigation - Same as Marketplace */}
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
              <div className="hidden lg:flex items-center space-x-6">
                {[
                  { path: "dashboard", href: "/developer/dashboard", label: "Overview", icon: Activity },
                  { path: "repositories", href: "/developer/repositories", label: "Repositories", icon: Code },
                  { path: "projects", href: "/developer/projects", label: "Projects", icon: Package },
                  { path: "analytics", href: "/developer/analytics", label: "Analytics", icon: TrendingUp }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                      window.location.pathname === item.path && "text-blue-600"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[150px] w-[150px] rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="mb-2"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                  )}
                  <p className="text-gray-500">Developer Account</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center text-gray-600">
                  <Building2 size={18} className="mr-3" />
                  <span>{user?.organization || 'Independent Developer'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-3" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-3" />
                  {isEditing ? (
                    <Input
                      value={editForm.phoneNumber}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="w-full"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <span>{user?.phoneNumber || 'No phone number'}</span>
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-3" />
                  <span>Member since {user?.createdAt ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(new Date(user.createdAt)) : 'N/A'}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">Cancel</Button>
                    <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={handleEdit} className="w-full">
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Developer Stats - Empty */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Developer Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Repositories</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                  <div className="text-sm text-gray-600">Stars</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Contributions</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Terminal size={16} className="mr-2" />
                  My Repositories
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Package size={16} className="mr-2" />
                  My Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Enhanced */}
          <div className="space-y-6">
            {/* Recent Repositories - Empty */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Repositories</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileCode size={16} className="mr-2" />
                    New Repository
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitBranch size={16} className="mr-2" />
                    View All
                  </Button>
                </div>
              </div>
              <div className="text-center py-8 text-gray-500">
                <GitBranch className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No repositories yet</p>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">My Projects</h2>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Package size={16} className="mr-2" />
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-6 text-center">
                  <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No projects yet</p>
                  <Button variant="link" className="mt-2">Create Project</Button>
                </div>
              </div>
            </div>

            {/* Recent Activity - Empty */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Button variant="outline" size="sm">
                  <Activity size={16} className="mr-2" />
                  View All
                </Button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDev;
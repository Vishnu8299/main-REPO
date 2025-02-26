import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DeveloperDashboard from "@/pages/developer/DeveloperDashboard";
import ProfileDev from "@/pages/developer/ProfileDev";
import Marketplace from "@/pages/buyer/Marketplace";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import SplashScreen from '@/components/SplashScreen';
import BuyerProfile from "./pages/buyer/Profile";
import News from "@/pages/buyer/News";


const queryClient = new QueryClient();

interface PrivateRouteProps {
  children: React.ReactNode;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  console.log('PrivateRoute Check:', {
    isAuthenticated,
    userRole: user?.role,
    requiredRole: role,
    user,
    isLoading
  });

  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  if (!user || user.role.toUpperCase() !== role.toUpperCase()) {
    console.log('Invalid role, redirecting to home');
    return <Navigate to="/home" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                {/* Admin Routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <PrivateRoute role="ADMIN">
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <PrivateRoute role="ADMIN">
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                {/* Developer Routes */}
                <Route 
                  path="/developer/*" 
                  element={
                    <PrivateRoute role="DEVELOPER">
                      <DeveloperDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/developer/profileDev" 
                  element={
                    <PrivateRoute role="BUYER">
                      <BuyerProfile />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/developer/profile" 
                  element={
                    <PrivateRoute role="DEVELOPER">
                      <ProfileDev />
                    </PrivateRoute>
                  } 
                />
                
                {/* Buyer Routes */}
                <Route 
                  path="/buyer/marketplace" 
                  element={
                    <PrivateRoute role="BUYER">
                      <Marketplace />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/buyer/*" 
                  element={
                    <PrivateRoute role="BUYER">
                      <Marketplace />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/buyer/profile" 
                  element={
                    <PrivateRoute role="BUYER">
                      <BuyerProfile />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/buyer/news" 
                  element={
                    <PrivateRoute role="BUYER">
                      <News />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
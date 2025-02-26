import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import MenuBar from '@/components/shared/MenuBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import {
  Users,
  Package,
  DollarSign,
  Award,
  Loader2,
  RefreshCcw,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

// Create API client
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AdminStats {
  totalUsers: number;
  totalRepositories: number;
  totalRevenue: number;
  activeHackathons: number;
  recentActivities: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    status: 'pending' | 'completed' | 'failed';
  }>;
  pendingApprovals: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
  userGrowth: number;
  repoGrowth: number;
  revenueGrowth: number;
}

const AdminDashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRepositories: 0,
    totalRevenue: 0,
    activeHackathons: 0,
    recentActivities: [],
    pendingApprovals: [],
    userGrowth: 0,
    repoGrowth: 0,
    revenueGrowth: 0,
  });

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      setAdminStats(response.data);
      toast.success('Dashboard updated successfully');
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      toast.error('Failed to load admin statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.post(`/admin/approvals/${id}`, { status });
      toast.success(`Item ${status} successfully`);
      fetchAdminStats(); // Refresh data
    } catch (error) {
      console.error('Failed to update approval:', error);
      toast.error('Failed to update approval status');
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-green-500';
      case 'failed':
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <MenuBar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            onClick={fetchAdminStats}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
              <Progress value={adminStats.userGrowth} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {adminStats.userGrowth}% growth from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repositories</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalRepositories}</div>
              <Progress value={adminStats.repoGrowth} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {adminStats.repoGrowth}% growth from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{adminStats.totalRevenue.toLocaleString()}</div>
              <Progress value={adminStats.revenueGrowth} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {adminStats.revenueGrowth}% growth from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hackathons</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeHackathons}</div>
              <div className="mt-2 text-sm">
                {adminStats.activeHackathons > 0 ? (
                  <span className="text-green-500">● Live now</span>
                ) : (
                  <span className="text-gray-500">No active hackathons</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminStats.recentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>
                          <span className={getStatusColor(activity.status)}>
                            {activity.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminStats.pendingApprovals.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{approval.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {approval.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{approval.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                              onClick={() => handleApproval(approval.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                              onClick={() => handleApproval(approval.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

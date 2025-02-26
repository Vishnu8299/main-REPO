import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Code2,
  Trophy,
  TrendingUp,
  Bell,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '2,345', icon: Users, change: '+12%', trend: 'up' },
  { name: 'Active Projects', value: '89', icon: Code2, change: '+23%', trend: 'up' },
  { name: 'Hackathons', value: '12', icon: Trophy, change: '+8%', trend: 'up' },
  { name: 'Revenue', value: '$45,678', icon: TrendingUp, change: '+16%', trend: 'up' },
];

const recentActivity = [
  {
    id: 1,
    type: 'alert',
    message: 'New user registration spike detected',
    time: '2 hours ago',
    icon: AlertCircle,
    severity: 'warning',
  },
  {
    id: 2,
    type: 'success',
    message: 'System maintenance completed successfully',
    time: '5 hours ago',
    icon: CheckCircle2,
    severity: 'success',
  },
  {
    id: 3,
    type: 'info',
    message: 'New hackathon registration opened',
    time: '1 day ago',
    icon: Trophy,
    severity: 'info',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'AI Hackathon 2024',
    date: 'Jan 15, 2024',
    participants: 120,
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Web3 Developer Summit',
    date: 'Jan 20, 2024',
    participants: 85,
    status: 'Registration Open',
  },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">Monitor and manage your platform</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gray-800 border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          {stat.name}
                        </p>
                        <p className="text-2xl font-semibold text-white mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-500/20 rounded-full">
                        <Icon className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className={`text-${stat.trend === 'up' ? 'green' : 'red'}-400 text-sm font-medium`}>
                        {stat.change}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 p-6 bg-gray-800 border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-${activity.severity}-500/20`}>
                        <Icon className={`h-5 w-5 text-${activity.severity}-500`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          <Clock className="inline-block h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <div className="mt-2 flex justify-between text-sm text-gray-400">
                      <span>{event.date}</span>
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

import React from 'react';
import { GlassContainer, Button, Avatar } from '@9ja/ui';
import { 
  Users, 
  MessageSquare, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', users: 4000 },
  { name: 'Tue', users: 3000 },
  { name: 'Wed', users: 2000 },
  { name: 'Thu', users: 2780 },
  { name: 'Fri', users: 1890 },
  { name: 'Sat', users: 2390 },
  { name: 'Sun', users: 3490 },
];

export default function AdminApp() {
  return (
    <div className="min-h-screen bg-[#f8fcf9] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">9ja Admin</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<BarChart3 size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<ShieldAlert size={20} />} label="Moderation" />
          <NavItem icon={<MessageSquare size={20} />} label="Broadcasts" />
          <NavItem icon={<TrendingUp size={20} />} label="Revenue" />
          <NavItem icon={<Settings size={20} />} label="System Settings" />
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar name="Admin User" />
            <div>
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search everything..."
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2 h-auto rounded-full relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <Button>Generate Report</Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard label="Total Users" value="1.2M" change="+12%" icon={<Users className="text-blue-500" />} />
            <StatCard label="Active Chats" value="450K" change="+5%" icon={<MessageSquare className="text-green-500" />} />
            <StatCard label="Reports" value="12" change="-2%" icon={<ShieldAlert className="text-orange-500" />} />
            <StatCard label="Revenue" value="$42,000" change="+18%" icon={<TrendingUp className="text-purple-500" />} />
          </div>

          {/* Analytics Chart */}
          <GlassContainer className="bg-white border-none shadow-sm h-80 flex flex-col">
            <h3 className="text-lg font-semibold mb-6">User Growth Overview</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#008751" strokeWidth={3} dot={{ r: 4, fill: '#008751' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassContainer>

          {/* Recent Activities */}
          <div className="grid grid-cols-2 gap-6">
            <GlassContainer className="bg-white border-none shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Pending Moderation</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Avatar name="Spam User" />
                      <div>
                        <p className="text-sm font-medium text-red-500">Suspicious Activity</p>
                        <p className="text-xs text-gray-400">User ID: #8821{i}</p>
                      </div>
                    </div>
                    <Button variant="secondary" className="px-3 py-1.5 text-xs">Review</Button>
                  </div>
                ))}
              </div>
            </GlassContainer>
            
            <GlassContainer className="bg-white border-none shadow-sm">
              <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
              <div className="space-y-4">
                <AlertItem type="success" message="Database backup completed successfully." />
                <AlertItem type="warning" message="High latency detected in West Africa node." />
                <AlertItem type="info" message="AI Model v2.4 successfully deployed." />
              </div>
            </GlassContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
    }`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

function StatCard({ label, value, change, icon }: any) {
  return (
    <GlassContainer className="bg-white border-none shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className={`text-xs font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </GlassContainer>
  );
}

function AlertItem({ type, message }: any) {
  const colors: any = {
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <div className={`p-3 rounded-xl border text-sm ${colors[type]}`}>
      {message}
    </div>
  );
}

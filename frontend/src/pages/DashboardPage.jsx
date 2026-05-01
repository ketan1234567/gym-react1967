import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import {
  Users, UserCheck, Activity, MapPin, TrendingUp, Clock, AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [locationStats, setLocationStats] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, chartRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/chart-data')
      ]);
      setStats(statsRes.data);
      console.log(chartRes.data)
      if (chartRes.data) {

        setRecentCheckIns(chartRes.data.recentCheckIns || []);
        setLocationStats(chartRes.data.locationStats || []);
        setActiveSessions(chartRes.data.activeSessions || []);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-24" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  const capacityPercent = stats?.maxCapacity ? Math.round(((stats?.currentlyActive || 0) / stats.maxCapacity) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of gym access and attendance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Employees</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.totalEmployees || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today&apos;s Check-ins</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.todayCheckIns || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Currently Active</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.currentlyActive || 0}</p>
                <p className="text-xs text-slate-400 mt-1">of {stats?.maxCapacity || 50} max</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card className="border-slate-200/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Violations</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats?.violations || 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Capacity Bar */}
      <Card className="border-slate-200/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-slate-800">Current Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${capacityPercent > 80 ? 'bg-red-500' : capacityPercent > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              {stats?.currentlyActive || 0} / {stats?.maxCapacity || 50}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{capacityPercent}% capacity reached</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Distribution */}
        <Card className="border-slate-200/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" /> Location Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {locationStats.length > 0 ? (
              <div className="space-y-3">
                {locationStats.map((loc) => {
                  const maxCount = Math.max(...locationStats.map(l => l.count || 0), 1);
                  const width = ((loc.count || 0) / maxCount) * 100;
                  return (
                    <div key={loc.name || loc.location}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{loc.name || loc.location}</span>
                        <span className="text-slate-500">{loc.count || 0}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${Math.max(width, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-sm">
                No location data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="border-slate-200/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Active Sessions
            </CardTitle>
            <CardDescription>Employees currently checked in</CardDescription>
          </CardHeader>
          <CardContent>
            {activeSessions.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">
                        {session.employee?.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{session.employee?.name || session.employeeId}</p>
                        <p className="text-xs text-slate-400">{session.location || 'Main Gym'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {session.checkIn ? format(new Date(session.checkIn), 'hh:mm a') : '-'}
                      </p>
                      <Badge variant="success" className="text-[10px]">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-sm">
                No active sessions
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Check-ins */}
      {/* <Card className="border-slate-200/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Recent Check-ins
          </CardTitle>
          <CardDescription>Latest gym access activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden sm:table-cell">Department</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCheckIns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                    No recent check-ins
                  </TableCell>
                </TableRow>
              ) : (
                recentCheckIns.slice(0, 10).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <p className="font-medium text-slate-800">{log.employee?.name || log.employeeId}</p>
                      <p className="text-xs text-slate-400">{log.employee?.employeeId || ''}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{log.employee?.department || '-'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.status === 'checked-in' ? 'success' : 'info'}>
                        {log.status === 'checked-in' ? 'Check In' : 'Check Out'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-slate-600 text-sm">{log.location || '-'}</TableCell>
                    <TableCell className="text-slate-600 text-sm whitespace-nowrap">
                      {log.checkIn ? format(new Date(log.checkIn), 'hh:mm a') : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}

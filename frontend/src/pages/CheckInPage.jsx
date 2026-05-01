import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Select } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import { LogIn, LogOut, Users, Activity, Search, Clock, MapPin, ShieldAlert } from 'lucide-react';

export default function CheckInPage() {
  const [activeTab, setActiveTab] = useState('checkin');
  const [employee_id, setemployee_id] = useState('');
  const [location_id, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsLoading, setStatsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    fetchEmployees();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Stats error:', error);
    } finally {
      setStatsLoading(false);
    }
  };

const fetchEmployees = async () => {
  try {
    const res = await api.get('/employees');
    setEmployees(res.data.employees || []); // ✅ correct
  } catch (error) {
    console.error('Employees error:', error);
  }
};






  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!employee_id) {
      toast({ title: 'Error', description: 'Please select an employee', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await api.post('/checkin', { employee_id, location_id });
      toast({ title: 'Success', description: 'Employee checked in successfully' });
      setemployee_id('');
      fetchStats();
    } catch (error) {
      toast({ title: 'Check-in Failed', description: error.response?.data?.error || 'An error occurred', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (!employee_id) {
      toast({ title: 'Error', description: 'Please select an employee', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/checkout', { employee_id });
      toast({ title: 'Success', description: `Employee checked out. Duration: ${res.data.duration}` });
      setemployee_id('');
      fetchStats();
    } catch (error) {
      toast({ title: 'Check-out Failed', description: error.response?.data?.error || 'An error occurred', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Check In / Out</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-24" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Check In / Out</h1>
        <p className="text-slate-500 mt-1">Manage employee gym access</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => { setActiveTab('checkin'); setemployee_id(''); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'checkin'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LogIn className="w-4 h-4" /> Check In
        </button>
        <button
          onClick={() => { setActiveTab('checkout'); setemployee_id(''); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'checkout'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LogOut className="w-4 h-4" /> Check Out
        </button>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats?.currentlyActive || 0}</p>
                <p className="text-xs text-slate-500">Currently Active</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={stats?.currentlyActive || 0} max={stats?.maxCapacity || 50} />
              <p className="text-xs text-slate-400 mt-1">
                {stats?.currentlyActive || 0} / {stats?.maxCapacity || 50} capacity
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <LogIn className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats?.todayCheckIns || 0}</p>
                <p className="text-xs text-slate-500">Today&apos;s Check-ins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stats?.locations || 3}</p>
                <p className="text-xs text-slate-500">Active Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check In/Out Form */}
      <Card className="border-slate-200/60">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${activeTab === 'checkin' ? 'text-emerald-700' : 'text-red-700'}`}>
            {activeTab === 'checkin' ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
            {activeTab === 'checkin' ? 'Check In' : 'Check Out'}
          </CardTitle>
          <CardDescription className="text-slate-500">
            {activeTab === 'checkin' ? 'Register employee entry to the gym' : 'Register employee exit from the gym'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={activeTab === 'checkin' ? handleCheckIn : handleCheckOut} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Search Employee</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-9 border-slate-200"
                  placeholder="Search by name, ID, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <div className="border border-slate-200 rounded-lg max-h-40 overflow-y-auto bg-white shadow-sm">
                  {filteredEmployees.length === 0 ? (
                    <div className="px-3 py-4 text-center text-sm text-slate-400">No employees found</div>
                  ) : (
                    filteredEmployees.slice(0, 5).map((emp) => (
                      <button
                        key={emp.employee_id}
                        type="button"
                        onClick={() => {
                          setemployee_id(emp.employee_id);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer flex justify-between items-center ${
                          employee_id === emp.employee_id ? 'bg-emerald-50' : ''
                        }`}
                      >
                        <div>
                          <span className="font-medium text-slate-800">{emp.name}</span>
                          <span className="text-slate-400 ml-2">{emp.employee_id}</span>
                        </div>
                        <Badge variant="secondary">{emp.department}</Badge>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {employee_id && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                activeTab === 'checkin' ? 'bg-emerald-50' : 'bg-red-50'
              }`}>
                <Users className={`w-4 h-4 ${activeTab === 'checkin' ? 'text-emerald-600' : 'text-red-600'}`} />
                <span className={`text-sm ${activeTab === 'checkin' ? 'text-emerald-700' : 'text-red-700'}`}>
                  {employees.find(e => e.employee_id === employee_id)?.name || employee_id}
                </span>
              </div>
            )}



{activeTab === 'checkin' && (
  <div className="space-y-2">
    <Label className="text-slate-700 font-medium">Location</Label>

    <select
      className="w-full border p-2 rounded"
      value={location_id}
      onChange={(e) => setLocation(e.target.value)}
    >
      <option value="">Select Location</option>
      <option value="1">Kalyani Nagar</option>
      <option value="2">Kharadi</option>
      <option value="3">Magarpatta</option>
    </select>
  </div>
)}

            {activeTab === 'checkout' && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-sm font-medium">Duration Warning</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  Sessions exceeding 2 hours will be flagged as violations.
                </p>
              </div>
            )}

            <Button
              type="submit"
              className={`w-full font-semibold ${activeTab === 'checkin' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
              disabled={loading || !employee_id}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : activeTab === 'checkin' ? (
                <><LogIn className="w-4 h-4 mr-1" /> Check In</>
              ) : (
                <><LogOut className="w-4 h-4 mr-1" /> Check Out</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gym Rules Card */}
      <Card className="border-slate-200/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" /> Gym Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700">Max session: 2 hours</p>
                <p className="text-xs text-slate-400">Exceeding will flag violations</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700">Check out required</p>
                <p className="text-xs text-slate-400">Always check out when leaving</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700">One session at a time</p>
                <p className="text-xs text-slate-400">Cannot check in twice</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700">Operating hours: 6AM - 10PM</p>
                <p className="text-xs text-slate-400">Access restricted outside hours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

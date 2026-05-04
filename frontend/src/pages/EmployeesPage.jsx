import { useState, useEffect, useRef } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog';
import {
  Users, Search, Upload, ChevronLeft, ChevronRight,
  Download, LogIn, LogOut, Activity, Clock, MapPin, ShieldAlert
} from 'lucide-react';

export default function EmployeesPage() {
  // --- Employees Table State ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // --- Upload State ---
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const fileInputRef = useRef(null);

  // --- Check-In/Out State ---
  const [activeTab, setActiveTab] = useState('checkin');
  const [employeeId, setEmployeeId] = useState('');
  const [locationId, setLocationId] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Stats State ---
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const { toast } = useToast();

  const getStoredAuth = () => {
    try {
      return JSON.parse(localStorage.getItem('gym-auth') || '{}');
    } catch {
      return {};
    }
  };

  const stored = getStoredAuth();
  const userLocation = stored?.user?.location;

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.user?.location_id) {
      setLocationId(auth.user.location_id);
    } else if (auth?.user?.id) {
      setLocationId(auth.user.id);
    }
    fetchStats();
    fetchEmployees();
  }, [search, department, status, page]);

  // --- Fetch Stats ---
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

  // --- Fetch Employees (paginated table) ---
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        ...(search && { search }),
        ...(department !== 'all' && { department }),
        ...(status !== 'all' && { status })
      });
      const res = await api.get(`/employees?${params}`);
      setEmployees(res.data.employees || []);
      setPagination(res.data.pagination || null);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch employees', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // --- Check In ---
  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!employeeId) {
      toast({ title: 'Error', description: 'Please select an employee', variant: 'destructive' });
      return;
    }
    setCheckingIn(true);
    try {
      await api.post('/checkin', { employee_id: employeeId, location_id: locationId });
      toast({ title: 'Success', description: 'Employee checked in successfully' });
      setEmployeeId('');
      setSearchQuery('');
      fetchStats();
      fetchEmployees();
    } catch (error) {
      toast({
  title: 'Check-in Failed',
  description:
    error.response?.data?.msg ||   // ✅ correct field`
    error.response?.data?.error || 
    'An error occurred',
  variant: 'destructive'
});
    } finally {
      setCheckingIn(false);
    }
  };

  // --- Check Out ---
  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (!employeeId) {
      toast({ title: 'Error', description: 'Please select an employee', variant: 'destructive' });
      return;
    }
    setCheckingIn(true);
    try {
      const res = await api.post('/checkout', { employee_id: employeeId });
      toast({ title: 'Success', description: `Employee checked out. Duration: ${res.data.duration}` });
      setEmployeeId('');
      setSearchQuery('');
      fetchStats();
      fetchEmployees();
    } catch (error) {
      toast({ title: 'Check-out Failed', description: error.response?.data?.error || 'An error occurred', variant: 'destructive' });
    } finally {
      setCheckingIn(false);
    }
  };

  // --- File Upload ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/employees/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadResult(res.data.summary);
      toast({ title: 'Upload Complete', description: `${res.data.summary.successRows} employees imported successfully` });
      fetchEmployees();
    } catch (error) {
      toast({ title: 'Upload Failed', description: error.response?.data?.error || 'Failed to upload file', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = async() => {
    try {
    const res = await api.get("/reports/download-excel", {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "attendance.xlsx");

    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    alert("Download failed");
  }

  };

  // --- Filtered Employees for Check-In Search ---
const filteredEmployees = employees.filter(emp => {
  const query = searchQuery.toLowerCase();

  return (
    emp.name?.toLowerCase().includes(query) ||
    emp.employee_id?.toLowerCase().includes(query) ||
    emp.department?.toLowerCase().includes(query)
  );
});

  // --- Selected Employee Name ---
  const selectedEmployeeName = employeeId
    ? employees.find(e => e.employee_id === employeeId)?.name || employeeId
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <p className="text-slate-500 mt-1">Manage employee records & gym access</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadTemplate} className="border-slate-200">
            <Download className="w-4 h-4" /> Download Excel
          </Button>
          <Button onClick={() => setUploadDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Upload className="w-4 h-4" /> Upload
          </Button>
        </div>
      </div>

      {/* Live Stats */}
      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-slate-200/60">
              <CardContent className="p-4"><Skeleton className="h-24" /></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <Card className="border-slate-200/60">
            <CardContent className="p-4 pt-5">
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
            <CardContent className="p-4 pt-5">
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
            <CardContent className="p-4 pt-5">
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
      )}

      {/* Check In / Out Card — Compact */}
      <Card className="border-slate-200/60 w-full max-w-sm p-3">
        <CardContent className="p-5 space-y-4">

          {/* Title + Tab Switcher */}
          <div>
            <h2 className={`text-lg font-semibold flex items-center gap-2 ${activeTab === 'checkin' ? 'text-emerald-600' : 'text-red-600'}`}>
              {activeTab === 'checkin' ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
              {activeTab === 'checkin' ? 'Check In' : 'Check Out'}
            </h2>
            <p className="text-sm text-slate-500">
              {activeTab === 'checkin' ? 'Register employee entry to the gym' : 'Register employee exit from the gym'}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setActiveTab('checkin'); setEmployeeId(''); setSearchQuery(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'checkin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('checkout'); setEmployeeId(''); setSearchQuery(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'checkout'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" /> Out
            </button>
          </div>

          <form onSubmit={activeTab === 'checkin' ? handleCheckIn : handleCheckOut} className="space-y-4">
            {/* Search Employee */}
            <div>
              <label className="text-sm text-slate-600">Search Employee</label>
              <Input
                placeholder="Search by name, ID, or department..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Clear selection if user starts typing again
                  if (employeeId) setEmployeeId('');
                }}
                className="mt-1 border-slate-200"
              />
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && !employeeId && (
  <div>

    {/* 🔹 Result Count */}
    <p className="text-xs text-slate-500 px-1 mb-1">
      {filteredEmployees.length} result(s) found
    </p>

    {/* 🔹 Dropdown */}
    <div className="border border-slate-200 rounded-lg max-h-60 overflow-y-auto bg-white shadow-sm">
      
      {filteredEmployees.length === 0 ? (
        <div className="px-3 py-4 text-center text-sm text-slate-400">
          No employees found
        </div>
      ) : (
        filteredEmployees.map((emp) => (
          <button
            key={emp.employee_id}
            type="button"
            onClick={() => {
          setEmployeeId(emp.employee_id);
  setSelectedEmployee(emp); // ✅ store full object
  setSearchQuery('');
            }}
            className="w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 border-b border-slate-100 last:border-0 flex justify-between items-center"
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
  </div>
)}

            {/* Selected Employee Card — Prominent */}
            {employeeId && (
              <div className={`p-3 rounded-lg flex items-center justify-between ${
                activeTab === 'checkin' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${activeTab === 'checkin' ? 'text-emerald-600' : 'text-red-600'}`} />
                  <div>

                    
                    <span className={`text-sm font-medium ${activeTab === 'checkin' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {selectedEmployeeName}
                    </span>
                    <p className="text-xs text-slate-400">{employeeId}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setEmployeeId(''); setSearchQuery(''); }}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none"
                  title="Clear selection"
                >
                  ×
                </button>
              </div>
            )}

            {/* Location (Check-in only) */}
            {activeTab === 'checkin' && (
              <div>
                <label className="text-sm text-slate-600">Location</label>
                <Input
                  value={userLocation || ''}
                  disabled
                  className="mt-1 bg-slate-100"
                />
              </div>
            )}

            {/* Duration Warning (Check-out only) */}
            {activeTab === 'checkout' && (
              <div >
                {/* <div className="flex items-center gap-1.5 text-amber-800">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">2hr session limit</span>
                </div> */}
                {/* <p className="text-xs text-amber-700 mt-0.5">
                  Exceeding will be flagged as violation.
                </p> */}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full font-semibold ${activeTab === 'checkin' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
              disabled={checkingIn || !employeeId}
            >
              {checkingIn ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : activeTab === 'checkin' ? (
                '➜ Check In'
              ) : (
                '➜ Check Out'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="pt-10 space-y-6">

  <Card className="border-slate-200/60 mx-auto max-w-5xl">
    <CardContent className="p-4 pt-10">
      <div className="flex flex-col sm:flex-row gap-3">
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            className="pl-9 border-slate-200"
            placeholder="Search by name, ID, email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <Select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="w-full sm:w-40"
        >
          <option value="all">All Departments</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </Select>

        <Select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="w-full sm:w-32"
        >
          <option value="all">All Status</option>
          <option value="active">Checked-In</option>
          <option value="completed">Checked-Out</option>
        </Select>

      </div>
    </CardContent>
  </Card>

</div>
      {/* Employee Table */}
      <Card className="border-slate-200/60">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Employee</TableHead>
                  <TableHead className="font-semibold text-slate-700">Department</TableHead>
                  <TableHead className="font-semibold text-slate-700">Check In</TableHead>
                  <TableHead className="font-semibold text-slate-700">Check Out</TableHead>
                  <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                  <TableHead className="font-semibold text-slate-700">Session</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((emp) => (
                    <TableRow key={emp.employee_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-800">{emp.name}</p>
                          <p className="text-xs text-slate-400">{emp.employee_id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{emp.department}</Badge>
                      </TableCell>
                      <TableCell>
                        {emp.check_in_time
                          ? new Date(emp.check_in_time).toLocaleString()
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {emp.check_out_time
                          ? new Date(emp.check_out_time).toLocaleString()
                          : 'Active'}
                      </TableCell>
                      <TableCell>
                        {emp.duration ? `${emp.duration} min` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={emp.session_status === 'Active' ? 'success' : 'secondary'}>
                          {emp.session_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">

    {/* 🔹 Showing text */}
    <p className="text-sm text-slate-500">
      Showing {(page - 1) * pagination.limit + 1} to{" "}
      {Math.min(page * pagination.limit, pagination.total)} of{" "}
      {pagination.total}
    </p>

    {/* 🔹 Pagination buttons */}
    <div className="flex gap-1 items-center">

      {/* Prev */}
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        className="border-slate-200"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page number */}
      <span className="px-3 py-1 text-sm text-slate-600">
        {page} / {pagination.pages}
      </span>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pagination.pages}
        onClick={() => setPage(prev => Math.min(prev + 1, pagination.pages))}
        className="border-slate-200"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

    </div>
  </div>
)}
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Employees</DialogTitle>
            <DialogDescription>
              Upload an Excel or CSV file with employee data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-400 mt-1">Excel (.xlsx, .xls) or CSV files up to 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {uploading && (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <div className="w-6 h-6 border-2 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
                Processing upload...
              </div>
            )}

            {uploadResult && (
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-slate-700">Upload Summary</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-800">{uploadResult.totalRows}</p>
                    <p className="text-xs text-slate-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-600">{uploadResult.successRows}</p>
                    <p className="text-xs text-slate-500">Success</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{uploadResult.errorRows}</p>
                    <p className="text-xs text-slate-500">Errors</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-slate-500">
              <p className="font-medium mb-1">Required columns:</p>
              <p>employeeId, name, email (required)</p>
              <p>phone, department, designation (optional)</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setUploadDialog(false); setUploadResult(null); }} className="border-slate-200">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

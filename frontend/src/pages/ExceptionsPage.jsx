import { useState, useEffect, useRef } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog';
import {
  Users, Search, Upload, ChevronLeft, ChevronRight,
  Download, Mail, Phone
} from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);   // ✅ Moved inside component
  const [stats, setStats] = useState(null);                 // ✅ Added missing state
  const [checkingIn, setCheckingIn] = useState(false);      // ✅ Added missing state
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const fileInputRef = useRef(null);
  const [locationId, setLocationId] = useState(null);       // ✅ Renamed for clarity
  const [employeeId, setEmployeeId] = useState('');         // ✅ Renamed for clarity
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // ✅ Single source of truth for stored auth data
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
    // ✅ Fixed: Use the correct field for location_id
    if (auth?.user?.location_id) {
      setLocationId(auth.user.location_id);
    } else if (auth?.user?.id) {
      // Fallback: if location_id field doesn't exist, adjust as needed
      setLocationId(auth.user.id);
    }
    fetchStats();
    fetchEmployees();
  }, [search, department, status, page]);

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
      toast({
        title: 'Upload Complete',
        description: `${res.data.summary.successRows} employees imported successfully`
      });
      fetchEmployees();
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: error.response?.data?.error || 'Failed to upload file',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = 'employeeId,name,email,phone,department,designation\nEMP0001,John Doe,john@company.com,+1-555-0100,IT,Software Engineer';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast({
        title: 'Error',
        description: 'Please select an employee',
        variant: 'destructive'
      });
      return;
    }

    setCheckingIn(true);

    try {
      await api.post('/checkin', { employee_id: employeeId, location_id: locationId });

      toast({
        title: 'Success',
        description: 'Employee checked in successfully'
      });

      setEmployeeId('');
      setSearchQuery('');
      fetchEmployees();
    } catch (error) {
      toast({
        title: 'Check-in Failed',
        description: error.response?.data?.error || 'An error occurred',
        variant: 'destructive'
      });
    } finally {
      setCheckingIn(false);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <p className="text-slate-500 mt-1">Manage employee records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadTemplate} className="border-slate-200">
            <Download className="w-4 h-4" /> Template
          </Button>
          <Button onClick={() => setUploadDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Upload className="w-4 h-4" /> Upload
          </Button>
        </div>
      </div>

      {/* Check-In Card */}
      <Card className="border-slate-200/60 w-full max-w-sm p-3">
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
              ➜ Check In
            </h2>
            <p className="text-sm text-slate-500">
              Register employee entry to the gym
            </p>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm text-slate-600">Search Employee</label>
            <Input
              placeholder="Search by name, ID, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1 border-slate-200"
            />
            {employeeId && (
              <p className="text-xs text-emerald-600">
                Selected: {employeeId}
              </p>
            )}
          </div>

          {searchQuery && (
            <div className="border border-slate-200 rounded-lg max-h-40 overflow-y-auto bg-white shadow-sm">
              {filteredEmployees.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-slate-400">
                  No employees found
                </div>
              ) : (
                filteredEmployees.slice(0, 5).map((emp) => (
                  <button
                    key={emp.employee_id}
                    type="button"
                    onClick={() => {
                      setEmployeeId(emp.employee_id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm hover:bg-slate-50 border-b border-slate-100 last:border-0 flex justify-between items-center ${
                      employeeId === emp.employee_id ? 'bg-emerald-50' : ''
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

          {/* Location */}
          <div>
            <label className="text-sm text-slate-600">Location</label>
            <Input
              value={userLocation || ''}
              disabled
              className="mt-1 bg-slate-100"
            />
          </div>

          {/* Check In Button */}
          <Button
            onClick={handleCheckIn}
            disabled={checkingIn}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            {checkingIn ? 'Checking In...' : '➜ Check In'}
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-slate-200/60">
        <CardContent className="p-4">
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
            <Select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} className="w-full sm:w-40">
              <option value="all">All Departments</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </Select>
            <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="w-full sm:w-32">
              <option value="all">All Status</option>
              <option value="active">Checked-In</option>
              <option value="completed">Checked-Out</option>
            </Select>
          </div>
        </CardContent>
      </Card>

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
            <p className="text-sm text-slate-500">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => setPage(pagination.page - 1)}
                className="border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-3 py-1 text-sm text-slate-600">
                {pagination.page} / {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.pages}
                onClick={() => setPage(pagination.page + 1)}
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
              <p className="text-sm text-slate-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Excel (.xlsx, .xls) or CSV files up to 5MB
              </p>
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

import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select } from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  AlertTriangle, Plus, Check, X, Clock, Filter
} from 'lucide-react';
import { format } from 'date-fns';

export default function ExceptionsPage() {
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ employeeId: '', employeeName: '', reason: '' });
  const [editFormData, setEditFormData] = useState({ reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchExceptions();
  }, [statusFilter]);

  const fetchExceptions = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await api.get(`/exceptions${params}`);
      setExceptions(res.data.exceptions);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch exceptions', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.reason) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/exceptions', formData);
      toast({ title: 'Success', description: 'Exception request created' });
      setDialogOpen(false);
      setFormData({ employeeId: '', employeeName: '', reason: '' });
      fetchExceptions();
    } catch (error) {
      toast({ title: 'Failed', description: error.response?.data?.error || 'Failed to create exception', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editFormData.reason) {
      toast({ title: 'Error', description: 'Please provide a reason', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      await api.patch(`/exceptions/${editData.id}`, { reason: editFormData.reason });
      toast({ title: 'Updated', description: 'Exception updated successfully' });
      setEditDialogOpen(false);
      setEditData(null);
      setEditFormData({ reason: '' });
      fetchExceptions();
    } catch (error) {
      toast({ title: 'Failed', description: error.response?.data?.error || 'Failed to update exception', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAction = async (id, status) => {
    setActionLoading(id);
    try {
      await api.put(`/exceptions/${id}`, { status });
      toast({
        title: status === 'approved' ? 'Approved' : 'Rejected',
        description: `Exception ${status} successfully`
      });
      fetchExceptions();
    } catch (error) {
      toast({ title: 'Failed', description: 'Failed to update exception', variant: 'destructive' });
    } finally {
      setActionLoading(null);
    }
  };

  const openEditModal = (exc) => {
    setEditData(exc);
    setEditFormData({ reason: exc.reason });
    setEditDialogOpen(true);
  };

  const statusVariants = {
    pending: 'warning',
    approved: 'success',
    rejected: 'destructive'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Exceptions</h1>
          <p className="text-slate-500 mt-1">Manage exception requests</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4" /> New Exception
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {exceptions.filter(e => e.status === 'pending').length}
              </p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {exceptions.filter(e => e.status === 'approved').length}
              </p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {exceptions.filter(e => e.status === 'rejected').length}
              </p>
              <p className="text-xs text-slate-500">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="border-slate-200/60">
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'approved', 'rejected'].map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(s)}
                className={statusFilter === s ? '' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card className="border-slate-200/60">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      No exceptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  exceptions.map((exc) => (
                    <TableRow key={exc.id}>
                      <TableCell>
                        <p className="font-medium text-slate-800">{exc.employeeName}</p>
                        <p className="text-xs text-slate-400">{exc.employeeId}</p>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-xs truncate">
                        {exc.reason}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{exc.requestedBy}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[exc.status]}>{exc.status}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {format(new Date(exc.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        {exc.status === 'pending' && (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              onClick={() => handleAction(exc.id, 'approved')}
                              disabled={actionLoading === exc.id}
                            >
                              {actionLoading === exc.id ? (
                                <div className="w-4 h-4 border-2 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleAction(exc.id, 'rejected')}
                              disabled={actionLoading === exc.id}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        {exc.status !== 'pending' && (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                              onClick={() => openEditModal(exc)}
                            >
                              Edit
                            </Button>
                            {exc.approvedBy && (
                              <span className="text-xs text-slate-400 ml-2">by {exc.approvedBy}</span>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>New Exception Request</DialogTitle>
          <DialogDescription>Create a new exception request for an employee</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Employee ID *</Label>
              <Input
                placeholder="e.g., EMP0001"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Employee Name</Label>
              <Input
                placeholder="e.g., John Doe"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Reason *</Label>
              <Textarea
                placeholder="Describe the reason for this exception..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
                className="border-slate-200"
              />
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-slate-200">Cancel</Button>
          <Button onClick={handleCreate} disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700">
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Submit Request'
            )}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogHeader>
          <DialogTitle>Edit Exception</DialogTitle>
          <DialogDescription>Update exception details</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-700">{editData?.employeeName}</p>
              <p className="text-xs text-slate-400">{editData?.employeeId}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Reason *</Label>
              <Textarea
                placeholder="Update the reason..."
                value={editFormData.reason}
                onChange={(e) => setEditFormData({ ...editFormData, reason: e.target.value })}
                rows={3}
                className="border-slate-200"
              />
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => { setEditDialogOpen(false); setEditData(null); }} className="border-slate-200">Cancel</Button>
          <Button onClick={handleEdit} disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700">
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  ClipboardList, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

const actionColors = {
  LOGIN: 'default',
  CHECK_IN: 'success',
  CHECK_OUT: 'info',
  UPLOAD_EMPLOYEES: 'warning',
  VIEW_REPORTS: 'default',
  VIEW_DASHBOARD: 'default',
  CREATE_EXCEPTION: 'warning',
  APPROVED_EXCEPTION: 'success',
  REJECTED_EXCEPTION: 'destructive',
  EXPORT_REPORT: 'info'
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
        ...(actionFilter !== 'all' && { action: actionFilter })
      });
      const res = await api.get(`/audit-logs?${params}`);
      let filteredLogs = res.data.logs;
      if (search) {
        const q = search.toLowerCase();
        filteredLogs = filteredLogs.filter(l =>
          l.userName.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.details?.toLowerCase().includes(q)
        );
      }
      setLogs(filteredLogs);
      setPagination(res.data.pagination);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch audit logs', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
        <p className="text-slate-500 mt-1">Track all system activities</p>
      </div>

      {/* Filters */}
      <Card className="border-slate-200/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="pl-9 border-slate-200"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setPage(1); }} className="w-full sm:w-48">
              <option value="all">All Actions</option>
              <option value="LOGIN">Login</option>
              <option value="CHECK_IN">Check In</option>
              <option value="CHECK_OUT">Check Out</option>
              <option value="UPLOAD_EMPLOYEES">Upload</option>
              <option value="CREATE_EXCEPTION">Create Exception</option>
              <option value="APPROVED_EXCEPTION">Approved Exception</option>
              <option value="REJECTED_EXCEPTION">Rejected Exception</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="border-slate-200/60">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : (
            <ScrollArea className="max-h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="hidden md:table-cell">Details</TableHead>
                    <TableHead className="hidden lg:table-cell">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-slate-600 text-sm whitespace-nowrap">
                          {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-slate-800">{log.userName}</p>
                          <p className="text-xs text-slate-400">{log.userId}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant={actionColors[log.action] || 'default'}>
                            {log.action.replace(/_/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-slate-600 text-sm max-w-xs truncate">
                          {log.details || '-'}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-slate-500 text-sm">
                          {log.ipAddress || '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.pages}
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
    </div>
  );
}

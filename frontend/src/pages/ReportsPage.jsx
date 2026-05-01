import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  FileBarChart, AlertTriangle, BarChart3, Clock, Users, TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyData, setDailyData] = useState(null);
  const [violations, setViolations] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { toast } = useToast();

  useEffect(() => {
    if (activeTab === 'daily') fetchDailyReport();
    else if (activeTab === 'violations') fetchViolations();
    else if (activeTab === 'usage') fetchUsage();
  }, [activeTab, selectedDate]);

  const fetchDailyReport = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reports/daily?date=${selectedDate}`);
      setDailyData(res.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load daily report', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchViolations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reports/violations');
      setViolations(res.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load violations', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsage = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reports/usage');
      setUsage(res.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load usage report', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-slate-500 mt-1">View attendance reports and analytics</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="daily">
            <FileBarChart className="w-4 h-4 mr-1" /> Daily Report
          </TabsTrigger>
          <TabsTrigger value="violations">
            <AlertTriangle className="w-4 h-4 mr-1" /> Violations
          </TabsTrigger>
          <TabsTrigger value="usage">
            <BarChart3 className="w-4 h-4 mr-1" /> Usage
          </TabsTrigger>
        </TabsList>

        {/* Daily Report Tab */}
        <TabsContent value="daily">
          <div className="space-y-4">
            <Card className="border-slate-200/60">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="text-sm font-medium text-slate-700">Select Date:</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-auto border-slate-200"
                  />
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <Card className="border-slate-200/60"><CardContent className="p-6"><Skeleton className="h-40" /></CardContent></Card>
            ) : dailyData ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-slate-200/60">
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-500">Total Check-ins</p>
                      <p className="text-2xl font-bold text-slate-800">{dailyData.summary.totalCheckIns}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200/60">
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-500">Active Sessions</p>
                      <p className="text-2xl font-bold text-blue-600">{dailyData.summary.activeSessions}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200/60">
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-500">Completed Sessions</p>
                      <p className="text-2xl font-bold text-emerald-600">{dailyData.summary.completedSessions}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200/60">
                    <CardContent className="p-4">
                      <p className="text-sm text-slate-500">Average Duration</p>
                      <p className="text-2xl font-bold text-violet-600">{dailyData.summary.avgDuration}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-slate-200/60">
                  <CardContent className="p-0">
                    <ScrollArea className="max-h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Check In</TableHead>
                            <TableHead>Check Out</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dailyData.logs.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                                No records for this date
                              </TableCell>
                            </TableRow>
                          ) : (
                            dailyData.logs.map((log) => (
                              <TableRow key={log.id}>
                                <TableCell>
                                  <p className="font-medium text-slate-800">{log.employee?.name || log.employeeId}</p>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{log.employee?.department || '-'}</Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  {log.checkIn ? format(new Date(log.checkIn), 'hh:mm a') : '-'}
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  {log.checkOut ? format(new Date(log.checkOut), 'hh:mm a') : '-'}
                                </TableCell>
                                <TableCell className="text-slate-600">{log.duration || '-'}</TableCell>
                                <TableCell>
                                  <Badge variant={log.status === 'checked-in' ? 'warning' : 'success'}>
                                    {log.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>
        </TabsContent>

        {/* Violations Tab */}
        <TabsContent value="violations">
          {loading ? (
            <Card className="border-slate-200/60"><CardContent className="p-6"><Skeleton className="h-40" /></CardContent></Card>
          ) : violations ? (
            <div className="space-y-4">
              <Card className="border-slate-200/60">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{violations.totalViolations}</p>
                      <p className="text-xs text-slate-500">Total violations (sessions &gt; 2 hours)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200/60">
                <CardContent className="p-0">
                  <ScrollArea className="max-h-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Location</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {violations.violations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                              No violations found
                            </TableCell>
                          </TableRow>
                        ) : (
                          violations.violations.map((v) => (
                            <TableRow key={v.id}>
                              <TableCell>
                                <p className="font-medium text-slate-800">{v.employee?.name || v.employeeId}</p>
                                <p className="text-xs text-slate-400">{v.employee?.employeeId || ''}</p>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{v.employee?.department || '-'}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="destructive">{v.duration}</Badge>
                              </TableCell>
                              <TableCell className="text-slate-600">
                                {v.checkIn ? format(new Date(v.checkIn), 'MMM dd, hh:mm a') : '-'}
                              </TableCell>
                              <TableCell className="text-slate-600">{v.location || '-'}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage">
          {loading ? (
            <Card className="border-slate-200/60"><CardContent className="p-6"><Skeleton className="h-40" /></CardContent></Card>
          ) : usage ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800">{usage.totalSessions}</p>
                        <p className="text-xs text-slate-500">Total Sessions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800">{usage.uniqueUsers}</p>
                        <p className="text-xs text-slate-500">Unique Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800">{usage.avgDailySessions}</p>
                        <p className="text-xs text-slate-500">Avg Daily Sessions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-800">{usage.peakHour}</p>
                        <p className="text-xs text-slate-500">Peak Hour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-slate-200/60">
                <CardHeader>
                  <CardTitle className="text-base text-slate-800">Hourly Distribution</CardTitle>
                  <CardDescription className="text-slate-500">{usage.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {usage.hourlyDistribution?.map((h) => {
                      const maxCount = Math.max(...(usage.hourlyDistribution?.map(x => x.count) || [1]));
                      const width = (h.count / maxCount) * 100;
                      return (
                        <div key={h.hour} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-14">{h.hour}</span>
                          <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all flex items-center pl-2"
                              style={{ width: `${Math.max(width, 2)}%` }}
                            >
                              {h.count > 0 && <span className="text-xs text-white font-medium">{h.count}</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {usage.locations?.length > 0 && (
                <Card className="border-slate-200/60">
                  <CardHeader>
                    <CardTitle className="text-base text-slate-800">Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {usage.locations.map((loc) => (
                        <div key={loc.id} className="p-3 bg-slate-50 rounded-lg">
                          <p className="font-medium text-slate-800">{loc.name}</p>
                          <p className="text-xs text-slate-400">{loc.address}</p>
                          <p className="text-sm text-emerald-600 mt-1">Capacity: {loc.maxCapacity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}

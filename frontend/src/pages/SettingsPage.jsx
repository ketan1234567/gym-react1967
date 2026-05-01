import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useToast } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Skeleton } from '../components/ui/skeleton';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../components/ui/dialog';
import {
  Settings, Users, MapPin, Shield, Info, Plus, Trash2, Edit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    maxCapacity: 50,
    autoCheckout: true,
    violationThreshold: 120,
    notifications: true,
    maintenanceMode: false
  });
  const [adminDialog, setAdminDialog] = useState(false);
  const [locationDialog, setLocationDialog] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', role: 'MANAGER' });
  const [locationForm, setLocationForm] = useState({ name: '', address: '', maxCapacity: 50 });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const [adminsRes, locationsRes] = await Promise.all([
        api.get('/admins'),
        api.get('/locations')
      ]);
      setAdmins(adminsRes.data.admins);
      setLocations(locationsRes.data.locations);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load settings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast({ title: 'Saved', description: 'Settings saved successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save settings', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await api.post('/admins', adminForm);
      toast({ title: 'Success', description: 'Admin created successfully' });
      setAdminDialog(false);
      setAdminForm({ name: '', email: '', role: 'MANAGER' });
      fetchSettings();
    } catch (error) {
      toast({ title: 'Failed', description: error.response?.data?.error || 'Failed to create admin', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await api.delete(`/admins/${id}`);
      toast({ title: 'Deleted', description: 'Admin removed successfully' });
      fetchSettings();
    } catch (error) {
      toast({ title: 'Failed', description: 'Failed to delete admin', variant: 'destructive' });
    }
  };

  const createLocation = async (e) => {
    e.preventDefault();
    if (!locationForm.name) {
      toast({ title: 'Error', description: 'Location name is required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await api.post('/locations', locationForm);
      toast({ title: 'Success', description: 'Location created successfully' });
      setLocationDialog(false);
      setLocationForm({ name: '', address: '', maxCapacity: 50 });
      fetchSettings();
    } catch (error) {
      toast({ title: 'Failed', description: error.response?.data?.error || 'Failed to create location', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await api.delete(`/locations/${id}`);
      toast({ title: 'Deleted', description: 'Location removed successfully' });
      fetchSettings();
    } catch (error) {
      toast({ title: 'Failed', description: 'Failed to delete location', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage system settings and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Settings */}
          <Card className="border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Settings className="w-5 h-5" /> System Configuration
              </CardTitle>
              <CardDescription className="text-slate-500">Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-slate-700">Max Gym Capacity</Label>
                  <p className="text-sm text-slate-500">Maximum number of concurrent users</p>
                </div>
                <input
                  type="number"
                  value={settings.maxCapacity}
                  onChange={(e) => setSettings({ ...settings, maxCapacity: parseInt(e.target.value) || 50 })}
                  className="w-20 h-9 rounded-lg border border-slate-200 px-3 text-sm text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-slate-700">Auto Check-out</Label>
                  <p className="text-sm text-slate-500">Automatically check out users after closing time</p>
                </div>
                <Switch
                  checked={settings.autoCheckout}
                  onCheckedChange={(v) => setSettings({ ...settings, autoCheckout: v })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-slate-700">Violation Threshold (minutes)</Label>
                  <p className="text-sm text-slate-500">Duration before a session is flagged</p>
                </div>
                <input
                  type="number"
                  value={settings.violationThreshold}
                  onChange={(e) => setSettings({ ...settings, violationThreshold: parseInt(e.target.value) || 120 })}
                  className="w-20 h-9 rounded-lg border border-slate-200 px-3 text-sm text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-slate-700">Email Notifications</Label>
                  <p className="text-sm text-slate-500">Send notifications for violations and exceptions</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(v) => setSettings({ ...settings, notifications: v })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-slate-700">Maintenance Mode</Label>
                  <p className="text-sm text-slate-500">Disable check-in/check-out temporarily</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(v) => setSettings({ ...settings, maintenanceMode: v })}
                />
              </div>
              <Button onClick={saveSettings} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Save Settings'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card className="border-slate-200/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <MapPin className="w-5 h-5" /> Locations
                  </CardTitle>
                  <CardDescription className="text-slate-500">Manage gym locations and capacity</CardDescription>
                </div>
                <Button size="sm" onClick={() => setLocationDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {locations.map((loc) => (
                    <div key={loc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{loc.name}</p>
                        <p className="text-sm text-slate-500">{loc.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-700">{loc.maxCapacity} max</p>
                          <Badge variant={loc.status === 'active' ? 'success' : 'destructive'}>
                            {loc.status}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteLocation(loc.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Info */}
          <Card className="border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Shield className="w-5 h-5" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{user?.name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-slate-500">Role</p>
                <Badge>{user?.role || 'admin'}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Admins */}
          <Card className="border-slate-200/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base text-slate-800">
                  <Users className="w-5 h-5" /> Admins
                </CardTitle>
                <Button size="sm" onClick={() => setAdminDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-12" />)}
                </div>
              ) : (
                <div className="space-y-2">
                  {admins.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{admin.name}</p>
                        <p className="text-xs text-slate-500">{admin.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{admin.role}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0"
                          onClick={() => deleteAdmin(admin.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Info */}
          <Card className="border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-slate-800">
                <Info className="w-5 h-5" /> System Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Version</span>
                <span className="font-medium text-slate-800">1.0.0</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-500">Backend</span>
                <span className="font-medium text-slate-800">Express.js</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-500">Frontend</span>
                <span className="font-medium text-slate-800">React 19 + Vite</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-500">Database</span>
                <span className="font-medium text-slate-800">SQLite + Prisma</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={adminDialog} onOpenChange={setAdminDialog}>
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>Create a new admin user</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form onSubmit={createAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Name *</Label>
              <Input
                placeholder="Full name"
                value={adminForm.name}
                onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Email *</Label>
              <Input
                type="email"
                placeholder="admin@company.com"
                value={adminForm.email}
                onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Role</Label>
              <select
                value={adminForm.role}
                onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                className="flex h-10 w-full items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAdminDialog(false)} className="border-slate-200">Cancel</Button>
          <Button onClick={createAdmin} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Create Admin'
            )}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Add Location Dialog */}
      <Dialog open={locationDialog} onOpenChange={setLocationDialog}>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>Add a new gym location</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form onSubmit={createLocation} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Location Name *</Label>
              <Input
                placeholder="e.g., Downtown Gym"
                value={locationForm.name}
                onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Address</Label>
              <Textarea
                placeholder="Full address"
                value={locationForm.address}
                onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                rows={2}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Max Capacity</Label>
              <Input
                type="number"
                value={locationForm.maxCapacity}
                onChange={(e) => setLocationForm({ ...locationForm, maxCapacity: parseInt(e.target.value) || 50 })}
                className="border-slate-200"
              />
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setLocationDialog(false)} className="border-slate-200">Cancel</Button>
          <Button onClick={createLocation} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Create Location'
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

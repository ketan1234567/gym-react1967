import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, LogIn, LogOut, Users, FileBarChart,
  AlertTriangle, ClipboardList, Settings, Dumbbell, X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/sonner';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['ADMIN','MANAGER'] },

  { id: 'checkin', label: 'Check-In / Out', path: '/checkin', icon: LogIn, roles: ['ADMIN', 'MANAGER'] },

  { id: 'employees', label: 'Employees', path: '/employees', icon: Users, roles: ['ADMIN', 'MANAGER'] },

  { id: 'reports', label: 'Reports', path: '/reports', icon: FileBarChart, roles: ['ADMIN'] },

  // { id: 'exceptions', label: 'Exceptions', path: '/exceptions', icon: AlertTriangle, roles: ['ADMIN'] },

  { id: 'audit', label: 'Audit Logs', path: '/audit-logs', icon: ClipboardList, roles: ['ADMIN'] },

  // { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, roles: ['ADMIN'] },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();




const role = user?.role?.toUpperCase();

const filteredNav = navItems.filter(item =>
  item.roles.includes(role)
);

  const handleLogout = () => {
    if (onLogout) onLogout();
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Gym Access</h1>
                <p className="text-[10px] text-slate-400">Management System</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'dashboard' ? location.pathname === '/' : location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.id === 'dashboard'}
                  onClick={() => { if (window.innerWidth < 1024) onClose?.(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-3 border-t border-slate-700/50">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[11px] text-slate-400">{user?.role || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

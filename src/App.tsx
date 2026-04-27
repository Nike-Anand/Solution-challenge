/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DatasetProvider } from './context/DatasetContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FileSearch, 
  Activity, 
  Users, 
  Wrench, 
  MessageSquareShare, 
  FileText, 
  Award,
  Sun,
  Moon,
  LogOut,
  Settings,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Landing Page
import LandingPage from './pages/LandingPage';
// Dashboard Pages
import DashboardOverview from './pages/DashboardOverview';
import DatasetInspector from './pages/DatasetInspector';
import ModelAuditor from './pages/ModelAuditor';
import ShadowTestingLab from './pages/ShadowTestingLab';
import BiasRepairEngine from './pages/BiasRepairEngine';
import ExplainabilityCenter from './pages/ExplainabilityCenter';
import ReportGenerator from './pages/ReportGenerator';
import ComplianceCertificate from './pages/ComplianceCertificate';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Dataset Inspector', path: '/dashboard/inspector', icon: FileSearch },
    { name: 'Model Auditor', path: '/dashboard/auditor', icon: Activity },
    { name: 'Shadow Testing', path: '/dashboard/shadow', icon: Users },
    { name: 'Bias Repair Engine', path: '/dashboard/repair', icon: Wrench },
    { name: 'Explainability', path: '/dashboard/explain', icon: MessageSquareShare },
    { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    { name: 'Compliance Certice', path: '/dashboard/compliance', icon: Award },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      {/* Atmospheric Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex flex-col h-full border-r border-[var(--border-light)] bg-[var(--bg-secondary)] backdrop-blur-xl z-20 flex-shrink-0 relative overflow-hidden"
          >
            <div className="p-6 flex items-center gap-3 border-b border-[var(--border-light)] mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FairLens<span className="text-blue-400">AI</span></span>
            </div>

            <div className="px-4 py-3 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
              Governance Tools
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all border",
                      isActive 
                        ? "bg-blue-600/10 text-blue-400 border-blue-600/20" 
                        : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                    {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[var(--border-light)] space-y-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                <Settings size={18} />
                Settings
              </button>
            </div>
            
            {/* User Profile Mini */}
            <div className="p-4 border-t border-[var(--border-light)] flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors">
              <div className="w-9 h-9 rounded-full bg-brand-blue dark:bg-white flex items-center justify-center text-white dark:text-brand-blue font-bold text-sm">
                JD
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Jane Doe</p>
                <p className="text-xs text-[var(--text-secondary)] truncate">Lead Auditor</p>
              </div>
              <LogOut size={16} className="text-[var(--text-secondary)] hover:text-brand-red transition-colors" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 flex-shrink-0 border-b border-[var(--border-light)] bg-transparent flex items-center px-4 justify-between relative z-10">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
               <span className="text-xs font-semibold">Enterprise-Hiring-v2.0</span>
             </div>
             <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-[0_4px_15px_rgba(37,99,235,0.3)] transition-all">
               New Audit
             </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DatasetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Dashboard Routes with Layout */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardOverview /></DashboardLayout>} />
          <Route path="/dashboard/inspector" element={<DashboardLayout><DatasetInspector /></DashboardLayout>} />
          <Route path="/dashboard/auditor" element={<DashboardLayout><ModelAuditor /></DashboardLayout>} />
          <Route path="/dashboard/shadow" element={<DashboardLayout><ShadowTestingLab /></DashboardLayout>} />
          <Route path="/dashboard/repair" element={<DashboardLayout><BiasRepairEngine /></DashboardLayout>} />
          <Route path="/dashboard/explain" element={<DashboardLayout><ExplainabilityCenter /></DashboardLayout>} />
          <Route path="/dashboard/reports" element={<DashboardLayout><ReportGenerator /></DashboardLayout>} />
          <Route path="/dashboard/compliance" element={<DashboardLayout><ComplianceCertificate /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </DatasetProvider>
  );
}

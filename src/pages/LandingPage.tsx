import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Eye, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">FairLens<span className="text-blue-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Features</a>
          <a href="#solutions" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Solutions</a>
          <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">About</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:opacity-80 transition-opacity">Log In</button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:scale-105 transition-all"
          >
            Start Audit
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto w-full relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm text-sm font-medium mb-4">
            <ShieldAlert size={16} className="text-brand-amber" />
            <span>Detect Bias Before Bias Decides Lives</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Inspect. Measure. <br/><span className="text-brand-blue">Correct. Trust.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            FairLens AI audits datasets and automated decision systems for hidden discrimination, helping organizations deploy trustworthy, compliant AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] text-lg font-bold hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Audit <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md rounded-xl text-lg font-bold hover:bg-[var(--bg-hover)] transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Atmospheric Background Shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] -z-10 opacity-80 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-emerald-600/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </main>

      {/* Value Props / Sector Cards */}
      <section className="bg-[var(--bg-secondary)] py-24 px-8 border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-lg transition-shadow">
              <Eye size={40} className="text-brand-blue dark:text-white mb-6" />
              <h3 className="text-xl font-bold mb-3">Dataset Inspector</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Automatically detect sensitive attributes, proxies, and historical skews in your training data before you build the model.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-lg transition-shadow">
              <BarChart2 size={40} className="text-brand-amber mb-6" />
              <h3 className="text-xl font-bold mb-3">Model Auditor</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Check model outputs against demographic parity, equal opportunity, and disparate impact metrics in real-time.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-lg transition-shadow">
              <RefreshCw size={40} className="text-brand-green mb-6" />
              <h3 className="text-xl font-bold mb-3">Bias Repair Engine</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Apply advanced reweighing and threshold tuning algorithms to correct systemic bias without sacrificing overall accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

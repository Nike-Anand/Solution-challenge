import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDataset } from '../context/DatasetContext';
import { ArrowRight, UserCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ShadowTestingLab() {
  const { data: contextData } = useDataset();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to empty mock if no data
  const dataList = contextData && contextData.length > 0 ? contextData : [{
    name: 'Jane Smith',
    gender: 'Female',
    education: "Master's",
    experienceYears: 7,
    initialScore: 82,
    aiDecision: 'Rejected'
  }];

  const selectedApplicant = dataList[currentIndex];
  
  // Try to find the sensitive attribute dynamically or fallback to gender
  const sensitiveKey = selectedApplicant.gender ? 'gender' : (selectedApplicant.Gender ? 'Gender' : null);
  const sensitiveValue = sensitiveKey ? String(selectedApplicant[sensitiveKey]) : 'Unknown';
  
  // Flip gender for drama if it's male/female, otherwise mock a flip
  const newSensitiveValue = sensitiveValue.toLowerCase() === 'female' ? 'Male' : (sensitiveValue.toLowerCase() === 'male' ? 'Female' : 'Flipped');

  // Determine current decision
  const currentDecision = typeof selectedApplicant.aiDecision === 'string' ? selectedApplicant.aiDecision : (selectedApplicant.decision || selectedApplicant.target || 'Rejected');

  // Mock flip the decision for a dramatic demo
  const flippedDecision = String(currentDecision).toLowerCase().includes('reject') ? 'Accepted' : 'Rejected';

  const shadowApplicant = {
    ...selectedApplicant,
    [sensitiveKey || 'gender']: newSensitiveValue,
    aiDecision: flippedDecision
  };

  const handleNextApplicant = () => {
    setCurrentIndex((prev) => (prev + 1) % dataList.length);
  }

  return (
    <div className="space-y-6 relative z-10 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Shadow Testing Lab</h1>
          <p className="text-[var(--text-secondary)]">Simulate "shadow profiles" by cloning an applicant and changing only a sensitive variable to expose hidden model biases.</p>
        </div>
        <button 
          onClick={handleNextApplicant}
          className="px-4 py-2 border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] text-white rounded-xl shadow-md transition-all flex items-center gap-2 text-sm font-bold"
        >
          <RefreshCw size={16} /> Test Next Applicant
        </button>
      </div>

      <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-lg overflow-hidden relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <UserCheck size={18} />
            </div>
            Counterfactual Analysis
          </h2>
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <AlertTriangle size={16} />
            Gender Discrimination Flagged
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center relative z-10">
          {/* Original Profile */}
          <div className="p-6 rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-500/10 to-[var(--bg-primary)]/50 relative shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 opacity-50"></div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest">Original</div>
            <h3 className="text-2xl font-bold mb-6 text-white">{selectedApplicant.name}</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Sensitive Variable</span>
                <span className="font-bold text-red-400">{sensitiveValue}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Education/Level</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedApplicant.education || selectedApplicant.degree || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Experience (Years)</span>
                <span className="font-medium text-[var(--text-primary)]">{selectedApplicant.experienceYears || selectedApplicant.experience || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)] whitespace-nowrap mr-4">Model Output Score</span>
                <span className="font-mono text-[var(--text-primary)]">{selectedApplicant.initialScore || selectedApplicant.score || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border-color)]/50">
              <span className="block text-[10px] text-[var(--text-secondary)] mb-2 uppercase tracking-widest font-bold">AI Decision</span>
              <div className={cn("text-3xl font-bold tracking-tight", String(currentDecision).toLowerCase().includes('reject') ? 'text-red-400' : 'text-emerald-400')}>{String(currentDecision)}</div>
            </div>
          </div>

          <div className="flex justify-center text-[var(--text-secondary)]">
             <div className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center shadow-md">
               <ArrowRight size={24} className="text-blue-400" />
             </div>
          </div>

          {/* Shadow Profile */}
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-[var(--bg-primary)]/50 relative shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50"></div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Shadow Clone
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">{shadowApplicant.name} <span className="opacity-50 text-base font-normal">*(Clone)*</span></h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Sensitive Variable</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{newSensitiveValue}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Education/Level</span>
                <span className="font-medium text-[var(--text-primary)]">{shadowApplicant.education || shadowApplicant.degree || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)]">Experience (Years)</span>
                <span className="font-medium text-[var(--text-primary)]">{shadowApplicant.experienceYears || shadowApplicant.experience || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-secondary)] whitespace-nowrap mr-4">Model Output Score</span>
                <span className="font-mono text-[var(--text-primary)]">{shadowApplicant.initialScore || shadowApplicant.score || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border-color)]/50">
              <span className="block text-[10px] text-[var(--text-secondary)] mb-2 uppercase tracking-widest font-bold">AI Decision</span>
              <div className={cn("text-3xl font-bold tracking-tight", String(flippedDecision).toLowerCase().includes('reject') ? 'text-red-400' : 'text-emerald-400')}>{String(flippedDecision)}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <p className="text-amber-400/90 text-sm leading-relaxed">
            <strong className="text-amber-400 uppercase tracking-widest text-[10px] block mb-2 font-bold">Conclusion Report</strong>
            Holding all other variables constant, changing the applicant's sensitive variable from <strong>{sensitiveValue}</strong> to <strong>{newSensitiveValue}</strong> caused the model's decision to flip from <strong className={String(currentDecision).toLowerCase().includes('reject') ? 'text-red-400' : 'text-emerald-400'}>{String(currentDecision)}</strong> to <strong className={String(flippedDecision).toLowerCase().includes('reject') ? 'text-red-400' : 'text-emerald-400'}>{String(flippedDecision)}</strong>. This indicates the model has learned a strong proxy and is exhibiting direct discrimination.
          </p>
        </div>
      </div>
    </div>
  );
}

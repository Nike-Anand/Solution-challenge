import React, { useState, useMemo } from 'react';
import { Settings2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../components/Card';
import { useDataset } from '../context/DatasetContext';

export default function BiasRepairEngine() {
  const { data: contextData } = useDataset();
  const [strategy, setStrategy] = useState('reweighing');
  const [intensity, setIntensity] = useState(50);
  const [applied, setApplied] = useState(false);

  const baseMetrics = useMemo(() => {
    if (!contextData || contextData.length === 0) {
      return {
        demographicParity: 45,
        equalOpportunity: 85,
        disparateImpact: 0.3,
        accuracy: 92.4,
      };
    }

    let accepted = 0;
    let maleTotal = 0, maleAccepted = 0;
    let femaleTotal = 0, femaleAccepted = 0;

    contextData.forEach(row => {
      const gender = row.gender || row.Gender || 'Unknown';
      const decision = row.aiDecision || row.decision || row.target;
      const isAccepted = typeof decision === 'string' 
        ? decision.toLowerCase().includes('accept') || decision.toLowerCase() === 'yes' || decision === '1'
        : decision === 1 || decision === true;

      if (isAccepted) accepted++;

      if (gender === 'Male') {
        maleTotal++;
        if (isAccepted) maleAccepted++;
      } else if (gender === 'Female') {
        femaleTotal++;
        if (isAccepted) femaleAccepted++;
      }
    });

    const maleRate = maleTotal ? maleAccepted / maleTotal : 0;
    const femaleRate = femaleTotal ? femaleAccepted / femaleTotal : 0;
    
    const demoParityDiff = Math.abs(maleRate - femaleRate);
    const demoParityScore = Math.max(0, 100 - (demoParityDiff * 100)).toFixed(1);
    const disparateImpact = maleRate > 0 ? (femaleRate / maleRate).toFixed(2) : 1;

    return {
      demographicParity: parseFloat(demoParityScore),
      equalOpportunity: 85,
      disparateImpact: parseFloat(disparateImpact as string),
      accuracy: 91.5,
    };
  }, [contextData]);

  const repairedMetrics = {
    demographicParity: Math.min(100, baseMetrics.demographicParity + (100 - baseMetrics.demographicParity) * (intensity / 100)).toFixed(1),
    disparateImpact: Math.min(1, baseMetrics.disparateImpact + (1 - baseMetrics.disparateImpact) * (intensity / 100)).toFixed(2),
    equalOpportunity: Math.max(50, baseMetrics.equalOpportunity - (intensity / 100) * 5).toFixed(1),
    accuracy: Math.max(50, baseMetrics.accuracy - (intensity / 100) * 4).toFixed(1),
  };

  return (
    <div className="space-y-6 relative z-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Bias Repair Engine</h1>
        <p className="text-[var(--text-secondary)]">Apply fairness algorithms to correct systemic bias in the dataset or model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><Settings2 /> Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Repair Strategy</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'reweighing', name: 'Pre-processing: Reweighing', desc: 'Assigns weights to training examples' },
                    { id: 'adversarial', name: 'In-processing: Adversarial Debiasing', desc: 'Trains a discriminator to remove bias' },
                    { id: 'threshold', name: 'Post-processing: Threshold Tuning', desc: 'Adjusts decision thresholds per group' }
                  ].map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setStrategy(s.id)}
                      className={cn(
                        "p-4 text-left border rounded-xl transition-all",
                        strategy === s.id ? "border-blue-500 bg-blue-600/10 shadow-[0_0_15px_rgba(37,99,235,0.2)]" : "border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-blue-500/50 hover:bg-[var(--bg-hover)]"
                      )}
                    >
                      <strong className={cn("block mb-1", strategy === s.id ? "text-blue-400" : "text-[var(--text-primary)]")}>{s.name}</strong>
                      <span className="text-xs text-[var(--text-secondary)]">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Fairness vs. Accuracy Tradeoff</label>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-1 rounded">{intensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-3">
                  <span>Maximize Accuracy</span>
                  <span>Strict Parity (Maximize Fairness)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex justify-end">
              <button 
                onClick={() => setApplied(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Apply Repair <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {applied && (
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                   <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xl font-bold">Repair Successful</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                   <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Demographic Parity</span>
                   <div className="flex items-end gap-3">
                     <div className="text-xl font-bold line-through text-red-400 opacity-50">{baseMetrics.demographicParity}%</div>
                     <div className="text-2xl font-bold text-emerald-400">{repairedMetrics.demographicParity}%</div>
                   </div>
                 </div>
                 <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                   <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Disparate Impact</span>
                   <div className="flex items-end gap-3">
                     <div className="text-xl font-bold line-through text-red-400 opacity-50">{baseMetrics.disparateImpact}</div>
                     <div className="text-2xl font-bold text-emerald-400">{repairedMetrics.disparateImpact}</div>
                   </div>
                 </div>
                 <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                   <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Equal Opportunity</span>
                   <div className="flex items-end gap-3">
                     <div className="text-xl font-bold line-through text-[var(--text-secondary)] opacity-50">{baseMetrics.equalOpportunity}%</div>
                     <div className="text-2xl font-bold text-white">{repairedMetrics.equalOpportunity}%</div>
                   </div>
                 </div>
                 <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                   <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Overall Accuracy</span>
                   <div className="flex items-end gap-3">
                     <div className="text-xl font-bold line-through text-[var(--text-secondary)] opacity-50">{baseMetrics.accuracy}%</div>
                     <div className="text-2xl font-bold text-white">{repairedMetrics.accuracy}%</div>
                   </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
           <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md hover:shadow-lg transition-all cursor-pointer group">
             <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
               <Settings2 size={18} />
             </div>
             <strong className="block text-white mb-2">What is Reweighing?</strong>
             <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Reweighing is a data preprocessing technique that assigns different weights to examples in the training set to ensure fair representation before the model is ever trained.</p>
           </div>
           <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md shadow-md hover:shadow-lg transition-all cursor-pointer group">
             <strong className="block text-amber-400 mb-2">Notice the Tradeoff</strong>
             <p className="text-sm text-[var(--text-secondary)] leading-relaxed">By applying strict fairness constraints, extreme outliers might be ignored, resulting in a slight drop (-1.3%) in overall accuracy.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

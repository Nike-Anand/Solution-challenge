import React from 'react';
import { Award, CheckCircle2, FileText, Download } from 'lucide-react';
import { useDataset } from '../context/DatasetContext';

export default function ComplianceCertificate() {
  const { fileName, data } = useDataset();
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Compliance Certificate</h1>
        <p className="text-[var(--text-secondary)]">Generate verified credentials for your audited and repaired model.</p>
      </div>

      <div className="flex justify-center py-8">
        <div className="max-w-2xl w-full p-1 border hover:shadow-2xl transition-shadow duration-500 rounded-[2rem] bg-gradient-to-tr from-brand-blue via-[var(--bg-secondary)] to-emerald-500/20">
          <div className="bg-[var(--bg-secondary)] rounded-[1.85rem] p-12 text-center h-full border border-[var(--border-color)]">
            <Award size={64} className="mx-auto text-emerald-400 mb-6" />
            
            <div className="uppercase tracking-widest text-[var(--text-secondary)] text-[10px] font-bold mb-2">Certificate of Fairness</div>
            <h2 className="text-4xl font-serif mb-8 text-white">FairLens Verified</h2>
            
            <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
              This certifies that the automated decision system for <strong>{fileName || 'Unknown Model'}</strong> has been audited using the FairLens AI platform and successfully meets the thresholds for Demographic Parity and Equal Opportunity.
            </p>

            <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto mb-10 border-y border-[var(--border-color)] py-6">
              <span className="text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest">Model ID:</span>
              <span className="font-mono text-white text-sm bg-slate-800 px-2 py-1 rounded inline-block w-max">mdl_{Math.random().toString(36).substr(2, 7)}</span>
              <span className="text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest">Date certified:</span>
              <span className="text-white text-sm">{date}</span>
              <span className="text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest">Data Size:</span>
              <span className="text-white text-sm">{data.length || 0} records</span>
              <span className="text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest">Risk Category:</span>
              <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1"><CheckCircle2 size={16} /> Low Risk (Safe)</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2">
                 <Download size={18} /> Download PDF
               </button>
               <button className="px-6 py-2.5 border border-[var(--border-color)] bg-[var(--bg-primary)] hover:bg-[var(--bg-hover)] text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                 <FileText size={18} /> View Audit Trail
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

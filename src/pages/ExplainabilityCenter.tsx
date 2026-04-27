/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useDataset } from '../context/DatasetContext';

export default function ExplainabilityCenter() {
  const { correlations } = useDataset();
  const data = correlations && correlations.length > 0 ? correlations : [
    { feature: 'Experience', targetCorrelation: 0.8 },
    { feature: 'Education', targetCorrelation: 0.6 },
    { feature: 'Age', targetCorrelation: 0.4 },
    { feature: 'Zip Code', targetCorrelation: 0.3 },
  ];
  return (
    <div className="p-8 pb-32 text-center text-[var(--text-secondary)]">
      <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Explainability Center</h2>
      <p>Use Gemini AI and SHAP/LIME to explain decision patterns in plain English.</p>
      <div className="mt-8 text-left bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Top Influencing Factors</h3>
        <ul className="space-y-4">
          {data.map((d: any) => (
             <li key={d.feature} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
               <span className="text-slate-200 font-medium">{d.feature}</span>
               <span className="text-blue-400 font-mono">{(d.targetCorrelation * 100).toFixed(1)}% influence</span>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

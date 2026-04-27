/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useDataset } from '../context/DatasetContext';

export default function ReportGenerator() {
  const { data, fileName } = useDataset();

  return (
    <div className="space-y-6 relative z-10 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Report Generator</h1>
        <p className="text-[var(--text-secondary)]">Export executive summaries and detailed regulatory compliance audits for {fileName || 'your model'}.</p>
      </div>
      
      <div className="p-8 pb-32 text-center text-[var(--text-secondary)]">
        <p>Detailed reports and compliance audits are in development.</p>
        {data.length > 0 && (
          <div className="mt-8 text-left bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Summary for {fileName}</h3>
            <p className="mb-2">Total Rows Analyzed: <span className="font-mono text-blue-400">{data.length}</span></p>
            <p>Columns: <span className="font-mono text-emerald-400">{Object.keys(data[0] || {}).join(', ')}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Card } from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDataset } from '../context/DatasetContext';
import { useMemo } from 'react';

export default function DashboardOverview() {
  const { data: contextData } = useDataset();

  const data = useMemo(() => {
    if (!contextData || contextData.length === 0) {
      return [
        { name: 'Male', accepted: 0, rejected: 0 },
        { name: 'Female', accepted: 0, rejected: 0 },
      ];
    }

    const stats: Record<string, { accepted: number, rejected: number }> = {};
    contextData.forEach(row => {
      const gender = row.gender || row.Gender || 'Unknown';
      const decision = row.aiDecision || row.decision || row.target;
      if (!stats[gender]) stats[gender] = { accepted: 0, rejected: 0 };
      
      // Determine if accepted
      const isAccepted = typeof decision === 'string' 
        ? decision.toLowerCase().includes('accept') || decision.toLowerCase() === 'yes' || decision === '1'
        : decision === 1 || decision === true;

      if (isAccepted) stats[gender].accepted++;
      else stats[gender].rejected++;
    });

    return Object.keys(stats).map(gender => ({
      name: gender,
      accepted: stats[gender].accepted,
      rejected: stats[gender].rejected
    }));
  }, [contextData]);

  return (
    <div className="space-y-6 relative z-10 w-full">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Overall Bias Score" value="72/100" subtitle="Moderate Risk Detected" trend="down" />
        <Card title="Models Audited" value="4" subtitle="Active in Production" />
        <Card title="Datasets Inspected" value="12" subtitle="3 with flagged proxies" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
           <h3 className="text-lg font-bold mb-6 text-white">Outcome Disparity: Gender</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                  <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                    cursor={{ fill: 'var(--bg-hover)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar dataKey="accepted" stackId="a" fill="var(--color-brand-green)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="rejected" stackId="a" fill="var(--color-brand-red)" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
           <h3 className="text-lg font-bold mb-6 text-white">Recent Alerts</h3>
           <div className="space-y-4">
             <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
               <strong className="block mb-1 text-red-400 font-bold">High Risk: Demographics Parity Failure</strong>
               Alpha Bank Lending model shows 65% outcome disparity for Female applicants.
             </div>
             <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
               <strong className="block mb-1 text-amber-400 font-bold">Warning: Potential Proxy Variable</strong>
               "Zip Code" highly correlates (0.84) with "Race" in HR Screening Dataset 2024.
             </div>
             <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
               <strong className="block mb-1 text-emerald-400 font-bold">Resolved: Threshold Optimization</strong>
               Applied repair to Support Ticket Triage. Accuracy maintained at 94%.
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

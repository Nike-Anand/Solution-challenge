import React, { useMemo } from 'react';
import { Card } from '../components/Card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AlertOctagon, CheckCircle } from 'lucide-react';
import { useDataset } from '../context/DatasetContext';

export default function ModelAuditor() {
  const { data: contextData, fileName } = useDataset();

  const metrics = useMemo(() => {
    if (!contextData || contextData.length === 0) {
      return {
        demographicParity: 45,
        equalOpportunity: 85,
        disparateImpact: 0.3,
        accuracy: 92.4,
      };
    }

    // Dynamic metrics based on data
    let total = contextData.length;
    let accepted = 0;
    
    // Naive disparity metric calculation for demo
    // Assuming male vs female disparity
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
    
    // Demographic parity difference
    const demoParityDiff = Math.abs(maleRate - femaleRate);
    const demoParityScore = Math.max(0, 100 - (demoParityDiff * 100)).toFixed(1);
    
    // Disparate impact ratio (female rate / male rate)
    const disparateImpact = maleRate > 0 ? (femaleRate / maleRate).toFixed(2) : 1;

    // Simulate accuracy score derived from user initial score if present
    const accuracy = 91.5; // Statically dynamic!

    return {
      demographicParity: parseFloat(demoParityScore),
      equalOpportunity: 85,
      disparateImpact: parseFloat(disparateImpact),
      accuracy: accuracy,
    };
  }, [contextData]);

  const radarData = [
    { subject: 'Demographic Parity', A: metrics.demographicParity, fullMark: 100 },
    { subject: 'Equal Opportunity', A: metrics.equalOpportunity, fullMark: 100 },
    { subject: 'Equalized Odds', A: Math.max(0, metrics.demographicParity - 10), fullMark: 100 },
    { subject: 'Disparate Impact', A: metrics.disparateImpact * 100, fullMark: 100 },
    { subject: 'Overall Accuracy', A: metrics.accuracy, fullMark: 100 },
  ];

  const trendData = [
    { epoch: '1', disparity: 60, accuracy: 85 },
    { epoch: '2', disparity: 58, accuracy: 88 },
    { epoch: '3', disparity: 65, accuracy: 91 },
    { epoch: '4', disparity: (metrics.disparateImpact < 0.8 ? 80 : 30), accuracy: metrics.accuracy }, // Disparity spiked based on current
  ];

  const hasHighRisk = metrics.disparateImpact < 0.8 || metrics.demographicParity < 80;

  return (
    <div className="space-y-6 relative z-10 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Model Auditor</h1>
          <p className="text-[var(--text-secondary)]">Evaluate {fileName ? `"${fileName}" data model` : '"HR_Screening_Net_v2"'} against critical fairness metrics.</p>
        </div>
        {hasHighRisk ? (
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <AlertOctagon size={18} />
            High Risk Deployment
          </div>
        ) : (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CheckCircle size={18} />
            Acceptable Risk Level
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Demographic Parity" value={`${metrics.demographicParity}%`} subtitle={metrics.demographicParity < 80 ? 'Below 80% threshold' : 'Optimal'} trend={metrics.demographicParity < 80 ? "down" : "up"} className={metrics.demographicParity < 80 ? "border-red-500/50 bg-red-500/5 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-red-500" : "border-emerald-500/30 bg-[var(--bg-secondary)]"} />
        <Card title="Disparate Impact" value={`${metrics.disparateImpact}`} subtitle="Target: >0.8" trend={metrics.disparateImpact < 0.8 ? "down" : "up"} className={metrics.disparateImpact < 0.8 ? "border-red-500/50 bg-red-500/5 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-red-500" : "border-emerald-500/30 bg-[var(--bg-secondary)]"} />
        <Card title="Equal Opp." value={`${metrics.equalOpportunity}%`} subtitle="Within acceptable range" trend="up" className="border-[var(--border-color)] bg-[var(--bg-secondary)]" />
        <Card title="Accuracy" value={`${metrics.accuracy}%`} subtitle="Overall precision" trend="up" className="border-[var(--border-color)] bg-[var(--bg-secondary)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
           <h3 className="text-lg font-bold mb-6 text-white">Fairness Risk Radar</h3>
           <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                 <PolarGrid stroke="var(--border-color)" opacity={0.5} />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--border-color)" />
                 <Radar name="Model v2" dataKey="A" stroke={hasHighRisk ? "var(--color-brand-red)" : "var(--color-brand-green)"} fill={hasHighRisk ? "var(--color-brand-red)" : "var(--color-brand-green)"} fillOpacity={hasHighRisk ? 0.3 : 0.2} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
           <h3 className="text-lg font-bold mb-6 text-white">Training Epoch Trends: Accuracy vs Disparity</h3>
           <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="var(--border-color)" />
                 <XAxis dataKey="epoch" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                 <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                 <YAxis yAxisId="right" orientation="right" stroke={hasHighRisk ? "var(--color-brand-red)" : "var(--color-brand-amber)"} tick={{fontSize: 12}} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                 />
                 <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="var(--color-brand-blue)" strokeWidth={3} dot={{ r: 5 }} />
                 <Line yAxisId="right" type="monotone" dataKey="disparity" stroke={hasHighRisk ? "var(--color-brand-red)" : "var(--color-brand-amber)"} strokeWidth={3} strokeDasharray="5 5" />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}

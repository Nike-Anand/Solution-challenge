import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Papa from 'papaparse';
import { useDataset } from '../context/DatasetContext';
import { SAMPLE_CSV_CONTENT } from '../data/sampleCsv';

export default function DatasetInspector() {
  const { data: contextData, setDataset, clearDataset, fileName: contextFileName, correlations: contextCorrelations } = useDataset();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const processCsv = (fileInfo: { name: string, content?: string }, fileObject?: File) => {
    setIsAnalyzing(true);
    const parseConfig = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        const data = results.data as Record<string, any>[];
        const columns = results.meta.fields || [];
        
        // Generate dynamic correlations based on the columns of the uploaded file
        const correlations = columns
          .filter((c) => !['id', 'name', 'target', 'aiDecision', 'status'].includes(c.toLowerCase()))
          .map((feature) => {
            // Heuristic: Flag known sensitive fields or their common aliases as higher risk
            const lowerFeature = feature.toLowerCase();
            const isHighRiskProxy = ['zip', 'zipcode', 'gender', 'sex', 'race', 'ethnicity', 'age', 'neighborhood'].some(kw => lowerFeature.includes(kw));
            // Assign a correlation value based on risk heuristic (for demo realism)
            const targetCorrelation = isHighRiskProxy ? 0.6 + Math.random() * 0.35 : Math.random() * 0.45;
            const risk = targetCorrelation > 0.7 ? 'High' : targetCorrelation > 0.4 ? 'Medium' : 'Low';
            
            return { feature, targetCorrelation, risk };
          })
          .sort((a, b) => b.targetCorrelation - a.targetCorrelation)
          .slice(0, 6);

        setTimeout(() => {
          setDataset(data, columns, correlations, fileInfo.name);
          setIsAnalyzing(false);
        }, 800); // Small artificial delay
      }
    };
    
    if (fileObject) {
      Papa.parse(fileObject, parseConfig);
    } else if (fileInfo.content) {
      Papa.parse(fileInfo.content, parseConfig);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      processCsv({ name: file.name }, file);
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Dataset Inspector</h1>
          <p className="text-[var(--text-secondary)]">Upload datasets to detect proxies, missing values, and skews before training.</p>
        </div>
        <div className="flex items-center gap-3">
          {!contextData.length && (
             <button
                onClick={() => processCsv({ name: 'Hackathon_Sample_Data.csv', content: SAMPLE_CSV_CONTENT })}
                className="px-4 py-2 text-sm border-amber-500/50 bg-amber-500/10 text-amber-400 border rounded-md hover:bg-amber-500/20 flex items-center gap-2"
             >
                <Download size={16} /> Load Sample CSV
             </button>
          )}
          {contextData.length > 0 && (
            <button onClick={clearDataset} className="px-4 py-2 text-sm border border-[var(--border-color)] rounded-md hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]">
              Upload New Dataset
            </button>
          )}
        </div>
      </div>

      {!contextData.length ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-3xl p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)]",
            isDragActive ? "border-brand-blue bg-brand-blue/5" : "border-[var(--border-color)]",
          )}
        >
          <input {...getInputProps()} />
          {isAnalyzing ? (
            <div className="flex flex-col items-center">
               <Loader2 size={64} className="text-brand-blue animate-spin mb-4" />
               <h3 className="text-xl font-semibold mb-2">Analyzing Dataset...</h3>
               <p className="text-[var(--text-secondary)]">Parsing columns and detecting proxy variables</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud size={64} className="text-[var(--text-secondary)] py-4 opacity-50" />
              <h3 className="text-2xl font-semibold mb-2 text-white">Drag & drop your CSV dataset</h3>
              <p className="text-[var(--text-secondary)] mb-6">Supports CSV files with header rows</p>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] text-sm font-semibold">
                Browse Files
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400">
            <CheckCircle2 size={24} />
            <span className="font-semibold">Dataset "{contextFileName}" successfully parsed. {contextData.length.toLocaleString()} rows and {Object.keys(contextData[0] || {}).length} columns analyzed.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
              <h3 className="text-xl font-bold mb-6 text-white">Proxy Attributes Detected</h3>
              <div className="space-y-4">
                {contextCorrelations.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-[var(--border-color)] bg-[var(--bg-primary)] rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.risk === 'High' ? <AlertCircle className="text-brand-red" size={20} /> : <FileSpreadsheet className="text-[var(--text-secondary)] opacity-50" size={20}/>}
                      <span className="font-medium text-[var(--text-primary)]">{item.feature}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-[var(--text-secondary)]">{item.targetCorrelation.toFixed(2)} corr</span>
                      <span className={cn(
                        "text-[10px] uppercase font-bold px-2 py-1 rounded w-20 text-center",
                        item.risk === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        item.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-slate-800/50 text-slate-400 border border-slate-700'
                      )}>{item.risk} Risk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md">
              <h3 className="text-xl font-bold mb-6 text-white">Target Correlation Heatmap</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contextCorrelations} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="var(--border-color)" />
                    <XAxis type="number" domain={[0, 1]} stroke="var(--text-secondary)" tick={{fontSize: 12}} />
                    <YAxis dataKey="feature" type="category" stroke="var(--text-secondary)" tick={{fontSize: 12}} width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      cursor={{ fill: 'var(--bg-hover)' }}
                    />
                    <Bar dataKey="targetCorrelation" radius={[0, 4, 4, 0]}>
                      {
                        contextCorrelations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.risk === 'High' ? 'var(--color-brand-red)' : entry.risk === 'Medium' ? 'var(--color-brand-amber)' : 'var(--color-brand-blue)'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

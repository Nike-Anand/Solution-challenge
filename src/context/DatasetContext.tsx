import React, { createContext, useContext, useState } from 'react';

export interface DatasetContextType {
  data: Record<string, any>[];
  columns: string[];
  correlations: { feature: string; targetCorrelation: number; risk: string }[];
  fileName: string | null;
  setDataset: (data: Record<string, any>[], columns: string[], correlations: any[], fileName: string) => void;
  clearDataset: () => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export function DatasetProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [correlations, setCorrelations] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const setDataset = (newData: Record<string, any>[], newColumns: string[], newCorrelations: any[], newFileName: string) => {
    setData(newData);
    setColumns(newColumns);
    setCorrelations(newCorrelations);
    setFileName(newFileName);
  };

  const clearDataset = () => {
    setData([]);
    setColumns([]);
    setCorrelations([]);
    setFileName(null);
  };

  return (
    <DatasetContext.Provider value={{ data, columns, correlations, fileName, setDataset, clearDataset }}>
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
}

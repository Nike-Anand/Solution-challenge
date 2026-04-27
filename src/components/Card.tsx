import React from 'react';
import { cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down';
  className?: string;
}

export function Card({ title, value, subtitle, trend, className }: CardProps) {
  return (
    <div className={cn("relative p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md shadow-md overflow-hidden", className)}>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <h3 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">{title}</h3>
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-4xl font-black text-white tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            "flex items-center text-xs font-bold",
            trend === 'up' ? "text-brand-green" : "text-brand-red"
          )}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend === 'up' ? '+2.4%' : '-4.1%'}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs font-medium text-[var(--text-secondary)]">{subtitle}</p>}
    </div>
  );
}

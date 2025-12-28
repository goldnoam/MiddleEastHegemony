
import React from 'react';
import { Choice } from '../types';

interface DecisionPanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  isLoading: boolean;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({ choices, onSelect, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {choices.map((choice) => (
        <button
          key={choice.id}
          disabled={isLoading}
          onClick={() => onSelect(choice)}
          className="group relative bg-slate-800/60 backdrop-blur-sm hover:bg-slate-700/80 p-6 rounded-3xl border border-slate-700/50 hover:border-amber-500/40 transition-all duration-300 text-right flex flex-col items-end disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1 active:scale-95"
        >
          {/* Action indicator icon */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
            <div className="bg-amber-500/20 p-2 rounded-full">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-amber-100 group-hover:text-amber-400 transition-colors">
            {choice.label}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
            {choice.description}
          </p>
          
          {/* Subtle bottom highlight on hover */}
          <div className="absolute bottom-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/30 transition-all duration-500" />
        </button>
      ))}
    </div>
  );
};

export default DecisionPanel;

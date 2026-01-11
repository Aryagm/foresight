'use client';

import { Card } from '@/components/ui/card';
import { Flame, Droplets, Wind } from 'lucide-react';

interface RiskToggleProps {
  activeRisk: 'wildfire' | 'flood' | 'hurricane';
  onToggle: (risk: 'wildfire' | 'flood' | 'hurricane') => void;
}

export function RiskToggle({ activeRisk, onToggle }: RiskToggleProps) {
  return (
    <Card className="bg-black/60 backdrop-blur-md border-white/10 p-1 flex gap-1">
      <button
        onClick={() => onToggle('wildfire')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          activeRisk === 'wildfire'
            ? 'bg-orange-500/30 text-orange-300'
            : 'text-white/60 hover:text-white/80 hover:bg-white/10'
        }`}
      >
        <Flame className="w-4 h-4" />
        Wildfire
      </button>
      <button
        onClick={() => onToggle('flood')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          activeRisk === 'flood'
            ? 'bg-blue-500/30 text-blue-300'
            : 'text-white/60 hover:text-white/80 hover:bg-white/10'
        }`}
      >
        <Droplets className="w-4 h-4" />
        Flood
      </button>
      <button
        onClick={() => onToggle('hurricane')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          activeRisk === 'hurricane'
            ? 'bg-emerald-500/30 text-emerald-300'
            : 'text-white/60 hover:text-white/80 hover:bg-white/10'
        }`}
      >
        <Wind className="w-4 h-4" />
        Hurricane
      </button>
    </Card>
  );
}

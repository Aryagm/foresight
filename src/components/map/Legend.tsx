'use client';

import { Card } from '@/components/ui/card';

interface LegendProps {
  riskType: 'wildfire' | 'flood' | 'hurricane';
}

export function Legend({ riskType }: LegendProps) {
  const riskLabels = {
    wildfire: 'Wildfire Risk',
    flood: 'Flood Risk',
    hurricane: 'Hurricane Risk',
  };

  return (
    <Card className="bg-black/70 backdrop-blur-md border-white/10 p-3">
      <div className="text-xs text-white/80 mb-2 font-semibold uppercase tracking-wide">
        {riskLabels[riskType]}
      </div>

      {riskType === 'wildfire' && (
        // Wildfire: Green → Yellow → Orange → Red
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-red-600 opacity-70" />
            <span className="text-xs text-white/80">Very High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-orange-500 opacity-70" />
            <span className="text-xs text-white/80">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-yellow-500 opacity-70" />
            <span className="text-xs text-white/80">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-green-500 opacity-70" />
            <span className="text-xs text-white/80">Low</span>
          </div>
        </div>
      )}

      {riskType === 'flood' && (
        // Flood: Green → Teal → Cyan → Violet
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-violet-500 opacity-70" />
            <span className="text-xs text-white/80">Very High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-cyan-500 opacity-70" />
            <span className="text-xs text-white/80">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-teal-500 opacity-70" />
            <span className="text-xs text-white/80">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-emerald-500 opacity-70" />
            <span className="text-xs text-white/80">Low</span>
          </div>
          <div className="border-t border-white/10 mt-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded-sm bg-sky-600" />
              <span className="text-xs text-white/50">Water Bodies</span>
            </div>
          </div>
        </div>
      )}

      {riskType === 'hurricane' && (
        // Hurricane: Teal gradient
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-teal-500 opacity-70" />
            <span className="text-xs text-white/80">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-teal-400 opacity-70" />
            <span className="text-xs text-white/80">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-teal-300 opacity-70" />
            <span className="text-xs text-white/80">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm bg-teal-200 opacity-70" />
            <span className="text-xs text-white/80">Very Low</span>
          </div>
          <div className="border-t border-white/10 mt-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded-sm bg-cyan-600" />
              <span className="text-xs text-white/50">Ocean</span>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 mt-3 pt-3">
        <div className="text-xs text-white/80 mb-2 font-semibold uppercase tracking-wide">
          Fault Lines
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-1 rounded-full bg-pink-400" />
          <span className="text-xs text-white/80">Earthquake</span>
        </div>
      </div>
    </Card>
  );
}

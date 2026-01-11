'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Flame, Droplets, Mountain } from 'lucide-react';

interface LayerToggleProps {
  activeLayers: {
    wildfire: boolean;
    flood: boolean;
    earthquake: boolean;
  };
  onToggle: (layer: 'wildfire' | 'flood' | 'earthquake') => void;
}

export function LayerToggle({ activeLayers, onToggle }: LayerToggleProps) {
  return (
    <Card className="absolute bottom-24 right-4 z-10 bg-card/80 backdrop-blur-xl border-border">
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={activeLayers.wildfire}
              onCheckedChange={() => onToggle('wildfire')}
            />
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm">Wildfire</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={activeLayers.flood}
              onCheckedChange={() => onToggle('flood')}
            />
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Flood</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={activeLayers.earthquake}
              onCheckedChange={() => onToggle('earthquake')}
            />
            <Mountain className="w-4 h-4 text-orange-500" />
            <span className="text-sm">Earthquake</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}

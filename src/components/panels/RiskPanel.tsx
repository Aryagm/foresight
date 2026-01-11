'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Flame,
  Droplets,
  Mountain,
  Wind,
  ChevronRight,
  Info,
  TrendingDown,
  MapPin,
  X,
} from 'lucide-react';
import { ActionPanel } from './ActionPanel';
import { calculateRisks, type RiskData, type RiskScore } from '@/lib/risk-calculator';

interface RiskPanelProps {
  location: {
    coordinates: [number, number];
    address: string;
    placeName: string;
  };
  onClose: () => void;
}

function RiskMeter({
  icon: Icon,
  label,
  risk,
  color,
}: {
  icon: React.ElementType;
  label: string;
  risk: RiskScore;
  color: string;
}) {
  const levelColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-2 cursor-help">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="font-medium">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={levelColors[risk.level]}
                >
                  {risk.level.toUpperCase()}
                </Badge>
                <span className="text-lg font-bold">{risk.score.toFixed(1)}</span>
              </div>
            </div>
            <Progress
              value={risk.score * 10}
              className="h-2"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold">Risk Factors:</p>
            <ul className="text-sm space-y-1">
              {risk.factors.map((factor, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-muted-foreground">•</span>
                  {factor}
                </li>
              ))}
            </ul>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Source: {risk.source}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function RiskPanel({ location, onClose }: RiskPanelProps) {
  const [showActions, setShowActions] = useState(false);
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate risks when location changes
  useEffect(() => {
    async function loadRisks() {
      setLoading(true);
      try {
        // Fetch county GeoJSON
        const response = await fetch('/data/california-counties.geojson');
        const countyGeoJSON = await response.json();

        // Calculate risks
        const [lng, lat] = location.coordinates;
        const risks = await calculateRisks(lng, lat, countyGeoJSON);
        setRiskData(risks);
      } catch (error) {
        console.error('Failed to calculate risks:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRisks();
  }, [location.coordinates]);

  if (loading || !riskData) {
    return (
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-20 left-4 z-10"
      >
        <Card className="w-96 bg-card/90 backdrop-blur-xl border-border shadow-2xl">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-8 bg-muted rounded" />
              <div className="h-8 bg-muted rounded" />
              <div className="h-8 bg-muted rounded" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const savings = riskData.lossEstimate.unprotected - riskData.lossEstimate.withProtection;

  return (
    <>
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-20 left-4 z-10"
      >
        <Card className="w-96 bg-card/90 backdrop-blur-xl border-border shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-[250px]">{location.placeName}</span>
                </div>
                <CardTitle className="text-xl">
                  Risk Profile
                  {riskData.county && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      {riskData.county} County
                    </span>
                  )}
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Risk Meters */}
            <div className="space-y-4">
              <RiskMeter
                icon={Flame}
                label="Wildfire"
                risk={riskData.wildfire}
                color="text-red-500"
              />
              <RiskMeter
                icon={Droplets}
                label="Flood"
                risk={riskData.flood}
                color="text-blue-500"
              />
              <RiskMeter
                icon={Mountain}
                label="Earthquake"
                risk={riskData.earthquake}
                color="text-orange-500"
              />
              <RiskMeter
                icon={Wind}
                label="Hurricane"
                risk={riskData.hurricane}
                color="text-teal-500"
              />
            </div>

            <Separator />

            {/* Loss Simulation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-500" />
                <span className="font-medium">10-Year Loss Estimate</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Without Protection</p>
                  <p className="text-xl font-bold text-red-500">
                    ${riskData.lossEstimate.unprotected.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">With Protection</p>
                  <p className="text-xl font-bold text-green-500">
                    ${riskData.lossEstimate.withProtection.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Potential savings: <span className="text-green-500 font-semibold">${savings.toLocaleString()}</span>
              </p>
            </div>

            <Separator />

            {/* Action Button */}
            <Sheet open={showActions} onOpenChange={setShowActions}>
              <SheetTrigger asChild>
                <Button className="w-full" size="lg">
                  View Action Plan
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Your Action Plan</SheetTitle>
                </SheetHeader>
                <ActionPanel riskData={riskData} />
              </SheetContent>
            </Sheet>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                Based on FEMA NRI, USGS, and Cal Fire data. Estimates use county-level averages and may vary by specific location.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

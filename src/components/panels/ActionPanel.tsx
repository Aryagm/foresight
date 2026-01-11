'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Clock,
  Flame,
  Droplets,
  Mountain,
  CheckCircle2,
  Info,
  Zap,
} from 'lucide-react';

import type { RiskData } from '@/lib/risk-calculator';

interface ActionPanelProps {
  riskData: RiskData;
}

interface Action {
  id: string;
  title: string;
  description: string;
  cost: 'free' | 'low' | 'medium' | 'high';
  timeframe: 'immediate' | 'week' | 'month' | 'quarter';
  impact: 'high' | 'medium' | 'low';
  riskType: 'wildfire' | 'flood' | 'earthquake' | 'general';
  insuranceTip?: string;
}

const ACTIONS: Action[] = [
  // Immediate/Free actions
  {
    id: '1',
    title: 'Create defensible space',
    description: 'Clear 5 feet of vegetation around your home. Remove dead plants, leaves, and debris.',
    cost: 'free',
    timeframe: 'immediate',
    impact: 'high',
    riskType: 'wildfire',
  },
  {
    id: '2',
    title: 'Locate gas & water shutoffs',
    description: 'Know where your main gas and water shutoff valves are located. Practice turning them off.',
    cost: 'free',
    timeframe: 'immediate',
    impact: 'high',
    riskType: 'earthquake',
  },
  {
    id: '3',
    title: 'Save evacuation routes',
    description: 'Download offline maps with 2-3 evacuation routes. Share with family members.',
    cost: 'free',
    timeframe: 'immediate',
    impact: 'high',
    riskType: 'general',
  },
  {
    id: '4',
    title: 'Elevate important items',
    description: 'Move electronics, documents, and valuables off the floor and to higher shelves.',
    cost: 'free',
    timeframe: 'immediate',
    impact: 'medium',
    riskType: 'flood',
  },
  {
    id: '5',
    title: 'Photograph your belongings',
    description: 'Take photos/video of all rooms and valuables for insurance claims. Store in cloud.',
    cost: 'free',
    timeframe: 'immediate',
    impact: 'high',
    riskType: 'general',
  },
  // Week/Low cost
  {
    id: '6',
    title: 'Secure heavy furniture',
    description: 'Anchor bookcases, TVs, and water heaters to wall studs using earthquake straps.',
    cost: 'low',
    timeframe: 'week',
    impact: 'high',
    riskType: 'earthquake',
  },
  {
    id: '7',
    title: 'Build a go-bag',
    description: '72-hour kit with water, food, medications, documents, cash, and phone charger.',
    cost: 'low',
    timeframe: 'week',
    impact: 'high',
    riskType: 'general',
  },
  {
    id: '8',
    title: 'Install smoke detectors',
    description: 'Ensure working smoke detectors on every floor. Replace batteries every 6 months.',
    cost: 'low',
    timeframe: 'week',
    impact: 'high',
    riskType: 'wildfire',
  },
  // Month/Medium cost
  {
    id: '9',
    title: 'Review renters/homeowners insurance',
    description: 'Check if your policy covers smoke damage, water backup, and displacement costs.',
    cost: 'free',
    timeframe: 'month',
    impact: 'high',
    riskType: 'general',
    insuranceTip: 'Most standard policies do NOT cover flood or earthquake damage. These require separate policies.',
  },
  {
    id: '10',
    title: 'Get earthquake insurance quote',
    description: 'California Earthquake Authority (CEA) policies start around $2-3/day.',
    cost: 'medium',
    timeframe: 'month',
    impact: 'high',
    riskType: 'earthquake',
    insuranceTip: 'CEA policies have 5-15% deductibles. Make sure you can cover this amount.',
  },
  {
    id: '11',
    title: 'Consider flood insurance',
    description: 'NFIP policies available even outside high-risk zones. ~$500-700/year for low-risk areas.',
    cost: 'medium',
    timeframe: 'month',
    impact: 'high',
    riskType: 'flood',
    insuranceTip: 'NFIP policies have a 30-day waiting period. Don\'t wait until a storm is forecast.',
  },
  {
    id: '12',
    title: 'Start emergency fund',
    description: 'Target $1,000 initially, then build to cover insurance deductibles.',
    cost: 'medium',
    timeframe: 'month',
    impact: 'high',
    riskType: 'general',
  },
];

const COST_LABELS = {
  free: { label: 'Free', color: 'bg-green-500/10 text-green-500' },
  low: { label: '$1-50', color: 'bg-blue-500/10 text-blue-500' },
  medium: { label: '$50-500', color: 'bg-yellow-500/10 text-yellow-500' },
  high: { label: '$500+', color: 'bg-red-500/10 text-red-500' },
};

const RISK_ICONS = {
  wildfire: Flame,
  flood: Droplets,
  earthquake: Mountain,
  general: Zap,
};

const RISK_COLORS = {
  wildfire: 'text-red-500',
  flood: 'text-blue-500',
  earthquake: 'text-orange-500',
  general: 'text-slate-400',
};

export function ActionPanel({ riskData }: ActionPanelProps) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter and prioritize actions based on risk levels
  const prioritizedActions = ACTIONS.filter((action) => {
    if (action.riskType === 'general') return true;
    if (action.riskType === 'wildfire' && riskData.wildfire.level !== 'low') return true;
    if (action.riskType === 'flood' && riskData.flood.level !== 'low') return true;
    if (action.riskType === 'earthquake' && riskData.earthquake.level !== 'low') return true;
    return false;
  });

  const immediateActions = prioritizedActions.filter((a) => a.timeframe === 'immediate');
  const weekActions = prioritizedActions.filter((a) => a.timeframe === 'week');
  const monthActions = prioritizedActions.filter((a) => a.timeframe === 'month');

  const completedCount = completedActions.size;
  const totalCount = prioritizedActions.length;

  const ActionItem = ({ action }: { action: Action }) => {
    const Icon = RISK_ICONS[action.riskType];
    const isCompleted = completedActions.has(action.id);

    return (
      <div
        className={`p-3 rounded-lg border transition-all ${
          isCompleted
            ? 'bg-green-500/5 border-green-500/20'
            : 'bg-card border-border hover:border-muted-foreground/30'
        }`}
      >
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => toggleAction(action.id)}
            className="mt-0.5"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span
                className={`font-medium ${
                  isCompleted ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {action.title}
              </span>
              <Icon className={`w-4 h-4 shrink-0 ${RISK_COLORS[action.riskType]}`} />
            </div>
            <p className="text-sm text-muted-foreground">{action.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={COST_LABELS[action.cost].color}>
                {COST_LABELS[action.cost].label}
              </Badge>
              {action.impact === 'high' && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  High Impact
                </Badge>
              )}
            </div>
            {action.insuranceTip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
                      <Info className="w-3 h-3" />
                      <span>Insurance tip</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{action.insuranceTip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 px-4 space-y-4">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-medium">Your Progress</span>
          </div>
          <span className="text-2xl font-bold">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Complete actions to improve your preparedness score
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="immediate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="immediate" className="text-xs sm:text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Now
          </TabsTrigger>
          <TabsTrigger value="week" className="text-xs sm:text-sm">
            <Clock className="w-4 h-4 mr-1" />
            This Week
          </TabsTrigger>
          <TabsTrigger value="month" className="text-xs sm:text-sm">
            <Clock className="w-4 h-4 mr-1" />
            This Month
          </TabsTrigger>
        </TabsList>

        <TabsContent value="immediate" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Free actions you can do right now
          </p>
          {immediateActions.map((action) => (
            <ActionItem key={action.id} action={action} />
          ))}
        </TabsContent>

        <TabsContent value="week" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Low-cost actions for this week
          </p>
          {weekActions.map((action) => (
            <ActionItem key={action.id} action={action} />
          ))}
        </TabsContent>

        <TabsContent value="month" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Important actions for this month
          </p>
          {monthActions.map((action) => (
            <ActionItem key={action.id} action={action} />
          ))}
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Insurance Literacy Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">Insurance Coverage Gaps</span>
        </div>
        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-muted-foreground mb-2">You may be missing:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {riskData.earthquake.level !== 'low' && (
              <li>• Earthquake insurance</li>
            )}
            {riskData.flood.level !== 'low' && (
              <li>• Flood insurance (NFIP)</li>
            )}
            <li>• Evacuation/displacement coverage</li>
            <li>• Smoke damage coverage</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">
          Compare quotes from multiple insurers before purchasing.
        </p>
      </div>
    </div>
  );
}

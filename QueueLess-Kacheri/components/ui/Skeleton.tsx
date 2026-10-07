import React from 'react';

export const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
    <div className="flex justify-between items-center">
      <Shimmer className="h-4 w-28" />
      <Shimmer className="h-4 w-16" />
    </div>
    <Shimmer className="h-10 w-44" />
    <Shimmer className="h-20 w-full" />
    <Shimmer className="h-32 w-32 mx-auto rounded-2xl" />
  </div>
);

export const SlotSkeleton: React.FC = () => (
  <div className="grid grid-cols-3 gap-3">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="p-3 border border-slate-200 rounded-xl space-y-2">
        <Shimmer className="h-3 w-16" />
        <Shimmer className="h-5 w-24" />
      </div>
    ))}
  </div>
);

export const TimelineSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-4 items-center">
        <Shimmer className="w-8 h-8 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-48" />
        </div>
      </div>
    ))}
  </div>
);

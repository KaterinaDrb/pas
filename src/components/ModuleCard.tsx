import React from 'react';

export interface ModuleProps {
  title: string;
  duration: number;
}

const ModuleCard = ({ title, duration }: ModuleProps) => {
  return (
    <div className="p-2 text-xs border rounded cursor-pointer hover:bg-muted/50 flex items-center justify-between">
      <span className="flex-1">{title}</span>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden text-foreground text-xs">
          {duration} дн.
        </span>
      </div>
    </div>
  );
};

export default ModuleCard;

import React from 'react';
import { type Module } from '../payload-types';
import { GoPlus } from 'react-icons/go';

export interface ModuleProps {
  module: Module;
  onClick?: (module: Module) => void;
}

const ModuleCard = ({ module, onClick }: ModuleProps) => {
  return (
    <div
      className="p-2 text-xs border border-accent rounded cursor-pointer flex items-center justify-between mb-1 hover:bg-secondary"
      onClick={() => onClick?.(module)}
    >
      <span className="flex-1">{module.name}</span>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-md border border-accent px-2 py-0.5 font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden text-foreground text-xs">
          {module.amount} дн.
        </span>
        <GoPlus />
      </div>
    </div>
  );
};

export default ModuleCard;

'use client';
import { type Module } from '@/payload-types';
import { IoIosClose } from 'react-icons/io';
import Button from './Button';

interface SelectedModuleItemProps {
  module: Module;
  onRemove: (id: number) => void;
}

export default function SelectedModuleItem({
  module,
  onRemove,
}: SelectedModuleItemProps) {
  return (
    <div className="bg-secondary px-3 py-1 text-xs border border-accent rounded cursor-pointer flex items-center justify-between mb-2 hover:bg-secondary">
      <div>
        <p className="text-sm font-medium">{module.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-md border border-accent px-2 py-0.5 font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden text-foreground text-xs">
          {module.amount} дн.
        </span>
        <Button
          startIcon={<IoIosClose />}
          variant="ghost"
          size="sm"
          onClick={() => onRemove(module.id)}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { type ModuleProps } from './ModuleCard';
import { type ModuleGroup } from '../payload-types';
import Subgroup from './Subgroup';
import ModuleCard from './ModuleCard';
import { type Module } from '../payload-types';
import { useState } from 'react';
import { MdNavigateNext, MdExpandMore } from 'react-icons/md';
import Button from './Button';

interface GroupProps {
  group: ModuleGroup;
  onAddModule?: (module: Module) => void;
}

const Group = ({ group, onAddModule }: GroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleContent = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="bg-white mb-4 px-6 py-2 rounded-2xl border border-secondary">
      <div className="flex gap-2 items-center justify-between">
        <h5 className=" text-sm font-medium text-muted-foreground">
          {group.name}
        </h5>
        <Button
          onClick={toggleContent}
          startIcon={isCollapsed ? <MdNavigateNext /> : <MdExpandMore />}
          variant="ghost"
          className="hover:bg-white"
        />
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-fit'}`}
      >
        {group.subGroup?.map((sub) => (
          <Subgroup
            key={sub.id || sub.name}
            title={sub.name}
            modules={sub.module || []}
            onAddModule={onAddModule}
          />
        ))}
        {(!group.subGroup || group.subGroup.length === 0) && (
          <p>Нет подгрупп</p>
        )}
      </div>
    </div>
  );
};

export default Group;

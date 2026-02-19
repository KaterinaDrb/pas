import React from 'react';
import ModuleCard from './ModuleCard';
import { type ModuleProps } from './ModuleCard';
import { type ModuleGroup } from '../payload-types';
import { type Module } from '../payload-types';

interface SubgroupProps {
  title: string;
  modules: (number | Module)[];
}

const Subgroup = ({ title, modules }: SubgroupProps) => {
  return (
    <div>
      <h5 className="text-xs font-medium text-muted-foreground mb-2">
        {title}
      </h5>
      {module ? (
        <div>
          {modules.map((mod) => {
            if (typeof mod === 'number') {
              return <div key={mod}>Модуль #{mod} (не загружен) </div>;
            }
            return (
              <ModuleCard key={mod.id} title={mod.name} duration={mod.amount} />
            );
          })}
        </div>
      ) : (
        <p>В этой подгруппе пока нет модулей</p>
      )}
    </div>
  );
};

export default Subgroup;

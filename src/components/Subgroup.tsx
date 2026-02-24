import React from 'react';
import ModuleCard from './ModuleCard';
import { type Module } from '../payload-types';

interface SubgroupProps {
  title: string;
  modules: (number | Module)[];
  onAddModule?: (module: Module) => void;
}

const Subgroup = ({ title, modules, onAddModule }: SubgroupProps) => {
  return (
    <div>
      <h5 className="text-xs font-medium text-muted mb-2">{title}</h5>
      {module ? (
        <div>
          {modules.map((mod) => {
            if (typeof mod === 'number') {
              return <div key={mod}>Модуль #{mod} (не загружен) </div>;
            }
            return (
              <ModuleCard key={mod.id} module={mod} onClick={onAddModule} />
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

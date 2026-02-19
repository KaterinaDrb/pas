import React from 'react';
import Module from './ModuleCard';
import { type ModuleProps } from './ModuleCard';
import { type ModuleGroup } from '../payload-types';
import Subgroup from './Subgroup';

interface GroupProps {
  group: ModuleGroup;
}

const Group = ({ group }: GroupProps) => {
  return (
    <div>
      <h5 className="text-xs font-medium text-muted-foreground mb-2">
        {group.name}
      </h5>
      {group.subGroup?.map((sub) => (
        <Subgroup
          key={sub.id || sub.name}
          title={sub.name}
          modules={sub.module || []} // передаём массив модулей
        />
      ))}
      {(!group.subGroup || group.subGroup.length === 0) && <p>Нет подгрупп</p>}
    </div>
  );
};

export default Group;

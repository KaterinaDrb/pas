import { authenticated } from '@/access/authenticated';
import { isRoles } from '@/access/isRoles';
import type { CollectionConfig } from 'payload';

export const ModuleGroup: CollectionConfig = {
  slug: 'module-group',
  labels: {
    singular: 'Группа модулей',
    plural: 'Группа модулей',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    admin: isRoles(['ADMIN']),
    create: isRoles(['ADMIN', 'TECH_LEAD']),
    delete: isRoles(['ADMIN']),
    read: authenticated,
    update: isRoles(['ADMIN', 'TECH_LEAD']),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название группы модулей',
      required: true,
    },
    {
      type: 'array',
      name: 'subGroup',
      label: 'Подгруппы',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Название подгруппы',
          required: true,
        },
        {
          type: 'relationship',
          name: 'module',
          label: 'Модули',
          relationTo: 'modules',
          hasMany: true,
        },
      ],
    },
  ],
};

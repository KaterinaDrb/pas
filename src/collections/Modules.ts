import { authenticated } from '@/access/authenticated';
import { isRoles } from '@/access/isRoles';
import type { CollectionConfig } from 'payload';

export const Modules: CollectionConfig = {
  slug: 'modules',
  labels: {
    singular: 'Модуль',
    plural: 'Модули',
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
      label: 'Название модуля',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание модуля',
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Количество дней',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Стоимость',
      required: true,
      defaultValue: 0,
    },
    {
      type: 'relationship',
      name: 'Нормативы',
      relationTo: 'module-standards',
      hasMany: true,
    },
  ],
};

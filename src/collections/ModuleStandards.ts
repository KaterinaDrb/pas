import { authenticated } from '@/access/authenticated';
import { isRoles } from '@/access/isRoles';
import type { CollectionConfig } from 'payload';

export const ModuleStandards: CollectionConfig = {
  slug: 'module-standards',
  labels: {
    singular: 'Норматив',
    plural: 'Нормативы',
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
      label: 'Название',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание модуля',
    },
    {
      name: 'type',
      type: 'text',
      label: 'Тип норматива',
    },
    {
      name: 'value',
      type: 'text',
      label: 'Значение',
    },
    {
      name: 'unit',
      type: 'text',
      label: 'Единица измерения',
    },
    {
      name: 'technology',
      type: 'text',
      label: 'Технология',
    },
    {
      name: 'complexity',
      type: 'text',
      label: 'Уровень сложности',
    },
    {
      name: 'start_date',
      type: 'date',
      label: 'Дата начала',
    },
    {
      name: 'end_date',
      type: 'date',
      label: 'Дата окончания',
    },
  ],
};

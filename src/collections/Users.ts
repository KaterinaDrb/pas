import { authenticated } from '@/access/authenticated';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  labels: {
    singular: 'Администратор',
    plural: 'Администраторы',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'ФИО',
      required: true,
      defaultValue: 'Аноним',
    },
  ],
};

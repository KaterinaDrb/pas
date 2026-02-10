import { authenticated } from '@/access/authenticated';
import { isRoles } from '@/access/isRoles';
import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Клиент',
    plural: 'Клиенты',
  },
  access: {
    admin: isRoles(['ADMIN']),
    create: isRoles(['ADMIN']),
    delete: isRoles(['ADMIN']),
    read: authenticated,
    update: isRoles(['ADMIN']),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название компании',
      required: true,
    },
    {
      name: 'contact_person',
      type: 'text',
      label: 'Контактное лицо',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Электронная почта',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адрес',
    },
    {
      name: 'unp',
      type: 'text',
      label: 'УНП',
    },
  ],
};

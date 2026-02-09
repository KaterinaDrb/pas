import { isAdmin } from '@/access/isAdmin';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.role === 'ADMIN') return true;
      // Обычные пользователи видят только себя
      return { id: { equals: user.id } };
    },
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'ФИО',
      required: true,
      defaultValue: 'Пользователь',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'role',
      type: 'radio',
      options: [
        {
          value: 'ADMIN',
          label: 'Администратор системы',
        },
        {
          value: 'PROJECT_MANAGER',
          label: 'Менеджер проектов',
        },
        {
          value: 'TECH_LEAD',
          label: 'Технический руководитель',
        },
        {
          value: 'PROJECT_MANAGER_DELEGATE',
          label: 'Заместитель директора по управлению проектами',
        },
      ],
    },
  ],
};

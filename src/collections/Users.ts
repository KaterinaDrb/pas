import { isRoles } from '@/access/isRoles';
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
    admin: isRoles(['ADMIN']),
    create: isRoles(['ADMIN']),
    delete: isRoles(['ADMIN']),
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.role === 'ADMIN') return true;
      // Обычные пользователи видят только себя
      return { id: { equals: user.id } };
    },
    update: isRoles(['ADMIN']),
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

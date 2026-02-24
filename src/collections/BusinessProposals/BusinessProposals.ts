import { type CollectionConfig } from 'payload';
import { BUSINESS_PROPOSALS_STATUSES } from './constants';
import { populateUser } from './hooks/populateUser';
import { populateStatus } from './hooks/populateStatus';
import { isRoles } from '@/access/isRoles';
import { authenticated } from '@/access/authenticated';
import { approveHandler } from './handlers/approveHandler';
import { declineHandler } from './handlers/declineHandler';
import { deleteHistory } from './hooks/deleteHistory';

export const BusinessProposals: CollectionConfig = {
  slug: 'business-proposals',
  labels: {
    plural: 'Коммерческие предложения',
    singular: 'Коммерческое предложение',
  },
  hooks: {
    beforeChange: [populateUser, populateStatus],
    beforeDelete: [deleteHistory],
  },
  admin: {
    hidden: true,
  },
  access: {
    read: authenticated,
    create: isRoles(['PROJECT_MANAGER', 'ADMIN']),
    update: async ({ req, id }) => {
      if (id) {
        const doc = await req.payload.findByID({
          collection: 'business-proposals',
          id,
        });
        return doc.status === 'DRAFT' && isRoles(['PROJECT_MANAGER'])({ req });
      }
      return false;
    },
    delete: async ({ req, id }) => {
      if (id) {
        const doc = await req.payload.findByID({
          collection: 'business-proposals',
          id,
        });
        return doc.status === 'DRAFT' && isRoles(['PROJECT_MANAGER'])({ req });
      }
      return false;
    },
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Название',
    },
    {
      type: 'text',
      name: 'description',
      label: 'Описание',
    },
    {
      type: 'relationship',
      name: 'user',
      label: 'Менеджер',
      relationTo: 'users',
    },
    {
      type: 'relationship',
      name: 'customer',
      label: 'Клиент',
      relationTo: 'customers',
    },
    {
      type: 'select',
      name: 'status',
      label: 'Статус',
      options: BUSINESS_PROPOSALS_STATUSES,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      type: 'number',
      name: 'price',
      label: 'Стоимость',
    },
    {
      type: 'relationship',
      name: 'modules',
      label: 'Модули',
      relationTo: 'modules',
      hasMany: true,
    },
  ],
  endpoints: [
    {
      path: '/:id/approve',
      method: 'patch',
      handler: approveHandler,
    },
    {
      path: '/:id/decline',
      method: 'patch',
      handler: declineHandler,
    },
  ],
};

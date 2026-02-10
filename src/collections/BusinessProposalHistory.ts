import { type CollectionConfig } from 'payload';
import { BUSINESS_PROPOSALS_STATUSES } from './BusinessProposals/constants';
import { authenticated } from '@/access/authenticated';

export const BusinessProposalHistory: CollectionConfig = {
  slug: 'business-proposal-history',
  admin: {
    hidden: true,
  },
  access: {
    read: authenticated,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      type: 'relationship',
      name: 'user',
      relationTo: 'users',
    },
    {
      type: 'relationship',
      name: 'businessProposal',
      relationTo: 'business-proposals',
    },
    {
      type: 'textarea',
      name: 'comment',
    },
    {
      type: 'select',
      name: 'newStatus',
      options: BUSINESS_PROPOSALS_STATUSES,
    },
    {
      type: 'select',
      name: 'oldStatus',
      options: BUSINESS_PROPOSALS_STATUSES,
    },
  ],
};

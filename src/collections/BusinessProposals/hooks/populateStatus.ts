import { type BusinessProposal } from '@/payload-types';
import { type CollectionBeforeChangeHook } from 'payload';

export const populateStatus: CollectionBeforeChangeHook<
  BusinessProposal
> = async ({ operation, data }) => {
  if (operation === 'create' && !data.status) {
    data.status = 'DRAFT';
  }
  return data;
};

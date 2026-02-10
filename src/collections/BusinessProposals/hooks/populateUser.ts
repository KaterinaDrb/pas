import { type BusinessProposal } from '@/payload-types';
import { type CollectionBeforeChangeHook } from 'payload';

export const populateUser: CollectionBeforeChangeHook<
  BusinessProposal
> = async ({ operation, data, req: { user } }) => {
  if (operation === 'create' && user) {
    data.user = user.id;
  }
  return data;
};

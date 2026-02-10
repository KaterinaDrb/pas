import { type CollectionBeforeDeleteHook } from 'payload';

export const deleteHistory: CollectionBeforeDeleteHook = async ({
  req: { payload },
  id,
}) => {
  await payload.delete({
    collection: 'business-proposal-history',
    where: {
      businessProposal: {
        equals: id,
      },
    },
  });
};

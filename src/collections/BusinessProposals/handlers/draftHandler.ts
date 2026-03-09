import { type PayloadHandler } from 'payload';

export const draftHandler: PayloadHandler = async ({
  routeParams,
  payload,
  user,
}) => {
  if (!user || user.role !== 'PROJECT_MANAGER') {
    return Response.json(
      {
        message: 'У вас нет прав на изменение статуса',
      },
      {
        status: 403,
      }
    );
  }
  const id = routeParams?.id as string;

  const doc = await payload.findByID({
    collection: 'business-proposals',
    id,
  });

  if (doc.status === 'DECLINED') {
    await payload.update({
      collection: 'business-proposals',
      id,
      data: { status: 'DRAFT' },
    });
    await payload.create({
      collection: 'business-proposal-history',
      data: {
        businessProposal: +id,
        oldStatus: doc.status,
        newStatus: 'DRAFT',
        user: user.id,
      },
    });
    return Response.json({
      message: 'Статус успешно обновлен на DRAFT',
    });
  }
  return Response.json(
    {
      message: 'Статус не может быть обновлен',
    },
    {
      status: 400,
    }
  );
};

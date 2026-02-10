import { type PayloadHandler } from 'payload';
import Ajv, { type JSONSchemaType } from 'ajv';

type Body = {
  comment: string;
};

const schema: JSONSchemaType<Body> = {
  type: 'object',
  required: ['comment'],
  properties: {
    comment: {
      type: 'string',
    },
  },
};

export const approveHandler: PayloadHandler = async ({
  routeParams,
  payload,
  user,
  json,
}) => {
  if (
    !user ||
    (user.role !== 'TECH_LEAD' &&
      user.role !== 'PROJECT_MANAGER_DELEGATE' &&
      user.role !== 'PROJECT_MANAGER')
  ) {
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
  const body = await json?.();

  const ajv = new Ajv();
  if (!ajv.validate(schema, body)) {
    return Response.json(
      {
        errors: ajv.errors,
      },
      {
        status: 400,
      }
    );
  }

  const doc = await payload.findByID({
    collection: 'business-proposals',
    id,
  });

  if (user.role === 'PROJECT_MANAGER' && doc.status === 'DRAFT') {
    await payload.update({
      collection: 'business-proposals',
      id,
      data: { status: 'READY' },
    });
    await payload.create({
      collection: 'business-proposal-history',
      data: {
        businessProposal: +id,
        oldStatus: doc.status,
        newStatus: 'READY',
        user: user.id,
        comment: body.comment,
      },
    });
    return Response.json({
      message: 'Статус успешно обновлен на READY',
    });
  }
  if (user.role === 'TECH_LEAD' && doc.status === 'READY') {
    await payload.update({
      collection: 'business-proposals',
      id,
      data: { status: 'TECH_APPROVED' },
    });
    await payload.create({
      collection: 'business-proposal-history',
      data: {
        businessProposal: +id,
        oldStatus: doc.status,
        newStatus: 'TECH_APPROVED',
        user: user.id,
        comment: body.comment,
      },
    });
    return Response.json({
      message: 'Статус успешно обновлен на TECH_APPROVED',
    });
  }
  if (
    user.role === 'PROJECT_MANAGER_DELEGATE' &&
    doc.status === 'TECH_APPROVED'
  ) {
    await payload.update({
      collection: 'business-proposals',
      id,
      data: { status: 'APPROVED' },
    });
    await payload.create({
      collection: 'business-proposal-history',
      data: {
        businessProposal: +id,
        oldStatus: doc.status,
        newStatus: 'APPROVED',
        user: user.id,
        comment: body.comment,
      },
    });
    return Response.json({
      message: 'Статус успешно обновлен на APPROVED',
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

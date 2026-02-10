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

export const declineHandler: PayloadHandler = async ({
  routeParams,
  payload,
  user,
  json,
}) => {
  if (
    !user ||
    (user.role !== 'TECH_LEAD' && user.role !== 'PROJECT_MANAGER_DELEGATE')
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

  if (
    (user.role === 'TECH_LEAD' && doc.status === 'READY') ||
    (user.role === 'PROJECT_MANAGER_DELEGATE' && doc.status === 'TECH_APPROVED')
  ) {
    await payload.update({
      collection: 'business-proposals',
      id,
      data: { status: 'DECLINED' },
    });
    await payload.create({
      collection: 'business-proposal-history',
      data: {
        businessProposal: +id,
        oldStatus: doc.status,
        newStatus: 'DECLINED',
        user: user.id,
        comment: body.comment,
      },
    });
    return Response.json({
      message: 'Статус успешно обновлен на DECLINED',
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

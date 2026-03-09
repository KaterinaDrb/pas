import { type Customer, type User } from '@/payload-types';
import { type PayloadHandler } from 'payload';
import PDFDocument from 'pdfkit';

export const exportHandler: PayloadHandler = async ({
  routeParams,
  payload,
}) => {
  const id = routeParams?.id as string;

  const doc = await payload.findByID({
    collection: 'business-proposals',
    id,
  });

  console.log('doc', doc);

  const pdf = new PDFDocument();

  const stream = new ReadableStream({
    start(controller) {
      pdf.on('data', (chunk) => controller.enqueue(chunk));
      pdf.on('end', () => controller.close());
      pdf.on('error', (err) => controller.error(err));
    },
  });

  pdf
    .font('public/DejaVuSans.ttf')
    .fontSize(16)
    .text(`КП #${id} для ${doc.name}`, { align: 'center' })
    .moveDown()
    .fontSize(14)
    .text('Общая информация')
    .moveDown()
    .fontSize(12)
    .text(`Клиент: ${(doc.customer as Customer)?.name}`)
    .text(`Менеджер: ${(doc.user as User)?.name}`)
    .text(`Сумма: ${doc.price || 0} BYN`)
    .moveDown()
    .fontSize(14)
    .text('Состав предложения')
    .moveDown()
    .fontSize(12);

  if (doc.modules?.length) {
    doc.modules.forEach((module) => {
      if (typeof module === 'object' && module !== null) {
        pdf.text(
          `Модуль: ${module.name} (${module.amount} дн., ${module.price} BYN)`
        );
      } else {
        pdf.text(`Модуль #${module} (подробности не загружены)`);
      }
    });
  } else {
    pdf.text('Нет выбранных модулей');
  }

  pdf.end();

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="proposal-${id}.pdf"; filename*=UTF-8''${encodeURIComponent(doc.name || '')}.pdf`,
    },
  });
};

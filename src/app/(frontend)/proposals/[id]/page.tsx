'use client';
import HeaderMain from '../../../../components/HeaderMain';
import { draftProps } from '../../../../types/proposal';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Proposal() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const proposal = draftProps.find((p) => p.id === id);

  if (!proposal) {
    notFound();
  }

  return (
    <div>
      <HeaderMain />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none">Общая информация</h4>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Клиент:</span>
                <p className="font-medium">{proposal.title}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Менеджер:</span>
                <p className="font-medium">Иванов И.</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Сумма:</span>
                <p className="font-medium text-lg">{proposal.amount} BYN</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none">Состав предложения</h4>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">
                    1. Разработка ЛК пользователя (5 дн., 225&nbsp;000 ₽)
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  *Примечание: с учетом адаптации под мобильные устройства
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">
                    2. Деплой в k8s (2 дн., 90&nbsp;000 ₽)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none">Лента согласования</h4>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">
                  📝
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{proposal.date}:</span> Иванов
                    И. - создал черновик
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

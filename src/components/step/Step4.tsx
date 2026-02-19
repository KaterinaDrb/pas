'use client';
import React from 'react';
const Step4 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">ШАГ 4: СМЕТА И ИТОГИ</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Превью итогового документа
          </h3>
          <div className="text-card-foreground flex-col gap-6 rounded-xl border h-96 bg-muted/20 flex items-center justify-center">
            <p className="text-muted-foreground">
              Здесь будет превью PDF документа
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Итоговые показатели</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Итоговая стоимость:</span>
                <span className="font-semibold text-lg">0 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Итоговый срок:</span>
                <span className="font-semibold">0 месяца</span>
              </div>
              <div className="flex justify-between">
                <span>Трудозатраты:</span>
                <span>0 чел./дн.</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none border h-9 px-4 py-2 w-full">
              Отправить на согласование
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none border h-9 px-4 py-2 w-full">
              Экспорт в PDF
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none border h-9 px-4 py-2 w-full">
              Сохранить черновик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;

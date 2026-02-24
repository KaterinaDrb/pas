'use client';
import Button from '../Button';
interface Step4Props {
  totalPrice: number;
  totalMonths: number;
  totalDays: number;
  onSubmit: (status: 'DRAFT' | 'READY') => void;
  isSubmitting: boolean;
}

import React from 'react';
export default function Step4({
  totalPrice,
  totalMonths,
  totalDays,
  onSubmit,
  isSubmitting,
}: Step4Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ШАГ 4: СМЕТА И ИТОГИ</h2>

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
                <span className="font-semibold text-lg">{totalPrice} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Итоговый срок:</span>
                <span className="font-semibold">{totalMonths} месяца</span>
              </div>
              <div className="flex justify-between">
                <span>Трудозатраты:</span>
                <span>{totalDays} чел./дн.</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => onSubmit('READY')}
              disabled={isSubmitting}
              label="Отправить на согласование"
              variant="wide"
            />
            <Button
              onClick={() => onSubmit('READY')}
              disabled={isSubmitting}
              label="Экспорт в PDF"
              variant="outline"
              className="w-full"
            />
            <Button
              onClick={() => onSubmit('DRAFT')}
              disabled={isSubmitting}
              label="Сохранить черновик"
              variant="outline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

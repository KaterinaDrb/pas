'use client';
import React from 'react';
import Module from '../ModuleCard';
import Subgroup from '../Subgroup';
import { type ModuleGroup } from '../../payload-types';
import { useState } from 'react';
import { group } from 'console';
import Group from '../Group';

interface Step2Props {
  moduleGroups: ModuleGroup[];
}

const Step2 = ({ moduleGroups }: Step2Props) => {
  console.log('moduleGroups', moduleGroups);
  if (!moduleGroups || moduleGroups.length === 0) {
    return <p>No modules</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Библиотека модулей</h3>

          <div className="max-h-40 overflow-auto">
            {moduleGroups.map((group) => (
              <div key={group.id}>
                <Group group={group} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Собранное решение</h3>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
              <h4 className="text-sm">Проект: Новый проект</h4>
            </div>
            <div className="px-6 pb-6">
              <p className="text-sm text-muted-foreground">
                Выберите модули из библиотеки
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Смета и параметры</h3>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
              <h4 className="text-sm">Параметры проекта</h4>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm leading-none font-medium">
                  Сложность проекта
                </label>
                <button
                  type="button"
                  className="border-input flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span data-slot="select-value">Стандартный</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="grid auto-rows-min items-start gap-1.5 px-6 pt-6">
              <h4 data-slot="card-title" className="text-sm">
                Предварительная смета
              </h4>
            </div>
            <div className="px-6 pb-6 space-y-3">
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Трудозатраты:</span>
                  <span>0 чел./дн.</span>
                </div>
                <div className="flex justify-between">
                  <span>Стоимость (ставка 45&nbsp;000 ₽/дн.):</span>
                  <span>0 ₽</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>ИТОГО:</span>
                  <span>0 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Срок реализации:</span>
                  <span>0 мес.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;

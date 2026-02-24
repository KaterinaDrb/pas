'use client';
import React from 'react';
import { type ModuleGroup } from '../../payload-types';
import Group from '../Group';
import SelectedModuleItem from '../SelectedModuleItem';
import { type Module } from '../../payload-types';

interface Step2Props {
  moduleGroups: ModuleGroup[];
  selectedModules: Module[];
  onAddModule: (module: Module) => void;
  onRemoveModule: (moduleId: number) => void;
  complexity: 'standard' | 'high' | 'max';
  onComplexityChange: (value: 'standard' | 'high' | 'max') => void;
  totalDays: number;
  totalPrice: number;
  totalMonths: number;
}

const Step2 = ({
  moduleGroups,
  selectedModules,
  onAddModule,
  onRemoveModule,
  complexity,
  onComplexityChange,
  totalDays,
  totalPrice,
  totalMonths,
}: Step2Props) => {
  console.log('moduleGroups', moduleGroups);
  if (!moduleGroups || moduleGroups.length === 0) {
    return <p>No modules</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Библиотека модулей</h3>

          <div className="max-h-96 overflow-auto">
            {moduleGroups.map((group) => (
              <Group key={group.id} group={group} onAddModule={onAddModule} />
            ))}
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Собранное решение</h3>
          <div className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-accent">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
              <h4 className="text-sm">Проект: Новый проект</h4>
            </div>
            {selectedModules.length === 0 ? (
              <p className="text-sm text-muted-foreground px-6 mb-6">
                Выберите модули из библиотеки
              </p>
            ) : (
              <div className="space-y-2 px-6 pb-6">
                {selectedModules.map((module) => (
                  <SelectedModuleItem
                    key={module.id}
                    module={module}
                    onRemove={onRemoveModule}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold">Смета и параметры</h3>
          <div className="bg-white border-accent text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
              <h4 className="text-sm">Параметры проекта</h4>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm leading-none font-medium">
                  Сложность проекта
                </label>
                <select
                  value={complexity}
                  onChange={(e) =>
                    onComplexityChange(
                      e.target.value as 'standard' | 'high' | 'max'
                    )
                  }
                  className="w-full mt-1 p-2 border rounded-md bg-secondary border-accent outline-none"
                >
                  <option value="standard">Стандартный</option>
                  <option value="high">Повышенный</option>
                  <option value="max">Максимальный</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-accent">
            <div className="grid auto-rows-min items-start gap-1.5 px-6 pt-6">
              <h4 data-slot="card-title" className="text-sm">
                Предварительная смета
              </h4>
            </div>
            <div className="px-6 pb-6 space-y-3">
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Трудозатраты:</span>
                  <span>{totalDays} чел./дн.</span>
                </div>
                <div className="flex justify-between">
                  <span>Стоимость (ставка 2&nbsp;000 BYN/дн.):</span>
                  <span>{totalPrice} BYN</span>
                </div>
                <hr className="text-gray"></hr>
                <div className="flex justify-between font-semibold">
                  <span>ИТОГО:</span>
                  <span>{totalPrice} BYN</span>
                </div>
                <div className="flex justify-between">
                  <span>Срок реализации:</span>
                  <span>{totalMonths} мес.</span>
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

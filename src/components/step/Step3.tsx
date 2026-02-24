'use client';
import React from 'react';
import Button from '../Button';
import { useEffect } from 'react';

interface Step3Props {
  data: {
    assumptions: string;
    analysisDays: number;
    developmentDays: number;
    testingDays: number;
    deploymentDays: number;
  };
  updateData: (field: keyof Step3Props['data'], value: any) => void;
  totalDays: number;
}

const Step3 = ({ data, updateData, totalDays }: Step3Props) => {
  useEffect(() => {
    const hasValues =
      data.analysisDays !== 0 ||
      data.developmentDays !== 0 ||
      data.testingDays !== 0 ||
      data.deploymentDays !== 0;

    if (!hasValues && totalDays > 0) {
      // пропорция: 20% - аналитика, 50% - разработка, 20% - тестирование, 10% - внедрение
      const analysis = Math.round(totalDays * 0.2);
      const development = Math.round(totalDays * 0.5);
      const testing = Math.round(totalDays * 0.2);
      const deployment = totalDays - analysis - development - testing;

      updateData('analysisDays', analysis);
      updateData('developmentDays', development);
      updateData('testingDays', testing);
      updateData('deploymentDays', deployment);
    }
  }, [totalDays]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ШАГ 3: ДЕТАЛИЗАЦИЯ</h2>
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-base font-semibold leading-none mb-2">
            Допущения и ограничения
          </label>
          <textarea
            className="border-input flex w-full rounded-md border border-gray focus:border-2 bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            id="assumptions"
            placeholder="Описание условий, при которых оценка верна"
            value={data.assumptions}
            onChange={(e) => updateData('assumptions', e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="flex items-center gap-2 text-base font-semibold leading-none select-none">
            Этапы проекта и сроки
          </label>
          <div className="grid grid-cols-2 gap-4 mt-2 p-[5px]">
            <div className="flex flex-col justify-between">
              <label
                data-slot="label"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2"
              >
                Аналитика и проектирование (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border border-gray px-3 py-1 text-base transition-[color,box-shadow] focus:border-2 outline-none"
                id="analysis"
                value={data.analysisDays}
                onChange={(e) =>
                  updateData('analysisDays', Number(e.target.value))
                }
                min={0}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                Разработка (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border border-gray px-3 py-1 text-base bg-input-background transition-[color,box-shadow] focus:border-2 outline-none"
                id="development"
                value={data.developmentDays}
                onChange={(e) =>
                  updateData('developmentDays', Number(e.target.value))
                }
                min={0}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
                Тестирование (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border border-gray px-3 py-1 text-base bg-input-background transition-[color,box-shadow] focus:border-2 outline-none"
                id="testing"
                value={data.testingDays}
                onChange={(e) =>
                  updateData('testingDays', Number(e.target.value))
                }
                min={0}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm leading-none font-medium select-none mb-2">
                Ввод в эксплуатацию (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border border-gray px-3 py-1 text-base bg-input-background transition-[color,box-shadow] focus:border-2 outline-none"
                id="deployment"
                value={data.deploymentDays}
                onChange={(e) =>
                  updateData('deploymentDays', Number(e.target.value))
                }
                min={0}
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-base font-semibold leading-none select-none mt-4">
              Предварительный план проекта
            </label>
            <div className="mt-2">
              <Button label="Загрузить файл .docx / .xlsx" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;

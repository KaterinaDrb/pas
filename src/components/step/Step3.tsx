'use client';
import React from 'react';
import Button from '../Button';

const Step3 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">ШАГ 3: ДЕТАЛИЗАЦИЯ</h2>
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm leading-none font-medium">
            Допущения и ограничения
          </label>
          <textarea
            className="border-input flex w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            id="assumptions"
            placeholder="Описание условий, при которых оценка верна"
          ></textarea>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
            Этапы проекта и сроки
          </label>
          <div className="grid grid-cols-2 gap-4 mt-2 p-[5px]">
            <div>
              <label
                data-slot="label"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none"
              >
                Аналитика и проектирование (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none"
                id="analysis"
                value="0"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                Разработка (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none"
                id="development"
                value="0"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
                Тестирование (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none"
                id="testing"
                value="0"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
                Ввод в эксплуатацию (чел./дн.)
              </label>
              <input
                type="number"
                className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none"
                id="deployment"
                value="0"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
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

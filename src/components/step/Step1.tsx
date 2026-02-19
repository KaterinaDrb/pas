'use client';
import React from 'react';
import { type StepData } from '../../app/(frontend)/create/CreateClient';
import { useState, useEffect } from 'react';
import { type ProposalForm } from '../../types/ProposalForm';
import { type Customer } from '../../payload-types';
import Button from '../Button';

interface Step1Props {
  data: Pick<
    ProposalForm,
    'customerId' | 'customerName' | 'description' | 'requirements'
  >;
  updateData: (field: keyof ProposalForm, value: any) => void;
}

export default function Step1({ data, updateData }: Step1Props) {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomer(data);
        } else if (data && Array.isArray(data.data)) {
          setCustomer(data.data);
        } else {
          console.error('Unexpected customers API response', data);
          setCustomer([]);
        }
      })
      .catch((err) => console.error('Failed to load customers', err));
  }, []);

  const handleCustomerChange = (customerId: number, customerName: string) => {
    updateData('customerId', customerId);
    updateData('customerName', customerName);
  };

  const handleRequirementToggle = (reqId: string) => {
    const newReqs = data.requirements.includes(reqId)
      ? data.requirements.filter((r) => r !== reqId)
      : [...data.requirements, reqId];
    updateData('requirements', newReqs);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">ШАГ 1: КЛИЕНТ И ПОТРЕБНОСТИ</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
              Клиент
            </label>

            <select
              value={data.customerId || ''}
              onChange={(e) => {
                const celectedId = Number(e.target.value);
                const selectedCustomer = customer.find(
                  (c) => c.id === celectedId
                );

                if (selectedCustomer) {
                  handleCustomerChange(
                    selectedCustomer.id,
                    selectedCustomer.name
                  );
                }
              }}
            >
              <option value="">Выберите клиента из списка</option>
              {customer.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <Button variant="outline" label="Добавить нового" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            Краткое описание проекта
          </label>
          <textarea
            className="flex w-full rounded-md border px-3 py-2 text-base transition-[color,box-shadow] outline-none min-h-[100px]"
            placeholder="Разработка портала для подачи заявлений на..."
            rows={3}
            value={data.description}
            onChange={(e) => updateData('description', e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            Ключевые требования
          </label>
          <div className="space-y-2 mt-2">
            {[
              {
                id: 'highload',
                label: 'Высокая нагрузка (>1000 пользователей одновременно)',
              },
              {
                id: 'gosinteg',
                label:
                  'Интеграция с государственными системами (ЕСИА, реестры)',
              },
              { id: 'pd', label: 'Соответствие требованиям АТОС/Закону о ПДн' },
              { id: 'support', label: 'Техническая поддержка 24/7' },
            ].map((req) => (
              <div key={req.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={req.id}
                  checked={data.requirements.includes(req.id)}
                  onChange={() => handleRequirementToggle(req.id)}
                />
                <label htmlFor={req.id}>{req.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

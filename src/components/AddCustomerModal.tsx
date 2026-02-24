'use client';
import { useState } from 'react';
import Button from './Button';
import { createCustomer } from '@/app/(frontend)/create/actions';
import { type Customer } from '../payload-types';

interface AddCustomerModalProps {
  onClose: () => void;
  onCustomerAdded: (customer: Customer) => void;
}

export default function AddCustomerModal({
  onClose,
  onCustomerAdded,
}: AddCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await createCustomer(formData);
    setIsSubmitting(false);
    if (result.success && result.customer) {
      onCustomerAdded(result.customer);
      onClose();
    } else {
      alert('Ошибка: ' + result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Добавить нового клиента</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Название компании *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Контактное лицо *
            </label>
            <input
              type="text"
              name="contact_person"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Телефон</label>
            <input
              type="tel"
              name="phone"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Адрес</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">УНП</label>
            <input
              type="text"
              name="unp"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose}>Отмена</button>
            <button disabled={isSubmitting}>Добавить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

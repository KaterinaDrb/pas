'use server';

import api from '@/api';
import { type Customer, type ModuleGroup } from '@/payload-types';
import { type PaginatedDocs } from 'payload';
import { type ProposalForm } from '@/types/ProposalForm';

export async function getModuleGroups() {
  try {
    const { data } = await api.get<{ docs: ModuleGroup[] }>(
      `/module-group?depth=2&sort=name`
    );
    return data.docs;
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

export async function getClients() {
  try {
    const { data } = await api.get<PaginatedDocs<Customer>>(`/customers`);
    return data.docs;
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

export async function createProposal(
  formData: ProposalForm,
  status: 'DRAFT' | 'READY'
) {
  try {
    const totalDays = formData.selectedModules.reduce(
      (sum, m) => sum + (m.amount || 0),
      0
    );

    const multiplier =
      formData.complexity === 'high'
        ? 1.2
        : formData.complexity === 'max'
          ? 1.5
          : 1;
    const totalPrice = Math.round(totalDays * 2000 * multiplier);
    const payload = {
      name: formData.customerName,
      description: JSON.stringify({
        description: formData.description,
        requirements: formData.requirements,
        assumptions: formData.assumptions,
        stages: {
          analysis: formData.analysisDays,
          development: formData.developmentDays,
          testing: formData.testingDays,
          deployment: formData.deploymentDays,
        },
      }),
      customer: formData.customerId,
      status,
      price: Math.round(totalPrice),
      modules: formData.selectedModules.map((m) => m.id),
    };

    const { data } = await api.post('/business-proposals', payload);
    console.log('createProposal called with status:', status);
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error(
      'Error creating proposal:',
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || 'Ошибка создания',
    };
  }
}

export async function createCustomer(formData: FormData) {
  try {
    const payload = {
      name: formData.get('name'),
      contact_person: formData.get('contact_person'),
      email: formData.get('email'),
      phone: formData.get('phone') || null,
      address: formData.get('address') || null,
      unp: formData.get('unp') || null,
    };

    const { data } = await api.post('/customers', payload);
    return { success: true, customer: data };
  } catch (error: any) {
    console.error('Error creating customer:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Ошибка создания',
    };
  }
}

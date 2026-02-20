'use server';

import api from '@/api';
import { type Customer, type ModuleGroup } from '@/payload-types';
import { type PaginatedDocs } from 'payload';

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

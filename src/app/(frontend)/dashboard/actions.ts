import api from '@/api';
import { type BusinessProposal } from '@/payload-types';
import { type PaginatedDocs } from 'payload';

export const getDraftBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][equals]=DRAFT`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getReadyBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][equals]=READY`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

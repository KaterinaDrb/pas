import api from '@/api';
import { type BusinessProposal } from '@/payload-types';
import { error } from 'console';
import { type PaginatedDocs } from 'payload';
import { type User } from '@/payload-types';

export const getDraftBusinessProposals = async (currentUser?: User | null) => {
  try {
    if (currentUser) {
      const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
        `/business-proposals?where[status][equals]=DRAFT&where[user][equals]=${currentUser.id}`
      );
      return data;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const getReadyBusinessProposalsforManager = async (
  currentUser?: User | null
) => {
  try {
    if (currentUser) {
      const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
        `/business-proposals?where[status][in]=READY,TECH_APPROVED&where[user][equals]=${currentUser.id}`
      );
      return data;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const getApprovedBusinessProposalsForManager = async (
  currentUser?: User | null
) => {
  try {
    if (currentUser) {
      const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
        `/business-proposals?where[status][equals]=APPROVED&where[user][equals]=${currentUser.id}`
      );
      return data;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const getReadyBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][in][]=READY`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getTechApprovedBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][in][]=TECH_APPROVED`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getApprovedBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][in][]=APPROVED`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getDeclinedBusinessProposals = async () => {
  try {
    const { data } = await api.get<PaginatedDocs<BusinessProposal>>(
      `/business-proposals?where[status][in][]=DECLINED`
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

'use server';
import api from '@/api';
import { type BusinessProposal } from '@/payload-types';
import { type BusinessProposalHistory } from '@/payload-types';

export async function getProposalById(
  id: number
): Promise<BusinessProposal | null> {
  try {
    const { data } = await api.get(`/business-proposals/${id}?depth=1`);
    return data;
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return null;
  }
}

export async function approveProposal(id: number, comment: string) {
  try {
    const { data } = await api.patch(`/business-proposals/${id}/approve`, {
      comment: comment,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error('Error approving proposal:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Ошибка при утверждении КП',
    };
  }
}

export async function declineProposal(id: number, comment: string) {
  try {
    const { data } = await api.patch(`/business-proposals/${id}/decline`, {
      comment: comment,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error('Error declining proposal:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Ошибка при отклонении КП',
    };
  }
}

export async function getProposalHistory(
  proposalId: number
): Promise<BusinessProposalHistory[]> {
  try {
    const { data } = await api.get(
      `/business-proposal-history?where[businessProposal][equals]=${proposalId}&depth=1&sort=-createdAt`
    );

    return data.docs;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

import { type Module } from '../payload-types';

export interface ProposalForm {
  customerId?: number | null;
  customerName?: string;
  description: string;
  requirements: string[];

  selectedModules: Module[];
  complexity: 'standard' | 'high' | 'max';

  assumptions: string;
  analysisDays: number;
  developmentDays: number;
  testingDays: number;
  deploymentDays: number;
}

export type ProposalStatus = 'draft' | 'pending' | 'approved';

export interface comProposal {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: ProposalStatus;
}

export const draftProps: comProposal[] = [
  {
    id: '1',
    title: 'БелАгроТрейд',
    date: '12.01.2023',
    amount: 1500,
    status: 'draft',
  },
  {
    id: '2',
    title: 'МинскСтройИнвест',
    date: '12.01.2023',
    amount: 9000,
    status: 'draft',
  },
  {
    id: '3',
    title: 'ТрансАвтоЛогистик',
    date: '12.01.2023',
    amount: 7000,
    status: 'draft',
  },
  {
    id: '4',
    title: 'МедФармБел',
    date: '12.01.2023',
    amount: 5000,
    status: 'draft',
  },
];

export const pendingProps: comProposal[] = [
  {
    id: '1',
    title: 'ЭнергоПромСервис',
    date: '12.01.2023',
    amount: 12000,
    status: 'pending',
  },
  {
    id: '2',
    title: 'ТурБелХолидей',
    date: '12.01.2023',
    amount: 2000,
    status: 'pending',
  },
];

export const approvedProps: comProposal[] = [
  {
    id: '1',
    title: 'ДомКомФинанс',
    date: '12.01.2023',
    amount: 22000,
    status: 'approved',
  },
  {
    id: '2',
    title: 'CyberLink Global',
    date: '12.01.2023',
    amount: 15000,
    status: 'approved',
  },
];

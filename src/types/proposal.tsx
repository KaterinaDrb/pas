export type ProposalStatus =
  | ('DRAFT' | 'READY' | 'TECH_APPROVED' | 'APPROVED' | 'DECLINED')
  | null;

export interface comProposal {
  id: number;
  title: string;
  date: string;
  amount: number | null | undefined;
  status: ProposalStatus;
}

export const draftProps: comProposal[] = [
  {
    id: 1,
    title: 'БелАгроТрейд',
    date: '12.01.2023',
    amount: 1500,
    status: 'DRAFT',
  },
  {
    id: 2,
    title: 'МинскСтройИнвест',
    date: '12.01.2023',
    amount: 9000,
    status: 'DRAFT',
  },
  {
    id: 3,
    title: 'ТрансАвтоЛогистик',
    date: '12.01.2023',
    amount: 7000,
    status: 'DRAFT',
  },
  {
    id: 4,
    title: 'МедФармБел',
    date: '12.01.2023',
    amount: 5000,
    status: 'DRAFT',
  },
];

export const pendingProps: comProposal[] = [
  {
    id: 1,
    title: 'ЭнергоПромСервис',
    date: '12.01.2023',
    amount: 12000,
    status: 'READY',
  },
  {
    id: 2,
    title: 'ТурБелХолидей',
    date: '12.01.2023',
    amount: 2000,
    status: 'READY',
  },
];

export const approvedProps: comProposal[] = [
  {
    id: 1,
    title: 'ДомКомФинанс',
    date: '12.01.2023',
    amount: 22000,
    status: 'APPROVED',
  },
  {
    id: 2,
    title: 'CyberLink Global',
    date: '12.01.2023',
    amount: 15000,
    status: 'APPROVED',
  },
];

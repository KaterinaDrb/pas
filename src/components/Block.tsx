import React from 'react';
import Card from './Card';
import { FaRegFileAlt, FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import { type ProposalStatus } from '../types/proposal';
import { type comProposal } from '../types/proposal';

interface ProposalSectionProps {
  status: ProposalStatus;
  proposals: comProposal[];
}

const Block = ({ status, proposals }: ProposalSectionProps) => {
  const config = {
    draft: {
      title: 'Черновики',
      icon: <FaRegFileAlt />,
    },
    pending: {
      title: 'Ждут согласования',
      icon: <FaRegClock />,
      style: 'text-yellow-600',
    },
    approved: {
      title: 'Согласованные',
      icon: <FaRegCheckCircle />,
      style: 'text-green-600',
    },
  }[status];

  return (
    <div className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-secondary">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-3">
        <h4 className="flex items-center gap-2 text-lg">
          <div className={config.style}>{config.icon}</div>

          {config.title}
          <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1 transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground ml-auto">
            {proposals.length}
          </span>
        </h4>
      </div>
      <div className="px-6 pb-6 space-y-3">
        {proposals.map((proposal) => (
          <Card key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
};

export default Block;

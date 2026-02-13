import React from 'react';
import Link from 'next/link';
import { type ProposalStatus } from '../types/proposal';

const StatusColors: Record<ProposalStatus, string> = {
  draft: 'bg-white hover:bg-secondary-1 border-secondary-1',
  pending: 'bg-pending hover:bg-pending-1 border-pending-1',
  approved: 'bg-approved hover:bg-approved-1 border-approved-1',
};

interface CardProps {
  id: number;
  title: string;
  date: string;
  amount: number;
  status: ProposalStatus;
}

const Card = ({ id, title, date, amount, status }: CardProps) => {
  const styles = StatusColors[status];
  return (
    <div
      className={`p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer ${styles}`}
    >
      <Link className="font-medium text-sm mb-1" href={`/proposals/${id}`}>
        КП для &quot;{title}&quot;
      </Link>

      <div className="flex justify-between items-center text-xs">
        <span>{date}</span>
        <span className="font-semibold">{amount} BYN</span>
      </div>
    </div>
  );
};

export default Card;

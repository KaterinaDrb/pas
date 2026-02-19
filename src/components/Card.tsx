import React from 'react';
import Link from 'next/link';
import { type ProposalStatus } from '../types/proposal';

const StatusColors: Record<Exclude<ProposalStatus, null>, string> = {
  DRAFT: 'bg-white hover:bg-secondary-1 border-secondary-1',
  READY: 'bg-pending hover:bg-pending-1 border-pending-1',
  APPROVED: 'bg-approved hover:bg-approved-1 border-approved-1',
  TECH_APPROVED: 'bg-approved hover:bg-approved-1 border-approved-1',
  DECLINED: 'bg-approved hover:bg-approved-1 border-approved-1',
};

interface CardProps {
  id: number;
  title: string;
  date: string;
  amount: number | null | undefined;
  status: ProposalStatus;
}

const Card = ({ id, title, date, amount, status }: CardProps) => {
  const bgClass = status ? StatusColors[status] : 'bg-gray-100';
  return (
    <div
      className={`p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer ${bgClass}`}
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

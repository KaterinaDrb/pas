'use client';
import React from 'react';
import Button from './Button';
import { IoMdArrowBack } from 'react-icons/io';
import { type ProposalStatus } from '../types/proposal';
import { FiDownload } from 'react-icons/fi';
interface HeaderProps {
  buttonNeeded?: boolean;
  proposalTitle?: string | null | undefined;
  proposalId?: number;
  proposalStatus?: ProposalStatus | null;
}

const Header = ({
  buttonNeeded = false,
  proposalTitle = ' ',
  proposalId,
  proposalStatus,
}: HeaderProps) => {
  const renderActions = () => {
    switch (proposalStatus) {
      case 'DRAFT':
        return (
          <span className="rounded-md border px-2 py-0.5 w-fit text-muted border-accent bg-secondary text-xs font-medium">
            Черновик
          </span>
        );
      case 'READY':
        return (
          <span className="rounded-md border px-2 py-0.5 w-fit text-muted border-pending-1 bg-pending text-xs font-medium">
            На согласовании у тех.директора
          </span>
        );
      case 'TECH_APPROVED':
        return (
          <span className="rounded-md border px-2 py-0.5 w-fit text-yellow-700 border-pending-1 bg-pending text-xs font-medium">
            На коммерческом согласовании
          </span>
        );
      case 'APPROVED':
        return (
          <span className="rounded-md border px-2 py-0.5 w-fit text-green-700 border-approved-1 bg-approved text-xs font-medium">
            Одобрено
          </span>
        );
      case 'DECLINED':
        return (
          <span className="rounded-md border px-2 py-0.5 w-fit text-red-800 border-red-600 bg-red-200 text-xs font-medium">
            Отклонено
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="border-b border-secondary-1 p-4">
      <div className="flex items-center gap-4 max-w-7xl mx-auto justify-between">
        <div className="flex justify-between gap-4 items-center">
          <Button
            label="Назад"
            variant="outline"
            link="/dashboard"
            startIcon={<IoMdArrowBack />}
            className="border-0"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {proposalTitle != ' '
                ? `КП #${proposalId} для ${proposalTitle} `
                : 'КП Конструктор'}
            </span>
            <h1>{renderActions()}</h1>
          </div>
        </div>
        {buttonNeeded && (
          <Button
            label="Скачать PDF"
            variant="secondary"
            startIcon={<FiDownload />}
          />
        )}{' '}
      </div>
    </header>
  );
};

export default Header;

'use client';
import React from 'react';
import { type BusinessProposal } from '../../../../payload-types';
import Header from '../../../../components/Header';
import { type BusinessProposalHistory } from '../../../../payload-types';
import ApprovalRibbon from '../../../../components/ApprovalRibbon';
import CommentField from '../../../../components/CommentField';
import { type User } from '../../../../payload-types';
import { REQUIREMENTS_MAP } from '../../../../types/requirements';

interface ProposalDetailsProps {
  proposal: BusinessProposal;
  history: BusinessProposalHistory[];
  user: User;
}
export default function ProposalDetails({
  proposal,
  history,
  user,
}: ProposalDetailsProps) {
  const dateToString = new Date(proposal.createdAt).toLocaleString('ru-RU');
  const orderedHistory = React.useMemo(() => [...history].reverse(), [history]);

  let parsedDescription = {
    description: '',
    requirements: [] as string[],
    assumptions: '',
    stages: {
      analysis: 0,
      development: 0,
      testing: 0,
      deployment: 0,
    },
  };

  try {
    parsedDescription = JSON.parse(proposal.description || '{}');
  } catch (error) {
    console.error('Ошибка парсинга description', error);
  }

  const readableRequirements = parsedDescription.requirements.map(
    (reqId) => REQUIREMENTS_MAP[reqId] || reqId
  );

  const renderActions = () => {
    switch (true) {
      case proposal.status === 'DRAFT':
        return (
          <CommentField
            sendButton={true}
            title="Отправить на согласование"
            proposalId={proposal.id}
          />
        );
      case user?.role === 'TECH_LEAD' && proposal.status === 'READY':
        return <CommentField approveButtons={true} proposalId={proposal.id} />;
      case user?.role === 'PROJECT_MANAGER_DELEGATE' &&
        proposal.status === 'TECH_APPROVED':
        return <CommentField approveButtons={true} proposalId={proposal.id} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Header
        buttonNeeded={true}
        proposalTitle={proposal.name}
        proposalId={proposal.id}
        proposalStatus={proposal.status}
      />

      <div className="bg-secondary">
        <div className="max-w-4xl mx-auto p-6 space-y-6 ">
          <div className="bg-white flex flex-col gap-6 rounded-xl border border-accent">
            <h4 className=" px-6 pt-6 leading-none font-semibold">
              Общая информация
            </h4>

            <div className="px-6 pb-6 grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-muted">Клиент:</span>
                <p className="font-medium">{proposal.name}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Менеджер:</span>
                <p>
                  {proposal.user
                    ? typeof proposal.user === 'object'
                      ? proposal.user.name
                      : `Пользователь ${proposal.user}`
                    : 'Неизвестен'}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted">Сумма:</span>
                <p className="font-medium text-lg">{proposal.price} BYN</p>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-6 rounded-xl border border-accent">
            <h4 className="px-6 pt-6 font-semibold leading-none">
              Состав предложения
            </h4>

            <div className="space-y-4 px-6 pb-6">
              {proposal.modules && proposal.modules?.length > 0 ? (
                <ol className="list-decimal list-inside">
                  {proposal.modules?.map((module) => {
                    if (typeof module === 'object' && module !== null) {
                      return (
                        <div
                          key={module.id}
                          className="border-l-4 border-primary pl-4"
                        >
                          <li className="mb-2 font-medium">
                            {module.name} ({module.amount} дн., {module.price}{' '}
                            BYN)
                          </li>
                        </div>
                      );
                    } else {
                      return (
                        <li key={module}>
                          Модуль #{module} (подробности не загружены)
                        </li>
                      );
                    }
                  })}
                </ol>
              ) : (
                <p>Нет выбранных модулей</p>
              )}
            </div>
          </div>

          <div className="bg-white flex flex-col gap-6 p-6 rounded-xl border border-accent">
            <p>
              <strong>Описание проекта</strong> {parsedDescription.description}
            </p>

            {readableRequirements.length > 0 && (
              <div>
                <strong>Требования:</strong>
                <ul className="list-disc pl-5">
                  {readableRequirements.map((label, index) => (
                    <li key={index}>{label}</li>
                  ))}
                </ul>
              </div>
            )}

            <p>
              <strong>Допущения:</strong> {parsedDescription.assumptions || '—'}
            </p>

            <h3 className="font-semibold">Этапы проекта:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                Аналитика: {parsedDescription.stages?.analysis} чел./дн.
              </div>
              <div>
                Разработка: {parsedDescription.stages?.development} чел./дн.
              </div>
              <div>
                Тестирование: {parsedDescription.stages?.testing} чел./дн.
              </div>
              <div>
                Внедрение: {parsedDescription.stages?.deployment} чел./дн.
              </div>
            </div>
          </div>

          <div className="bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-accent">
            <h4 className="leading-none font-semibold px-6 pt-6">
              Лента согласования
            </h4>

            <div className="space-y-3 px-6 pb-6">
              <ApprovalRibbon
                id={proposal.id}
                name={
                  proposal.user && typeof proposal.user === 'object'
                    ? proposal.user.name
                    : 'Неизвестен'
                }
                date={dateToString}
              />

              <ul className="space-y-3">
                {orderedHistory.map((record) => {
                  const userName =
                    typeof record.user === 'object' && record.user?.name
                      ? record.user.name
                      : `Пользователь ${record.user}`;

                  const date = new Date(record.createdAt).toLocaleString(
                    'ru-RU'
                  );
                  return (
                    <li key={record.id}>
                      <ApprovalRibbon
                        id={record.id}
                        date={date}
                        name={userName}
                        oldStatus={record.oldStatus}
                        newStatus={record.newStatus}
                        comment={record.comment}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>{renderActions()}</div>
        </div>
      </div>
    </div>
  );
}

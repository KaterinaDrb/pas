import Block from '../../../components/Block';
import Button from '../../../components/Button';
import { FaPlus } from 'react-icons/fa';
import HeaderMain from '../../../components/HeaderMain';
import Footer from '../../../components/Footer';
import { getDraftBusinessProposals } from './actions';
import {
  getReadyBusinessProposals,
  getTechApprovedBusinessProposals,
} from './actions';
import { cookies } from 'next/headers';
import { type BusinessProposal } from '../../../payload-types';
import { type ProposalStatus } from '../../../types/proposal';
import { getApprovedBusinessProposals } from './actions';
import { getUser } from '../actions';
import { getDeclinedBusinessProposals } from './actions';
import {
  getReadyBusinessProposalsforManager,
  getApprovedBusinessProposalsForManager,
} from './actions';

const mapToBlockProposal = (bp: BusinessProposal) => ({
  id: bp.id,
  title: bp.name || 'no name',
  date: bp.createdAt,
  amount: bp.price ?? 0,
  status: bp.status as ProposalStatus,
});

export default async function Dashboard() {
  const cookie = await cookies();
  const user = await getUser();
  const data = await getDraftBusinessProposals(user);
  const draftProposals = (data?.docs ?? []).map(mapToBlockProposal);

  const data_approved_manager =
    await getApprovedBusinessProposalsForManager(user);
  const approvedProposalsManager = (data_approved_manager?.docs ?? []).map(
    mapToBlockProposal
  );

  const data_ready_manager = await getReadyBusinessProposalsforManager(user);
  const readyProposalsManager = (data_ready_manager?.docs ?? []).map(
    mapToBlockProposal
  );
  const data_ready = await getReadyBusinessProposals();
  const readyProposals = (data_ready?.docs ?? []).map(mapToBlockProposal);

  const data_tech_approved = await getTechApprovedBusinessProposals();
  const techapprovedProposals = (data_tech_approved?.docs ?? []).map(
    mapToBlockProposal
  );

  const data_approved = await getApprovedBusinessProposals();
  const approvedProposals = (data_approved?.docs ?? []).map(mapToBlockProposal);

  const data_declined = await getDeclinedBusinessProposals();
  const declinedProposals = (data_declined?.docs ?? []).map(mapToBlockProposal);

  const renderActions = () => {
    switch (user?.role) {
      case 'PROJECT_MANAGER':
        return (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
            <Block status="DRAFT" proposals={draftProposals} />
            <Block status="READY" proposals={readyProposalsManager} />
            <Block status="APPROVED" proposals={approvedProposalsManager} />
          </div>
        );
      case 'TECH_LEAD':
        return (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
            <Block status="READY" proposals={readyProposals} />
            <Block status="TECH_APPROVED" proposals={techapprovedProposals} />
            <Block status="APPROVED" proposals={approvedProposals} />
          </div>
        );
      case 'PROJECT_MANAGER_DELEGATE':
        return (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
            <Block status="TECH_APPROVED" proposals={techapprovedProposals} />
            <Block status="APPROVED" proposals={approvedProposals} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderMain />
      <main className="max-w-7xl mx-auto p-6 pb-20 space-y-8 bg-secondary">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Мои коммерческие предложения</h1>
          {user?.role === 'PROJECT_MANAGER' && (
            <Button
              label="Создать новое КП"
              startIcon={<FaPlus />}
              link="create"
            />
          )}
        </div>

        <div>{renderActions()}</div>
        {declinedProposals.length !== 0 && (
          <div>
            <Block status="DECLINED" proposals={declinedProposals} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

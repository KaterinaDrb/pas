import Block from '../../../components/Block';
import Button from '../../../components/Button';
import { FaPlus } from 'react-icons/fa';
import HeaderMain from '../../../components/HeaderMain';
import Footer from '../../../components/Footer';
import { pendingProps } from '../../../types/proposal';
import { approvedProps } from '../../../types/proposal';
import { getDraftBusinessProposals } from './actions';
import { getReadyBusinessProposals } from './actions';
import { cookies } from 'next/headers';
import { type BusinessProposal } from '../../../payload-types';
import { type ProposalStatus } from '../../../types/proposal';

const mapToBlockProposal = (bp: BusinessProposal) => ({
  id: bp.id,
  title: bp.name || 'no name',
  date: bp.createdAt,
  amount: bp.price ?? 0,
  status: bp.status as ProposalStatus,
});

export default async function Dashboard() {
  const cookie = await cookies();
  console.log(cookie);
  const data = await getDraftBusinessProposals();
  const draftProposals = (data?.docs ?? []).map(mapToBlockProposal);

  const data_ready = await getReadyBusinessProposals();
  const readyProposals = (data_ready?.docs ?? []).map(mapToBlockProposal);

  console.log('data_ready', data);

  return (
    <div>
      <HeaderMain />
      <main className="max-w-7xl mx-auto p-6 pb-20 space-y-8 bg-secondary">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Мои коммерческие предложения</h1>
          <Button
            label="Создать новое КП"
            startIcon={<FaPlus />}
            link="create"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Block status="DRAFT" proposals={draftProposals} />
          <Block status="READY" proposals={readyProposals} />
          <Block status="APPROVED" proposals={approvedProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

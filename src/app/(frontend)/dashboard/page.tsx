import Block from '../../../components/Block';
import Button from '../../../components/Button';
import { FaPlus } from 'react-icons/fa';
import HeaderMain from '../../../components/HeaderMain';
import Footer from '../../../components/Footer';
import { draftProps } from '../../../types/proposal';
import { pendingProps } from '../../../types/proposal';
import { approvedProps } from '../../../types/proposal';
import { getDraftBusinessProposals } from './actions';

export default async function Dashboard() {
  const data = await getDraftBusinessProposals();

  console.log('data', data);

  return (
    <div>
      <HeaderMain />
      <main className="max-w-7xl mx-auto p-6 pb-20 space-y-8 bg-secondary">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Мои коммерческие предложения</h1>
          <Button label="Создать новое КП" startIcon={FaPlus} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Block status="draft" proposals={draftProps} />
          <Block status="pending" proposals={pendingProps} />
          <Block status="approved" proposals={approvedProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

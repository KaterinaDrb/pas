import { getProposalById } from './actions';
import ProposalDetails from './ProposalDetails';
import { getProposalHistory } from './actions';
import { getUser } from '../../actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Proposal({ params }: PageProps) {
  const { id } = await params;
  const proposal = await getProposalById(Number(id));
  const history = await getProposalHistory(Number(id));
  const user = await getUser();

  if (!proposal) {
    return <div>КП не найдено</div>;
  }

  return <ProposalDetails proposal={proposal} history={history} user={user} />;
}

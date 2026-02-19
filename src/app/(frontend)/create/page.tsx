import { getModuleGroups } from './actions';
import CreateProposal from './CreateClient';

export default async function GetModules() {
  const moduleGroups = await getModuleGroups();
  return <CreateProposal moduleGroups={moduleGroups} />;
}

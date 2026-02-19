import Module from '../components/ModuleCard';
import { type ModuleProps } from '../components/ModuleCard';
interface Subgroup {
  title: string;
  module: ModuleProps;
}

export const Subgroups: Subgroup[] = [
  { title: '', module: { title: '', duration: 5 } },
];

import { MdNavigateNext } from 'react-icons/md';
interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, title: 'Клиент и потребности' },
    { id: 2, title: 'Архитектура решения' },
    { id: 3, title: 'Детализация' },
    { id: 4, title: 'Смета и итоги' },
  ];
  return (
    <div className="flex items-center justify-center space-x-4 px-4 py-3">
      {steps.map((step) => (
        <div key={step.id} className="flex justify-center items-center">
          <div
            className={` flex w-8 h-8 rounded-full items-center justify-center text-gray-400
					${step.id < currentStep ? 'bg-green-500 text-white' : step.id === currentStep ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            {step.id}
          </div>
          <span
            className={`ml-2 ${step.id < currentStep ? 'text-gray-800' : step.id === currentStep ? 'text-primary' : 'text-gray-400'} `}
          >
            {step.title}
          </span>
          <MdNavigateNext className="mx-4" />
        </div>
      ))}
    </div>
  );
}

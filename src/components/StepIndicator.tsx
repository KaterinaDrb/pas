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
    <div>
      {steps.map((step) => (
        <div key={step.id}>
          <div
            className={`
					${step.id < currentStep ? 'bg-green' : step.id === currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            {step.id < currentStep ? 'ok' : step.id}
          </div>
          <span
            className={`${step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'} `}
          >
            {step.title}
          </span>

          {step.id < steps.length && (
            <div
              className={`${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

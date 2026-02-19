'use client';
import HeaderMain from '../../../components/HeaderMain';
import { useState } from 'react';
import StepIndicator from '../../../components/StepIndicator';
import Step1 from '../../../components/step/Step1';
import Step2 from '../../../components/step/Step2';
import Step3 from '../../../components/step/Step3';
import Step4 from '../../../components/step/Step4';
import Button from '../../../components/Button';
import { type ModuleGroup } from '../../../payload-types';
import { useAuth } from '@payloadcms/ui';
import { type ProposalForm } from '../../../types/ProposalForm';
import { type Module, ModuleStandard } from '../../../payload-types';

export interface StepData {
  client: string;
  description: string;
  requirements: string[];
}

const initialFormData: ProposalForm = {
  // получаем на шаге 1
  customerId: null,
  customerName: '',
  description: '',
  requirements: [],
  // получаем на шаге 2
  selectedModules: [],
  complexity: 'standard',
  // получаем на шаге 3
  assumptions: '',
  analysisDays: 0,
  developmentDays: 0,
  testingDays: 0,
  deploymentDays: 0,
};

type Step = 1 | 2 | 3 | 4;

export default function CreateProposal({
  moduleGroups,
}: {
  moduleGroups: ModuleGroup[];
}) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<ProposalForm>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.customerId) return alert('Выберите клиента');
      if (!formData.description.trim()) return alert('Введите описание');
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const updateFormData = (field: keyof ProposalForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddModule = (module: Module) => {
    if (!formData.selectedModules.find((m) => m.id === module.id)) {
      updateFormData('selectedModules', [...formData.selectedModules, module]);
    }
  };

  const handleRemoveModule = (moduleId: number) => {
    updateFormData(
      'selectedModules',
      formData.selectedModules.filter((m) => m.id !== moduleId)
    );
  };

  const totalDays = formData.selectedModules.reduce(
    (sum, m) => sum + (m.amount || 0),
    0
  );
  const multiplier =
    formData.complexity === 'high'
      ? 1.2
      : formData.complexity === 'max'
        ? 1.5
        : 1;
  const totalPrice = totalDays * 3000 * multiplier;
  const totalMonths = Math.ceil(totalDays / 22);

  const handleSubmit = async (status: 'DRAFT' | 'READY') => {
    if (!user) return alert('Авторизуйтесь');
    setIsSubmitting(true);
    try {
      await fetch('api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ` Cp from ${new Date().toLocaleString()}`,
          description: JSON.stringify({
            description: formData.description,
            requirements: formData.requirements,
            assumptions: formData.assumptions,
            stages: {
              analysis: formData.analysisDays,
              development: formData.developmentDays,
              testing: formData.testingDays,
              deployment: formData.deploymentDays,
            },
          }),
          customer: formData.customerId,
          price: Math.round(totalPrice),
          modules: formData.selectedModules.map((m) => m.id),
          status,
        }),
      });
    } catch (e) {
      alert();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main>
      <HeaderMain />
      <StepIndicator currentStep={currentStep} />
      <div className="max-w-7xl mx-auto p-6 bg-secondary">
        <div>
          {currentStep === 1 && (
            <Step1
              data={{
                customerId: formData.customerId,
                customerName: formData.customerName,
                description: formData.description,
                requirements: formData.requirements,
              }}
              updateData={updateFormData}
            />
          )}
        </div>
        <div>{currentStep === 2 && <Step2 moduleGroups={moduleGroups} />}</div>

        <div>{currentStep === 3 && <Step3 />}</div>
        <div>{currentStep === 4 && <Step4 />}</div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Назад
          </button>
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              variant="default"
              label={`Далее: ${
                currentStep === 1
                  ? 'Архитектура решения'
                  : currentStep === 2
                    ? 'Детализация'
                    : 'Смета и итоги'
              }`}
            />
          ) : (
            <Button label="Отправить на согласование" variant="default" />
          )}
        </div>
      </div>
    </main>
  );
}

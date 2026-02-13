'use client';
import HeaderMain from '../../../components/HeaderMain';
import { use, useState } from 'react';
import StepIndicator from '../../../components/StepIndicator';
import Step1 from '../../../components/step/Step1';
import Step2 from '../../../components/step/Step2';
import Step3 from '../../../components/step/Step3';
import Step4 from '../../../components/step/Step4';

export interface StepData {
  client: string;
  description: string;
  requirements: string[];
}

type Step = 1 | 2 | 3 | 4;

export default function CreateProposal() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<StepData>({
    client: '',
    description: '',
    requirements: [],
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const updateFormData = (field: keyof StepData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  <StepIndicator currentStep={currentStep} />;

  <div className="mt-8">
    {currentStep === 1 && <Step1 data={formData} updateData={updateFormData} />}
  </div>;

  return (
    <main>
      <HeaderMain />
    </main>
  );
}

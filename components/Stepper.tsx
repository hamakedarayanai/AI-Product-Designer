import React from 'react';
import { AppStep } from '../types';
import { CheckCircleIcon } from './icons';

interface StepperProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.BRIEF, title: 'Brief' },
  { id: AppStep.CONCEPTS, title: 'Design' },
  { id: AppStep.MARKETING, title: 'Market' },
];

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
            {step.id < currentStep ? (
              // Completed Step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-brand-blue" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue"
                >
                  <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="absolute -bottom-6 text-sm font-medium text-light-text">{step.title}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              // Current Step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-dark-border" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-blue bg-dark-card"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" />
                   <span className="absolute -bottom-6 text-sm font-medium text-brand-blue">{step.title}</span>
                </div>
              </>
            ) : (
              // Upcoming Step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-dark-border" />
                </div>
                <div
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-dark-border bg-dark-card"
                >
                   <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                   <span className="absolute -bottom-6 text-sm font-medium text-medium-text">{step.title}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
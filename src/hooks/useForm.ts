import { useState } from 'react';

export interface FormData {
  fullName: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  country: string;
  amount: string;
  purpose: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type FormStep = 1 | 2 | 3;

const initialFormData: FormData = {
  fullName: '',
  phone: '',
  email: '',
  age: '',
  gender: '',
  country: '',
  amount: '',
  purpose: '',
};

export function useForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digits and check if it's a reasonable phone number
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 9 && cleaned.length <= 15;
  };

  const validateStep1 = (): FormErrors => {
    const stepErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      stepErrors.fullName = 'required';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      stepErrors.fullName = 'minLength';
    }

    if (!formData.phone.trim()) {
      stepErrors.phone = 'required';
    } else if (!validatePhone(formData.phone)) {
      stepErrors.phone = 'phoneFormat';
    }

    if (!formData.email.trim()) {
      stepErrors.email = 'required';
    } else if (!validateEmail(formData.email)) {
      stepErrors.email = 'invalidEmail';
    }

    if (!formData.age.trim()) {
      stepErrors.age = 'required';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 18 || age > 75) {
        stepErrors.age = 'ageRange';
      }
    }

    if (!formData.gender) {
      stepErrors.gender = 'required';
    }

    if (!formData.country) {
      stepErrors.country = 'required';
    }

    return stepErrors;
  };

  const validateStep2 = (): FormErrors => {
    const stepErrors: FormErrors = {};

    if (!formData.amount.trim()) {
      stepErrors.amount = 'required';
    } else {
      const amount = parseFloat(formData.amount.replace(/,/g, ''));
      if (isNaN(amount) || amount < 50 || amount > 100000) {
        stepErrors.amount = 'amountRange';
      }
    }

    if (!formData.purpose.trim()) {
      stepErrors.purpose = 'required';
    } else if (formData.purpose.trim().length < 10) {
      stepErrors.purpose = 'minLength';
    }

    return stepErrors;
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: FormErrors = {};

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1();
        break;
      case 2:
        stepErrors = validateStep2();
        break;
      case 3:
        if (!isConsentGiven) {
          stepErrors.consent = 'required';
        }
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = (): boolean => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3) as FormStep);
      return true;
    }
    return false;
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1) as FormStep);
  };

  const formatAmount = (amount: string): string => {
    const cleaned = amount.replace(/,/g, '');
    const number = parseFloat(cleaned);
    if (isNaN(number)) return amount;
    return number.toLocaleString();
  };

  const generateWhatsAppMessage = (): string => {
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanAmount = formData.amount.replace(/,/g, '');
    
    return `Hello! I've submitted an application through African Dev't Funds.

Full Name: ${formData.fullName}
Country: ${formData.country}
Phone: ${cleanPhone}
Email: ${formData.email}
Amount Needed: $${cleanAmount}
Purpose: ${formData.purpose}

I understand these are donations/free funds, not loans. Please assist me with my application.`;
  };

  const reset = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
    setIsConsentGiven(false);
  };

  return {
    formData,
    errors,
    currentStep,
    isConsentGiven,
    updateField,
    setCurrentStep,
    setIsConsentGiven,
    validateCurrentStep,
    nextStep,
    prevStep,
    formatAmount,
    generateWhatsAppMessage,
    reset,
  };
}
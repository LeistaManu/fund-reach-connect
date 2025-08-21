import { useState } from 'react';

export type Language = 'en' | 'sw';

export interface Translations {
  // Navigation
  home: string;
  profile: string;
  help: string;
  rateUs: string;
  aboutUs: string;
  invitePeople: string;

  // Main content
  appName: string;
  tagline: string;
  mission: string;
  notLoans: string;
  applyNow: string;
  whatsapp: string;
  createAccount: string;
  login: string;
  submit: string;
  redirecting: string;
  next: string;
  back: string;
  close: string;

  // Form fields
  fullName: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  country: string;
  amount: string;
  purpose: string;
  
  // Gender options
  female: string;
  male: string;
  preferNotToSay: string;

  // Countries
  kenya: string;
  tanzania: string;
  uganda: string;
  rwanda: string;
  nigeria: string;
  ghana: string;
  southAfrica: string;
  other: string;

  // Validation messages
  required: string;
  invalidEmail: string;
  phoneFormat: string;
  ageRange: string;
  amountRange: string;
  minLength: string;

  // Steps
  personalInfo: string;
  fundingDetails: string;
  reviewConsent: string;

  // Review
  confirmAccuracy: string;
  consentText: string;
  
  // Success
  thankYou: string;
  applicationSubmitted: string;

  // Testimonials
  testimonial1Name: string;
  testimonial1Text: string;
  testimonial2Name: string;
  testimonial2Text: string;
  testimonial3Name: string;
  testimonial3Text: string;

  // Languages
  english: string;
  swahili: string;

  // Invite
  inviteText: string;
  copied: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    help: 'Help',
    rateUs: 'Rate Us',
    aboutUs: 'About Us',
    invitePeople: 'Invite People',

    // Main content
    appName: 'AFRICAN DEV\'T FUNDS',
    tagline: 'Apply now, Receive Funds now',
    mission: 'We support communities with development grants to spur opportunity and resilience.',
    notLoans: 'These are donations/free funds, not loans.',
    applyNow: 'Apply Now',
    whatsapp: 'WhatsApp',
    createAccount: 'Create Account',
    login: 'Login to Account',
    submit: 'Submit',
    redirecting: 'Redirecting to WhatsApp agent…',
    next: 'Next',
    back: 'Back',
    close: 'Close',

    // Form fields
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    age: 'Age',
    gender: 'Gender',
    country: 'Country',
    amount: 'Amount Needed',
    purpose: 'Purpose',

    // Gender options
    female: 'Female',
    male: 'Male',
    preferNotToSay: 'Prefer not to say',

    // Countries
    kenya: 'Kenya',
    tanzania: 'Tanzania',
    uganda: 'Uganda',
    rwanda: 'Rwanda',
    nigeria: 'Nigeria',
    ghana: 'Ghana',
    southAfrica: 'South Africa',
    other: 'Other',

    // Validation messages
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    phoneFormat: 'Please enter a valid phone number',
    ageRange: 'Age must be between 18 and 75',
    amountRange: 'Amount must be between 50 and 100,000',
    minLength: 'Please provide more details (minimum 10 characters)',

    // Steps
    personalInfo: 'Personal Information',
    fundingDetails: 'Funding Details',
    reviewConsent: 'Review & Consent',

    // Review
    confirmAccuracy: 'Confirm Details',
    consentText: 'I confirm details are accurate and I understand these are donations/free funds.',

    // Success
    thankYou: 'Thank You!',
    applicationSubmitted: 'Your application has been submitted successfully.',

    // Testimonials
    testimonial1Name: 'Amina, 29, Kenya',
    testimonial1Text: 'Funding helped us start a water kiosk in Kisumu.',
    testimonial2Name: 'Joseph, 41, Tanzania',
    testimonial2Text: 'Support enabled our cooperative to buy tools.',
    testimonial3Name: 'Naledi, 34, South Africa',
    testimonial3Text: 'We grew our community garden.',

    // Languages
    english: 'English',
    swahili: 'Swahili',

    // Invite
    inviteText: 'Join AFRICAN DEV\'T FUNDS and apply for free development grants! No loans, just support for African communities.',
    copied: 'Copied to clipboard!',
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    profile: 'Wasifu',
    help: 'Msaada',
    rateUs: 'Tukadimu',
    aboutUs: 'Kuhusu Sisi',
    invitePeople: 'Alika Watu',

    // Main content
    appName: 'AFRICAN DEV\'T FUNDS',
    tagline: 'Omba sasa, Pokea Fedha sasa',
    mission: 'Tunaunga mkono jamii kwa ruzuku za maendeleo ili kuleta fursa na ustahimilivu.',
    notLoans: 'Hizi ni ruzuku/msaada wa bure, si mikopo.',
    applyNow: 'Omba Sasa',
    whatsapp: 'WhatsApp',
    createAccount: 'Fungua Akaunti',
    login: 'Ingia kwenye Akaunti',
    submit: 'Tuma',
    redirecting: 'Inakuelekeza kwa wakala wa WhatsApp…',
    next: 'Ifuatayo',
    back: 'Rudi',
    close: 'Funga',

    // Form fields
    fullName: 'Jina Kamili',
    phone: 'Nambari ya Simu',
    email: 'Anwani ya Barua Pepe',
    age: 'Umri',
    gender: 'Jinsia',
    country: 'Nchi',
    amount: 'Kiasi Kinachotakikana',
    purpose: 'Kusudi',

    // Gender options
    female: 'Mke',
    male: 'Mume',
    preferNotToSay: 'Sipendi kusema',

    // Countries
    kenya: 'Kenya',
    tanzania: 'Tanzania',
    uganda: 'Uganda',
    rwanda: 'Rwanda',
    nigeria: 'Nigeria',
    ghana: 'Ghana',
    southAfrica: 'Afrika Kusini',
    other: 'Nyingine',

    // Validation messages
    required: 'Sehemu hii inahitajika',
    invalidEmail: 'Tafadhali ingiza anwani sahihi ya barua pepe',
    phoneFormat: 'Tafadhali ingiza nambari sahihi ya simu',
    ageRange: 'Umri lazima uwe kati ya miaka 18 na 75',
    amountRange: 'Kiasi lazima kiwe kati ya 50 na 100,000',
    minLength: 'Tafadhali toa maelezo zaidi (angalau herufi 10)',

    // Steps
    personalInfo: 'Taarifa za Kibinafsi',
    fundingDetails: 'Maelezo ya Fedha',
    reviewConsent: 'Kagua na Idhini',

    // Review
    confirmAccuracy: 'Thibitisha Maelezo',
    consentText: 'Ninathibitisha kwamba maelezo ni sahihi na ninaelewa hizi ni ruzuku/msaada wa bure.',

    // Success
    thankYou: 'Asante!',
    applicationSubmitted: 'Ombi lako limetumwa kwa mafanikio.',

    // Testimonials
    testimonial1Name: 'Amina, 29, Kenya',
    testimonial1Text: 'Fedha zilisaidia tuanze kiosk cha maji Kisumu.',
    testimonial2Name: 'Joseph, 41, Tanzania',
    testimonial2Text: 'Msaada uliwezesha ushirika wetu kununua vifaa.',
    testimonial3Name: 'Naledi, 34, Afrika Kusini',
    testimonial3Text: 'Tulikua bustani yetu ya kijamii.',

    // Languages
    english: 'Kiingereza',
    swahili: 'Kiswahili',

    // Invite
    inviteText: 'Jiunge na AFRICAN DEV\'T FUNDS na uombe ruzuku za maendeleo za bure! Hakuna mikopo, ni msaada tu kwa jamii za Kiafrika.',
    copied: 'Imenakiliwa kwenye clipboard!',
  },
};

export function useI18n() {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof Translations): string => {
    return translations[language][key];
  };

  return {
    language,
    setLanguage,
    t,
  };
}
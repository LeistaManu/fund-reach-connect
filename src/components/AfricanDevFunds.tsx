import React, { useState } from 'react';
import { Menu, User, X, MessageCircle, Globe, Users, Heart, Star, CheckCircle, ArrowRight, ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useI18n, Language } from '@/hooks/useI18n';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/use-toast';

type AppView = 'welcome' | 'account' | 'form' | 'redirect';

const WHATSAPP_NUMBER = "254790777449"; // Placeholder number

const testimonials = [
  { id: 1, key: 'testimonial1' },
  { id: 2, key: 'testimonial2' },  
  { id: 3, key: 'testimonial3' },
];

export default function AfricanDevFunds() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { language, setLanguage, t } = useI18n();
  const form = useForm();
  const { toast } = useToast();

  // Rotate testimonials every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (form.validateCurrentStep() && form.isConsentGiven) {
      setCurrentView('redirect');
      
      // Auto-redirect to WhatsApp after 2.5 seconds
      setTimeout(() => {
        const message = form.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        
        try {
          window.open(whatsappUrl, '_blank');
        } catch (error) {
          toast({
            title: "WhatsApp Link",
            description: "Please click the link below to open WhatsApp",
            action: (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open WhatsApp
              </Button>
            ),
          });
        }
      }, 2500);
    }
  };

  const copyInviteText = () => {
    navigator.clipboard.writeText(t('inviteText'));
    toast({
      title: t('copied'),
      description: t('inviteText'),
    });
  };

  const countries = [
    { value: 'KE', label: t('kenya') },
    { value: 'TZ', label: t('tanzania') },
    { value: 'UG', label: t('uganda') },
    { value: 'RW', label: t('rwanda') },
    { value: 'NG', label: t('nigeria') },
    { value: 'GH', label: t('ghana') },
    { value: 'ZA', label: t('southAfrica') },
    { value: 'OTHER', label: t('other') },
  ];

  const genders = [
    { value: 'female', label: t('female') },
    { value: 'male', label: t('male') },
    { value: 'prefer-not-to-say', label: t('preferNotToSay') },
  ];

  const renderHeader = () => (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="hover:bg-surface"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold text-foreground">{t('appName')}</h1>
          </div>
          <p className="text-sm text-muted-foreground">{t('tagline')}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('account')}
          className="hover:bg-surface"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border shadow-strong transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-sidebar-primary" />
              <span className="font-semibold text-sidebar-foreground">Menu</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start hover:bg-sidebar-accent">
              <User className="h-4 w-4 mr-3" />
              {t('profile')}
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-sidebar-accent">
              <MessageCircle className="h-4 w-4 mr-3" />
              {t('help')}
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-sidebar-accent">
              <Star className="h-4 w-4 mr-3" />
              {t('rateUs')}
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-sidebar-accent">
              <Heart className="h-4 w-4 mr-3" />
              {t('aboutUs')}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:bg-sidebar-accent"
              onClick={copyInviteText}
            >
              <Users className="h-4 w-4 mr-3" />
              {t('invitePeople')}
            </Button>
            
            <div className="pt-4 border-t border-sidebar-border mt-4">
              <Label className="text-sm text-sidebar-foreground mb-2 block">Language</Label>
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {t('english')}
                    </div>
                  </SelectItem>
                  <SelectItem value="sw">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {t('swahili')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderWelcomeView = () => (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-4xl mx-auto p-4 space-y-8">
        {/* Language Selector */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 text-primary" />
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="sw">{t('swahili')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-full">
                <Heart className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">{t('appName')}</CardTitle>
            <p className="text-accent font-semibold text-lg">{t('tagline')}</p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">{t('mission')}</p>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <p className="text-warning-foreground font-semibold">{t('notLoans')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-center">Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-accent p-6 rounded-lg text-center">
              <div className="text-accent-foreground">
                <p className="font-semibold mb-2">
                  {t(`${testimonials[currentTestimonial].key}Name` as keyof typeof t)}
                </p>
                <p className="italic">
                  "{t(`${testimonials[currentTestimonial].key}Text` as keyof typeof t)}"
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-accent' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => setCurrentView('account')}
            className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold py-6 text-lg shadow-medium"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            {t('applyNow')}
          </Button>
          <Button 
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground py-4"
            onClick={() => {
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {t('whatsapp')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccountView = () => (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-md mx-auto p-4 pt-8">
        <Card className="shadow-strong">
          <CardHeader className="text-center">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <p className="text-warning-foreground font-semibold">{t('notLoans')}</p>
            </div>
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Access your account or create a new one</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setCurrentView('form')}
              className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground py-4"
            >
              <User className="h-5 w-5 mr-2" />
              {t('createAccount')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-4"
              onClick={() => setCurrentView('form')}
            >
              {t('login')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFormStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">{t('fullName')} *</Label>
          <Input
            id="fullName"
            value={form.formData.fullName}
            onChange={(e) => form.updateField('fullName', e.target.value)}
            className={form.errors.fullName ? 'border-destructive' : ''}
            placeholder="John Doe"
          />
          {form.errors.fullName && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.fullName as keyof typeof t)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">{t('phone')} *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.formData.phone}
            onChange={(e) => form.updateField('phone', e.target.value)}
            className={form.errors.phone ? 'border-destructive' : ''}
            placeholder="+254712345678"
          />
          {form.errors.phone && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.phone as keyof typeof t)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">{t('email')} *</Label>
          <Input
            id="email"
            type="email"
            value={form.formData.email}
            onChange={(e) => form.updateField('email', e.target.value)}
            className={form.errors.email ? 'border-destructive' : ''}
            placeholder="john@example.com"
          />
          {form.errors.email && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.email as keyof typeof t)}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">{t('age')} *</Label>
            <Input
              id="age"
              type="number"
              value={form.formData.age}
              onChange={(e) => form.updateField('age', e.target.value)}
              className={form.errors.age ? 'border-destructive' : ''}
              placeholder="25"
              min="18"
              max="75"
            />
            {form.errors.age && (
              <p className="text-destructive text-sm mt-1">{t(form.errors.age as keyof typeof t)}</p>
            )}
          </div>

          <div>
            <Label>{t('gender')} *</Label>
            <Select 
              value={form.formData.gender} 
              onValueChange={(value) => form.updateField('gender', value)}
            >
              <SelectTrigger className={form.errors.gender ? 'border-destructive' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.errors.gender && (
              <p className="text-destructive text-sm mt-1">{t(form.errors.gender as keyof typeof t)}</p>
            )}
          </div>
        </div>

        <div>
          <Label>{t('country')} *</Label>
          <Select 
            value={form.formData.country} 
            onValueChange={(value) => form.updateField('country', value)}
          >
            <SelectTrigger className={form.errors.country ? 'border-destructive' : ''}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.errors.country && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.country as keyof typeof t)}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderFormStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">{t('amount')} ($) *</Label>
          <Input
            id="amount"
            value={form.formData.amount}
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, '');
              if (/^\d*\.?\d*$/.test(value)) {
                form.updateField('amount', value);
              }
            }}
            onBlur={(e) => {
              const formatted = form.formatAmount(e.target.value);
              form.updateField('amount', formatted);
            }}
            className={form.errors.amount ? 'border-destructive' : ''}
            placeholder="5,000"
          />
          <p className="text-muted-foreground text-sm mt-1">Amount between $50 and $100,000</p>
          {form.errors.amount && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.amount as keyof typeof t)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="purpose">{t('purpose')} *</Label>
          <Textarea
            id="purpose"
            value={form.formData.purpose}
            onChange={(e) => form.updateField('purpose', e.target.value)}
            className={form.errors.purpose ? 'border-destructive' : ''}
            placeholder="Describe how you plan to use the funds..."
            rows={4}
          />
          <p className="text-muted-foreground text-sm mt-1">
            {form.formData.purpose.length}/10 minimum characters
          </p>
          {form.errors.purpose && (
            <p className="text-destructive text-sm mt-1">{t(form.errors.purpose as keyof typeof t)}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderFormStep3 = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">{t('confirmAccuracy')}</h3>
        <div className="space-y-2 text-sm">
          <div><strong>Name:</strong> {form.formData.fullName}</div>
          <div><strong>Country:</strong> {countries.find(c => c.value === form.formData.country)?.label}</div>
          <div><strong>Phone:</strong> {form.formData.phone}</div>
          <div><strong>Email:</strong> {form.formData.email}</div>
          <div><strong>Amount:</strong> ${form.formData.amount}</div>
          <div><strong>Purpose:</strong> {form.formData.purpose}</div>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-warning-foreground font-semibold text-center">{t('notLoans')}</p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={form.isConsentGiven}
          onCheckedChange={(checked) => form.setIsConsentGiven(checked === true)}
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          {t('consentText')}
        </Label>
      </div>
    </div>
  );

  const renderFormView = () => {
    const stepTitles = [t('personalInfo'), t('fundingDetails'), t('reviewConsent')];
    
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="container max-w-md mx-auto p-4">
          <Card className="shadow-strong">
            <CardHeader>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {form.currentStep} of 3</span>
                <span>{Math.round((form.currentStep / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(form.currentStep / 3) * 100}%` }}
                />
              </div>
              <CardTitle className="text-center">{stepTitles[form.currentStep - 1]}</CardTitle>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <p className="text-warning-foreground font-medium text-sm text-center">{t('notLoans')}</p>
              </div>
            </CardHeader>
            <CardContent>
              {form.currentStep === 1 && renderFormStep1()}
              {form.currentStep === 2 && renderFormStep2()}
              {form.currentStep === 3 && renderFormStep3()}

              <div className="flex gap-3 pt-6">
                {form.currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={form.prevStep}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('back')}
                  </Button>
                )}
                
                {form.currentStep < 3 ? (
                  <Button 
                    onClick={form.nextStep}
                    className="flex-1 bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    {t('next')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!form.isConsentGiven}
                    className="flex-1 bg-gradient-primary hover:bg-primary-hover text-primary-foreground disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t('submit')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderRedirectView = () => (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
      <div className="container max-w-md mx-auto p-4">
        <Card className="shadow-strong text-center">
          <CardContent className="p-8 space-y-6">
            <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('thankYou')}</h2>
              <p className="text-muted-foreground">{t('applicationSubmitted')}</p>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
                <span className="text-accent font-semibold">{t('redirecting')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You'll be connected with our WhatsApp agent shortly
              </p>
            </div>

            <Button 
              variant="outline"
              className="w-full"
              onClick={() => {
                const message = form.generateWhatsAppMessage();
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Open WhatsApp Manually
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      {renderSidebar()}
      
      {currentView === 'welcome' && renderWelcomeView()}
      {currentView === 'account' && renderAccountView()}
      {currentView === 'form' && renderFormView()}
      {currentView === 'redirect' && renderRedirectView()}
    </div>
  );
}

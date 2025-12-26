import React, { useState, useEffect } from 'react';
import { ArrowDown, Instagram, Palette, Calendar, ShoppingBag, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LiquidFilter } from './components/LiquidFilter';
import { RippleBackground } from './components/RippleBackground';
import { SITE_CONTENT } from './data';
import { FormType } from './types';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formType, setFormType] = useState<FormType>('commission');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { hero, about, journal, contact } = SITE_CONTENT;

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (name === 'email' && emailError) setEmailError('');
    if (submitStatus === 'error') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!formData.name || !formData.message) {
       return;
    }

    setSubmitStatus('submitting');

    // Get label from data config
    const submissionTypeLabel = contact.formConfig.options[formType].label;
    
    // Google Form Details from data
    const SUBMISSION_URL = contact.formConfig.submitUrl;
    const mapping = contact.formConfig.fieldMapping;
    
    const formBody = new FormData();
    formBody.append(mapping.type, submissionTypeLabel);
    formBody.append(mapping.name, formData.name);
    formBody.append(mapping.email, formData.email);
    formBody.append(mapping.message, formData.message);

    try {
      await fetch(SUBMISSION_URL, {
        method: 'POST',
        mode: 'no-cors', // Opaque response
        body: formBody
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      {/* 1. Global Grain Texture - Hoisted outside main content for reliable fixed positioning */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.06] md:opacity-[0.08] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. SVG Filters Definition */}
      <LiquidFilter />

      {/* 3. Main Scrollable Content */}
      <div className="relative min-h-screen bg-[#E6E2D6] text-[#1A1A1A] selection:bg-[#8C4A32] selection:text-[#E6E2D6]">
        
        {/* HERO: CSS Watercolor Atmosphere */}
        {/* Changed md:h-screen to md:h-[100dvh] for better tablet viewport support */}
        <section className="relative h-[90vh] md:h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden border-b border-[#1A1A1A]/10">
          
          {/* Interactive Ripple Canvas */}
          <RippleBackground />

          {/* Dynamic CSS Background Layers */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#E6E2D6]">
            {/* Blob 1: Mud Brown */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8C4A32] opacity-[0.15] blur-[80px] md:blur-[120px] blob-anim-1 mix-blend-multiply"></div>
            
            {/* Blob 2: Moss Green */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#5D6D58] opacity-[0.15] blur-[80px] md:blur-[120px] blob-anim-2 mix-blend-multiply"></div>
            
            {/* Blob 3: River/Atmosphere Blue-Grey */}
            <div className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#A8B5B2] opacity-[0.2] blur-[90px] md:blur-[140px] blob-anim-3 mix-blend-multiply"></div>
            
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#E6E2D6]/80"></div>
          </div>

          <div className="relative z-20 text-center px-4 w-full mt-20 md:mt-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            
            {/* Small Badge */}
            <div className="mb-8 inline-block border border-[#8C4A32]/30 px-5 py-2 rounded-full bg-[#E6E2D6]/40 backdrop-blur-sm shadow-sm pointer-events-auto">
              <span className="font-hindi text-[#8C4A32] text-sm md:text-base tracking-wide font-medium">{hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif-custom text-[#2C2C2C] text-[4.5rem] leading-[0.8] md:text-9xl font-light tracking-tighter mix-blend-darken">
              {hero.titleLine1}<br/>
              <span className="italic font-normal text-[#1A1A1A] relative inline-block">
                {hero.titleLine2}
                {/* Decorative underline brush stroke using CSS */}
                <span className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-[#8C4A32]/20 -rotate-1 rounded-full blur-[1px]"></span>
              </span>
            </h1>

            <p className="font-hand text-[#5C4033] text-2xl md:text-4xl mt-10 rotate-[-2deg] opacity-80">
              {hero.quote}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30 pointer-events-none">
             <ArrowDown className="text-[#8C4A32] w-6 h-6 opacity-70" />
          </div>
        </section>

        {/* IDENTITY: The Actor & The Artist */}
        <section className="relative py-20 px-6 max-w-4xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
              <div className="w-24 h-24 rounded-full bg-[#1A1A1A] text-[#E6E2D6] flex items-center justify-center font-serif-custom text-4xl italic mb-4 shadow-lg">
                {about.avatarText}
              </div>
              <p className="font-hindi text-lg text-[#8C4A32]">{about.hindiName}</p>
              <p className="font-sans-custom text-xs text-[#1A1A1A]/60 mt-2 uppercase tracking-widest text-center md:text-left">
                {about.tags.map((tag, i) => (
                  <React.Fragment key={i}>
                    {tag} {i < about.tags.length - 1 && <br/>}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="font-serif-custom text-4xl md:text-5xl leading-tight mb-6 text-[#1A1A1A]">
                {about.headline.line1} <br/> {about.headline.line2}
              </h2>
              <p className="font-serif-custom text-xl text-[#5C5C5C] leading-relaxed mb-6">
                {about.description.part1} 
                <span className="text-[#8C4A32] italic">{about.description.highlight}</span>
                {about.description.part2}
              </p>
            </div>
          </div>
        </section>

        {/* FIELD NOTES: The Journal */}
        <section className="relative py-24 bg-[#DCD8CC]">
          <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#E6E2D6] to-[#DCD8CC]"></div>
          
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-[#1A1A1A]/10 pb-4">
              <h2 className="font-serif-custom text-4xl md:text-6xl text-[#1A1A1A]">{journal.title}</h2>
              <span className="font-hindi text-xl text-[#1A1A1A]/40 hidden md:block">{journal.subtitle}</span>
            </div>

            <div className="flex flex-col gap-24">
              {journal.entries.map((entry, index) => (
                <div key={entry.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 relative group">
                     <div className="absolute -top-6 left-0 font-hand text-2xl text-[#1A1A1A]/60 z-10">{entry.date}</div>
                     <a 
                       href={contact.info.instagramUrl} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className={`block relative aspect-[4/5] overflow-hidden shadow-xl bg-white p-2 md:p-3 transform transition-transform duration-500 hover:rotate-0 hover:scale-105 ${entry.rotation} cursor-pointer`}
                     >
                       <img src={entry.image} alt={entry.title} className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.05]" />
                       <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                     </a>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                    <div className="inline-block px-3 py-1 border border-[#8C4A32]/30 rounded-full">
                      <span className="font-sans-custom text-[10px] tracking-widest uppercase text-[#8C4A32]">{entry.material}</span>
                    </div>
                    <h3 className="font-serif-custom text-4xl md:text-5xl text-[#1A1A1A] leading-none">{entry.title}</h3>
                    <h4 className="font-hindi text-2xl text-[#1A1A1A]/50">{entry.hindiTitle}</h4>
                    <p className="font-serif-custom text-xl italic text-[#4A4A4A] pl-4 border-l-2 border-[#8C4A32]/30">{entry.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONNECT & COLLECT: The Functional Contact Section */}
        <section className="relative py-24 px-6 bg-[#1A1A1A] text-[#E6E2D6]">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="font-serif-custom text-4xl md:text-6xl mb-4">{contact.title}</h2>
              <p className="font-hindi text-xl text-[#8C4A32]">{contact.subtitle}</p>
            </div>

            <div className="bg-[#E6E2D6] text-[#1A1A1A] p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
              {/* Paper texture overlay for the form card */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                <button 
                  type="button"
                  onClick={() => setFormType('commission')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-300 ${formType === 'commission' ? 'border-[#8C4A32] bg-[#8C4A32]/5' : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'}`}
                >
                  <ShoppingBag className={`w-6 h-6 ${formType === 'commission' ? 'text-[#8C4A32]' : 'text-[#1A1A1A]/60'}`} />
                  <span className="font-sans-custom text-xs uppercase tracking-widest font-semibold">{contact.formConfig.options.commission.label}</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setFormType('workshop')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-300 ${formType === 'workshop' ? 'border-[#8C4A32] bg-[#8C4A32]/5' : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'}`}
                >
                  <Palette className={`w-6 h-6 ${formType === 'workshop' ? 'text-[#8C4A32]' : 'text-[#1A1A1A]/60'}`} />
                  <span className="font-sans-custom text-xs uppercase tracking-widest font-semibold">{contact.formConfig.options.workshop.label}</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setFormType('exhibition')}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-300 ${formType === 'exhibition' ? 'border-[#8C4A32] bg-[#8C4A32]/5' : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'}`}
                >
                  <Calendar className={`w-6 h-6 ${formType === 'exhibition' ? 'text-[#8C4A32]' : 'text-[#1A1A1A]/60'}`} />
                  <span className="font-sans-custom text-xs uppercase tracking-widest font-semibold">{contact.formConfig.options.exhibition.label}</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block font-sans-custom text-xs uppercase tracking-widest text-[#1A1A1A]/50 mb-2 group-focus-within:text-[#8C4A32]">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2 focus:outline-none focus:border-[#8C4A32] transition-colors font-serif-custom text-xl" 
                    />
                  </div>
                  <div className="group relative">
                    <label className="block font-sans-custom text-xs uppercase tracking-widest text-[#1A1A1A]/50 mb-2 group-focus-within:text-[#8C4A32]">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent border-b py-2 focus:outline-none transition-colors font-serif-custom text-xl ${emailError ? 'border-red-500 text-red-700' : 'border-[#1A1A1A]/20 focus:border-[#8C4A32]'}`} 
                    />
                    {emailError && (
                      <span className="absolute -bottom-6 left-0 text-xs text-red-500 font-sans-custom flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {emailError}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="group">
                  <label className="block font-sans-custom text-xs uppercase tracking-widest text-[#1A1A1A]/50 mb-2 group-focus-within:text-[#8C4A32]">
                    {contact.formConfig.options[formType].placeholder}
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows={3} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2 focus:outline-none focus:border-[#8C4A32] transition-colors font-serif-custom text-xl resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end items-center gap-4">
                  {submitStatus === 'error' && (
                    <span className="text-red-500 font-sans-custom text-xs tracking-widest">Submission failed. Please try again.</span>
                  )}
                  {submitStatus === 'success' && (
                    <span className="text-[#5D6D58] font-sans-custom text-xs tracking-widest flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Message Sent Successfully
                    </span>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className={`px-8 py-3 bg-[#1A1A1A] text-[#E6E2D6] font-sans-custom text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                      submitStatus === 'submitting' || submitStatus === 'success' ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#8C4A32]'
                    }`}
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      'Sent'
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 opacity-60">
               <div className="text-center">
                 <p className="font-sans-custom text-xs uppercase tracking-widest mb-2">Location</p>
                 <p className="font-serif-custom text-lg">{contact.info.location}</p>
               </div>
               
               <div className="hidden md:block w-px h-12 bg-[#E6E2D6]/30"></div>
               
               <div className="text-center">
                 <p className="font-sans-custom text-xs uppercase tracking-widest mb-2">Email</p>
                 <a href={`mailto:${contact.info.email}`} className="font-serif-custom text-lg hover:text-[#8C4A32] transition-colors">
                   {contact.info.email}
                 </a>
               </div>

               <div className="hidden md:block w-px h-12 bg-[#E6E2D6]/30"></div>

               <div className="text-center">
                  <p className="font-sans-custom text-xs uppercase tracking-widest mb-2">Social</p>
                  <a href={contact.info.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-serif-custom text-lg hover:text-[#8C4A32] transition-colors flex items-center justify-center gap-2">
                     {contact.info.instagramHandle}
                  </a>
               </div>
            </div>

            {/* Credits Section */}
            <div className="mt-16 pt-8 border-t border-[#E6E2D6]/10 text-center">
              <p className="font-sans-custom text-[10px] uppercase tracking-widest text-[#E6E2D6]/30 hover:text-[#E6E2D6]/60 transition-colors">
                {contact.credits.text}{' '}
                <a href={contact.credits.studioUrl} target="_blank" rel="noopener noreferrer" className="border-b border-[#E6E2D6]/20 pb-0.5 hover:text-[#8C4A32] hover:border-[#8C4A32] transition-all">
                  {contact.credits.studioName}
                </a>{' '}
                with ❤️
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. STICKY INSTAGRAM DM BUTTON - Hoisted outside main content for reliable fixed positioning */}
      <a 
        href={contact.info.instagramDmUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] group no-underline"
      >
        <div className="bg-[#1A1A1A] text-[#E6E2D6] hover:bg-[#8C4A32] px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 flex items-center gap-3 border border-[#E6E2D6]/10">
           <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
           <span className="font-hand text-xl font-bold tracking-wide pt-1">{contact.info.dmButtonText}</span>
           <Send className="w-3 h-3 opacity-50 -ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </a>
    </>
  );
};

export default App;
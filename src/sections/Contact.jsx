import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  Terminal
} from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { personalInfo } from '../data/portfolio';
import SectionHeader from '../components/ui/SectionHeader';
import ChapterTransition from '../components/layout/ChapterTransition';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Identity required';
    if (!formData.email.trim()) {
      errs.email = 'Transmission address required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid address format';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject designation required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Transmission payload must be at least 10 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');

    setTimeout(async () => {
      setStatus('success');
      try {
        const { default: confetti } = await import('canvas-confetti');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#C1121F', '#780000', '#F5F5F5']
        });
      } catch {
        // Confetti is purely decorative
      }
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hello Abhishek,\n\n${formData.message || 'I would like to connect regarding...'}\n\nFrom: ${
        formData.name || 'Anonymous'
      }`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Chapter Transition Laser & Ambient Lighting */}
      <ChapterTransition />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chapter="007"
          category="SECURE TRANSMISSION"
          title="LET'S BUILD SOMETHING EXTRAORDINARY"
          subtitle="Direct transmission channel for engineering inquiries, protocol collaborations, and systems research."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Column: Direct Frequencies & Social Links */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 border border-[#292929] bg-[#141414]">
              <span className="font-mono text-[10px] text-[#C1121F] tracking-widest uppercase block mb-2">
                DIRECT FREQUENCY
              </span>
              <h3 className="font-title text-xl font-bold uppercase tracking-wider text-[#F5F5F5] mb-3">
                DIRECT COMMUNICATION
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#888888] leading-relaxed mb-6">
                Open for technical discussions, Model Context Protocol (MCP) tooling, open-source architectures, or engineering internships.
              </p>

              {/* Email Box with Copy Action */}
              <div className="p-4 border border-[#292929] bg-[#0f0f11] flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 border border-[#292929] bg-[#171717] text-[#C1121F] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block font-mono text-[9px] uppercase text-[#666666] tracking-widest">
                      ELECTRONIC MAIL
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-xs font-semibold text-[#F5F5F5] hover:text-[#C1121F] truncate block interactive-target"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="p-2 border border-[#292929] bg-[#171717] hover:border-[#C1121F] text-[#A1A1A1] hover:text-[#C1121F] transition-colors shrink-0 interactive-target"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#C1121F]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels in Neo-Noir Style */}
              <div className="space-y-2">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[#292929] bg-[#0f0f11] hover:border-[#C1121F] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors group interactive-target"
                >
                  <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider">
                    <Github className="w-4 h-4 text-[#C1121F]" />
                    GITHUB REGISTRY
                  </span>
                  <span className="font-mono text-[11px] text-[#888888] group-hover:text-[#C1121F]">
                    @abhishekbruno ↗
                  </span>
                </a>

                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[#292929] bg-[#0f0f11] hover:border-[#C1121F] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors group interactive-target"
                >
                  <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider">
                    <Linkedin className="w-4 h-4 text-[#C1121F]" />
                    LINKEDIN NETWORK
                  </span>
                  <span className="font-mono text-[11px] text-[#888888] group-hover:text-[#C1121F]">
                    CONNECT ↗
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sharp Rectangular Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 border border-[#292929] bg-[#141414] relative">
              {/* Top Accent Stripe Animating Horizontally */}
              <motion.div
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-[#C1121F] shadow-[0_0_8px_#C1121F]"
              />

              <h3 className="font-title text-xl font-bold uppercase tracking-wider text-[#F5F5F5] mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#C1121F]" />
                TRANSMIT MESSAGE
              </h3>

              {status === 'success' && (
                <div className="mb-6 p-4 border border-[#C1121F] bg-[#C1121F]/10 text-[#F5F5F5] font-mono text-xs uppercase tracking-wider animate-fade-in">
                  <div className="font-bold text-[#C1121F] mb-1">
                    TRANSMISSION PREPARED &amp; LOGGED
                  </div>
                  <p className="text-[#A1A1A1]">
                    Message verified. Click below to launch your default email client with pre-filled content.
                  </p>
                  <button
                    onClick={handleMailtoFallback}
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C1121F] text-white font-bold"
                  >
                    LAUNCH SYSTEM MAIL CLIENT ↗
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5"
                    >
                      SENDER IDENTITY
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="NAME / AFFILIATION"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 font-mono text-xs uppercase bg-[#0f0f11] border ${
                        errors.name ? 'border-[#C1121F]' : 'border-[#292929] focus:border-[#C1121F]'
                      } text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none`}
                    />
                    {errors.name && (
                      <span className="block mt-1 font-mono text-[10px] text-[#C1121F] uppercase">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5"
                    >
                      RETURN FREQUENCY / EMAIL
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="SENDER@DOMAIN.COM"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 font-mono text-xs uppercase bg-[#0f0f11] border ${
                        errors.email ? 'border-[#C1121F]' : 'border-[#292929] focus:border-[#C1121F]'
                      } text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none`}
                    />
                    {errors.email && (
                      <span className="block mt-1 font-mono text-[10px] text-[#C1121F] uppercase">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5"
                  >
                    TRANSMISSION DESIGNATION / SUBJECT
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="COLLABORATION / INTERNSHIP / PROTOCOL INQUIRY"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 font-mono text-xs uppercase bg-[#0f0f11] border ${
                      errors.subject ? 'border-[#C1121F]' : 'border-[#292929] focus:border-[#C1121F]'
                    } text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none`}
                  />
                  {errors.subject && (
                    <span className="block mt-1 font-mono text-[10px] text-[#C1121F] uppercase">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5"
                  >
                    TRANSMISSION PAYLOAD / MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="ENTER SPECIFICATION..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 font-mono text-xs uppercase bg-[#0f0f11] border ${
                      errors.message ? 'border-[#C1121F]' : 'border-[#292929] focus:border-[#C1121F]'
                    } text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none resize-y`}
                  />
                  {errors.message && (
                    <span className="block mt-1 font-mono text-[10px] text-[#C1121F] uppercase">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Actions Row */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-noir-primary interactive-target"
                  >
                    {status === 'submitting' ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleMailtoFallback}
                    type="button"
                    className="font-mono text-xs text-[#888888] hover:text-[#C1121F] transition-colors uppercase tracking-widest interactive-target text-center"
                  >
                    LAUNCH MAIL CLIENT DIRECTLY →
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

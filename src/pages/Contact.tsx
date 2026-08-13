import { useState } from 'react';
import { Mail, MapPin, Instagram, Linkedin, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ScrollReveal from '../components/ScrollReveal';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');

    const { error } = await supabase.from('contact_submissions').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-apple-bg pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        {/* Header */}
        <ScrollReveal>
          <p className="text-apple-secondary text-sm font-medium mb-4">Contact</p>
          <h1
            className="font-bold text-apple-text tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.035em' }}
          >
            Let's Create Together
          </h1>
          <p className="text-apple-secondary text-base max-w-md leading-relaxed mb-12">
            Have a project in mind? Whether it's an animated story, brand campaign, or cinematic reel — let's talk.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={100}>
              {status === 'success' ? (
                <div className="surface-card p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-apple-accent/10 mx-auto flex items-center justify-center mb-4">
                    <CheckCheck size={20} className="text-apple-accent" />
                  </div>
                  <p className="font-semibold text-apple-text text-lg mb-2">Message Received</p>
                  <p className="text-apple-secondary text-sm mb-6">
                    Thank you for reaching out. I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-apple-accent text-sm font-medium hover:underline transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="surface-card p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-apple-secondary text-sm font-medium mb-2">
                          Name <span className="text-apple-accent">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full bg-apple-bg border border-apple-border rounded-16 text-apple-text text-sm px-4 py-3 placeholder:text-apple-secondary/50 focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-apple-secondary text-sm font-medium mb-2">
                          Email <span className="text-apple-accent">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full bg-apple-bg border border-apple-border rounded-16 text-apple-text text-sm px-4 py-3 placeholder:text-apple-secondary/50 focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-apple-secondary text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full bg-apple-bg border border-apple-border rounded-16 text-apple-text text-sm px-4 py-3 focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 focus:outline-none transition-all duration-200 appearance-none"
                      >
                        <option value="">Select a project type</option>
                        <option value="Kids Story Animation">Kids Story Animation</option>
                        <option value="Cinematic / GenAI Reel">Cinematic / GenAI Reel</option>
                        <option value="Brand Campaign">Brand Campaign</option>
                        <option value="Character Design">Character Design</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-apple-secondary text-sm font-medium mb-2">
                        Message <span className="text-apple-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project..."
                        className="w-full bg-apple-bg border border-apple-border rounded-16 text-apple-text text-sm px-4 py-3 placeholder:text-apple-secondary/50 focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20 focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-apple-error text-sm">
                        Something went wrong. Please try again or email directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3.5 rounded-full bg-apple-accent text-white text-sm font-medium hover:bg-brand-gold-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <ScrollReveal delay={200}>
              {/* Direct contact */}
              <div className="surface-card p-6 space-y-4">
                <p className="text-apple-secondary text-sm font-medium mb-2">Direct Contact</p>
                <a
                  href="mailto:joshibhavaniprasad@gmail.com"
                  className="flex items-center gap-3 text-apple-secondary text-sm hover:text-apple-accent transition-colors"
                >
                  <Mail size={14} className="text-apple-accent flex-shrink-0" />
                  joshibhavaniprasad@gmail.com
                </a>
                <div className="flex items-center gap-3 text-apple-secondary text-sm">
                  <MapPin size={14} className="text-apple-accent flex-shrink-0" />
                  Columbia, MO
                </div>
              </div>

              {/* QR Code */}
              <div className="surface-card p-6 text-center">
                <p className="text-apple-secondary text-sm font-medium mb-4">Scan to Follow</p>
                <div className="inline-flex p-4 bg-apple-bg rounded-16 mb-4">
                  <img
                    src="/thejoshidesigns_qr.png"
                    alt="Instagram QR Code — THEJOSHIDESIGNS"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <a
                  href="https://www.instagram.com/thejoshidesigns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-apple-accent text-base mb-0.5 hover:underline block"
                >@thejoshidesigns</a>
                <p className="text-apple-secondary text-sm mb-5">
                  Instagram · 26K Primary · 41K Combined
                </p>
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-apple-bg border border-apple-border text-apple-secondary text-sm font-medium hover:text-apple-text hover:border-apple-text transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <CheckCheck size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Portfolio Link
                    </>
                  )}
                </button>
              </div>

              {/* Social links */}
              <div className="surface-card p-6">
                <p className="text-apple-secondary text-sm font-medium mb-4">Social</p>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/thejoshidesigns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-apple-secondary text-sm hover:text-apple-accent transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram size={14} className="text-apple-accent" />
                      @thejoshidesigns
                    </span>
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-apple-secondary text-sm hover:text-apple-accent transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin size={14} className="text-apple-accent" />
                      LinkedIn
                    </span>
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="https://www.behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-apple-secondary text-sm hover:text-apple-accent transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink size={14} className="text-apple-accent" />
                      Behance
                    </span>
                    <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

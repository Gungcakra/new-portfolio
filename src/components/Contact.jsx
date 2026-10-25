import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, Mail, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profile } from '../data/content';
import Reveal, { SplitReveal, ease } from './ui/Reveal';
import RotatingBadge from './ui/RotatingBadge';
import Sparkle from './ui/Sparkle';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { from_email: '', subject: '', message: '' };

export default function Contact() {
  const formRef = useRef(null);
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!fields.from_email.trim()) e.from_email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.from_email)) e.from_email = 'Enter a valid email address.';
    if (!fields.subject.trim()) e.subject = 'Subject is required.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setFields(INITIAL);
    } catch {
      setStatus('error');
    }
  }

  const contacts = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    ...profile.socials.map((s) => ({ icon: s.icon, label: s.handle, href: s.href })),
  ];

  return (
    <section id="contact" className="grain relative overflow-hidden bg-gradient-to-br from-crimson-deep via-[#2a0a10] to-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-crimson/25 blur-3xl" />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow flex items-center gap-2 text-rose">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-crimson" />
            </span>
            Contact
          </p>
          <h2 className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] uppercase text-cream">
            <SplitReveal text="Let's create" />
            <br />
            <SplitReveal text="something" delay={0.1} />
          </h2>
          <p className="-mt-2 font-script text-[clamp(4rem,10vw,8rem)] leading-none text-rose">
            <SplitReveal text="Unforgettable" delay={0.25} />
          </p>

          <ul className="mt-10 max-w-md divide-y divide-line border-y border-line">
            {contacts.map(({ icon: Icon, label, href }, i) => {
              const Tag = href ? 'a' : 'div';
              return (
                <Reveal as="li" key={label} y={16} delay={i * 0.06}>
                  <Tag
                    {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 py-4 text-sm text-cream/85 transition hover:text-cream"
                  >
                    <span className="grid size-10 place-items-center rounded-full border border-crimson/60 text-crimson transition group-hover:bg-crimson group-hover:text-cream">
                      <Icon size={16} />
                    </span>
                    {label}
                    {href && <ArrowUpRight size={16} className="ml-auto opacity-0 transition group-hover:opacity-100" />}
                  </Tag>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal className="relative">
          <div className="absolute -top-16 right-0 hidden text-rose sm:block">
            <RotatingBadge href="#contact-form" />
          </div>
          <form id="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 border border-line bg-ink/60 p-6 backdrop-blur sm:mt-16 sm:p-10">
            <p className="mb-8 flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-cream">
              Get in touch <Sparkle size={12} className="text-crimson" />
            </p>
            <Field label="Your Email" name="from_email" type="email" value={fields.from_email} error={errors.from_email} onChange={handleChange} placeholder="you@company.com" />
            <Field label="Subject" name="subject" value={fields.subject} error={errors.subject} onChange={handleChange} placeholder="What's this about?" />
            <Field label="Message" name="message" textarea value={fields.message} error={errors.message} onChange={handleChange} placeholder="Write your message here…" />

            <button
              type="submit"
              disabled={status === 'sending'}
              data-cursor="Send"
              className="group mt-4 flex w-full items-center justify-between bg-crimson px-6 py-4 text-xs font-bold tracking-[0.22em] uppercase text-cream transition hover:bg-[#b51a30] disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send me a message'}
              {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} className="transition group-hover:rotate-45" />}
            </button>

            <AnimatePresence>
              {(status === 'success' || status === 'error') && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease }}
                  className={`mt-4 flex items-center gap-2 text-sm ${status === 'success' ? 'text-emerald-400' : 'text-rose'}`}
                  role="status"
                >
                  {status === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {status === 'success' ? "Message sent! Thanks for reaching out. I'll get back to you as soon as possible." : 'Something went wrong. Please try again.'}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', textarea, value, error, onChange, placeholder }) {
  const Input = textarea ? 'textarea' : 'input';
  return (
    <label className="mb-6 block">
      <span className="eyebrow">{label}</span>
      <Input
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`mt-2 block w-full resize-none border-b bg-transparent py-3 text-cream placeholder:text-cream/25 focus:outline-none ${error ? 'border-crimson' : 'border-line focus:border-rose'} transition-colors`}
      />
      {error && <span className="mt-1.5 block text-xs text-rose">{error}</span>}
    </label>
  );
}

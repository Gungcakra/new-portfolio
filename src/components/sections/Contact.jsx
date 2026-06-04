import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../ui/SectionTitle';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { from_email: '', subject: '', message: '' };

export default function Contact() {
  const formRef = useRef(null);
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!fields.from_email.trim()) e.from_email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.from_email))
      e.from_email = 'Enter a valid email address.';
    if (!fields.subject.trim()) e.subject = 'Subject is required.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setFields(INITIAL);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionTitle>Contact</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          {status === 'success' ? (
            <SuccessBanner onReset={() => setStatus('idle')} />
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Field
                label="Your Email"
                name="from_email"
                type="email"
                placeholder="you@example.com"
                value={fields.from_email}
                error={errors.from_email}
                onChange={handleChange}
              />
              <Field
                label="Subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={fields.subject}
                error={errors.subject}
                onChange={handleChange}
              />
              <Field
                label="Message"
                name="message"
                type="textarea"
                placeholder="Write your message here…"
                value={fields.message}
                error={errors.message}
                onChange={handleChange}
                rows={5}
              />

              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <XCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-end flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {status === 'sending' ? (
                  <><Loader2 size={15} className="animate-spin" /> Sending…</>
                ) : (
                  <><Send size={15} /> Send Message</>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder, value, error, onChange, rows }) {
  const base =
    'w-full rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors focus:ring-2 focus:ring-primary-500/40';
  const borderClass = error
    ? 'border-red-400 dark:border-red-500'
    : 'border-slate-200 dark:border-slate-700 focus:border-primary-400 dark:focus:border-primary-500';

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} ${borderClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} ${borderClass}`}
        />
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

function SuccessBanner({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-14 text-center"
    >
      <CheckCircle size={48} className="text-emerald-500" />
      <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
        Message sent!
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Thanks for reaching out. I'll get back to you as soon as possible.
      </p>
      <button
        onClick={onReset}
        className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        Send another message
      </button>
    </motion.div>
  );
}

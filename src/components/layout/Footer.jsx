import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/gungcakra', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/cakra-jaya-323722338', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/caakrraaa', label: 'Instagram' },
  { icon: MdEmail, href: 'mailto:agungcakra888@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Cakra Jaya. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

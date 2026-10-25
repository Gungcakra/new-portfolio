import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

// All copy here mirrors the original cakra-portfolio data — don't add claims that aren't there.

const img = import.meta.glob('../assets/projects/*.webp', { eager: true, import: 'default' });
const shot = (name) => img[`../assets/projects/${name}.webp`];

export const profile = {
  firstName: 'Cakra',
  lastName: 'Jaya',
  role: 'Developer & Student',
  email: 'agungcakra888@gmail.com',
  intro:
    'Passionate about building clean, user-focused web applications. Currently developing full-stack solutions while pursuing my degree.',
  about: [
    "Hi! I'm Cakra Jaya, a Web Developer and Information Systems student at ITB Stikom Bali. I focus on creating functional web applications and intuitive digital experiences, combining my technical studies with a passion for building efficient solutions in the ever-evolving tech landscape.",
    "I love learning new technologies and strive to write clean, efficient, and maintainable code. I'm committed to developing solutions that make a real impact for users while continuously exploring the latest advancements in web development.",
  ],
  socials: [
    { icon: FaGithub, label: 'GitHub', handle: '@gungcakra', href: 'https://github.com/gungcakra' },
    { icon: FaLinkedinIn, label: 'LinkedIn', handle: 'cakra-jaya', href: 'https://linkedin.com/in/cakra-jaya-323722338' },
    { icon: FaInstagram, label: 'Instagram', handle: '@caakrraaa', href: 'https://instagram.com/caakrraaa' },
  ],
};

export const education = [
  { title: 'Information Systems', place: 'ITB Stikom Bali' },
];

const icon = (id) => `https://skillicons.dev/icons?i=${id}`;
export const stack = [
  { name: 'PHP', src: icon('php') },
  { name: 'Laravel', src: icon('laravel') },
  { name: 'Alpine.js', src: 'https://icon.icepanel.io/Technology/svg/Alpine.js.svg' },
  { name: 'Livewire', src: 'https://icon.icepanel.io/Technology/svg/Livewire.svg' },
  { name: 'MySQL', src: icon('mysql') },
  { name: 'Bootstrap', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Tailwind', src: icon('tailwind') },
  { name: 'JavaScript', src: icon('js') },
  { name: 'Astro', src: icon('astro') },
  { name: 'React', src: icon('react') },
  { name: 'Expo', src: 'https://cdn.brandfetch.io/idzGRYC3u5/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B' },
  { name: 'Express', src: icon('express') },
  { name: 'Node.js', src: icon('nodejs') },
  { name: 'Vite', src: icon('vite') },
  { name: 'Java', src: icon('java') },
  { name: 'Android Studio', src: icon('androidstudio') },
  { name: 'Vercel', src: icon('vercel') },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Postman', src: icon('postman') },
];

// Newest first
export const experience = [
  {
    role: 'Web Developer',
    company: 'Gretiva Artha Group',
    period: 'May 2025 - Present',
    type: 'Part-time',
    description: 'Developing full-stack web applications using modern technologies and best practices.',
  },
  {
    role: 'Web Developer',
    company: 'TempatKita Software',
    period: 'May 2024 - September 2025',
    type: 'Part-time',
    description: 'Developing a web-based system using PHP and MySQL, along with the user interface designed with Bootstrap.',
  },
  {
    role: 'Backend Developer',
    company: 'PT. Hooki Global Kreasi',
    period: 'Sep 2023 - Des 2023',
    type: 'Intern',
    description: 'Building a web-based system using Laravel and MySQL, including backend development, routing setup, and database integration.',
  },
  {
    role: 'Beginner Cloud Engineer',
    company: 'PT. Bamboomedia Cipta Persada',
    period: 'May 2023',
    type: 'Intern',
    description: 'Operating AWS as a reliable server solution for efficiently storing and managing cloud-based data, ensuring scalability and security',
  },
  {
    role: 'Android Developer',
    company: 'Blue Lake Indonesia',
    period: 'Mar 2023 - May 2023',
    type: 'Intern',
    description: 'Build an Android-based application using Android Studio with Java and Firebase as the database',
  },
];

const client = (p) => ({ ...p, kind: 'Client Project' });
const personal = (p) => ({ ...p, kind: 'Personal Project' });

// Featured order first (top 5 render as the bento grid), then the rest.
export const projects = [
  client({
    title: 'Telerehab',
    description:
      'A platform that connects doctors, therapists, and patients to support remote recovery. Provides patient assessments, rehabilitation goals, therapy video guides, exercise tracking, medicine recommendations, digital approvals, and home exercise video uploads for professional review.',
    image: shot('telerehab'),
    techStack: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js'],
    liveUrl: 'https://telerehab.gretiva.com',
  }),
  client({
    title: 'Pathumthai Occupational Rehabilitation System',
    description:
      "Pathumthani Occupational Rehabilitation System is a web-based rehabilitation management system developed for the Occupational Therapy department of Pathumthani Hospital, designed to digitize and streamline the full patient rehabilitation journey — from patient registration and clinical assessment through treatment planning, daily session management, and progress tracking. The system enables structured documentation of Barthel Index scores across sessions, SOAP note recording, and progression reporting, replacing the department's previous paper-based workflow with a centralized digital platform that gives clinicians instant access to complete patient track records at every stage of care.",
    image: shot('pathumthani'),
    techStack: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js'],
  }),
  client({
    title: 'Kamikaze Tattoo',
    description:
      'A website for a tattoo studio in Kuta, Bali, that offers many tattoo styles, from detailed black and gray to bright colors and traditional Bali designs.',
    image: shot('kamikaze'),
    techStack: ['Laravel', 'MySQL', 'Bootstrap'],
  }),
  client({
    title: 'BTKV E-Logbook',
    description:
      'An e-logbook system for the Thoracic, Cardiac, and Vascular Surgery Program (BTKV) at Udayana University to record surgery data from doctors and support future research needs.',
    image: shot('btkv'),
    techStack: ['Laravel', 'Livewire', 'Bootstrap'],
    liveUrl: 'https://btkvfkudayana.com/',
  }),
  client({
    title: 'FastTekno 2025',
    description:
      'The official website for the annual FASTTEKNO IT competition made together with UKM Progress. Worked as a front-end developer for the user and admin interface.',
    image: shot('fasttekno'),
    techStack: ['Astro JS', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://fasttekno-itbstikombali.com/',
  }),
  client({
    title: 'Kanndra Villa',
    description:
      'A management system for a villa in Ubud, Bali, that helps handle bookings, villa information, and pricing. Also worked on the front-end of the villa detail page to make it clear, attractive, and easy to explore.',
    image: shot('kanndravilla'),
    techStack: ['Laravel', 'MySQL', 'Bootstrap'],
  }),
  client({
    title: 'Ivira Beauty',
    description:
      'A premium beauty center in Bali that helps clients feel confident through professional self-care services and quality transformations. Built a smooth booking system to make scheduling appointments and managing reservations easy and flexible.',
    image: shot('ivira'),
    techStack: ['Laravel', 'Livewire', 'Bootstrap'],
  }),
  client({
    title: 'BSM Cruise Services Queue System',
    description:
      'A simple and reliable queue system for BSM Cruise Services Indonesia to help manage applicant flow during recruitment so check-in is smoother and staff stays organized.',
    image: shot('bsm'),
    techStack: ['Laravel', 'Livewire', 'Bootstrap'],
  }),
  client({
    title: 'FSM Queue System',
    description:
      'A queue system for Five Star Marine Services Corporation that helps organize and manage applicants, crew, and visitors more efficiently and orderly.',
    image: shot('fsm'),
    techStack: ['Laravel', 'Livewire', 'Bootstrap'],
  }),
  client({
    title: 'Big Party Computer',
    description:
      'A real-time service monitoring system where customers can check the repair status of their devices through a website using their receipt number, providing transparent progress updates and a smoother service experience.',
    image: shot('bigpartycomputer'),
    techStack: ['Laravel', 'Livewire', 'Tailwind CSS'],
  }),
  client({
    title: 'GMTI XXIV',
    description:
      "An annual IT student event focused on building character in new students during rapid technology development. With the theme 'Smaranaya Cakradiya: Uniting Digital Footprints, Igniting the Future', this project provides technical support for the event.",
    image: shot('gmti'),
    techStack: ['Laravel', 'Vue.js'],
  }),
  client({
    title: 'SMP Negeri 15 Denpasar',
    description:
      'A school profile website for SMP Negeri 15 Denpasar that presents key information clearly, including school programs, facilities, achievements, news, and announcements, making it easier for students, parents, and the public to stay informed.',
    image: shot('smpn15dps'),
    techStack: ['WordPress'],
  }),
  client({
    title: 'Wedding Invitation',
    description:
      'A wedding invitation website that provides a digital platform for couples to share their special day with friends and family. It includes event details, RSVP functionality, and a gallery of memorable moments.',
    image: shot('wedding'),
    techStack: ['React JS', 'Tailwind CSS'],
  }),
  personal({
    title: 'Kurokami',
    description:
      'Manhwa Reader web application built with Astro, TypeScript, and Tailwind CSS. This project is a personal endeavor to create a user-friendly platform for reading manhwa online. It features a clean and intuitive interface, responsive design, and efficient performance to provide an enjoyable reading experience.',
    image: shot('kurokami'),
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS'],
  }),
  personal({
    title: 'Trabook',
    description:
      'Travel Agency Landing Page built with React, Vite, and Tailwind CSS. This project serves as a portfolio piece to demonstrate my front-end development skills and design capabilities. It features a clean and modern design, responsive layout, and interactive elements to enhance user experience.',
    image: shot('trabook'),
    techStack: ['React', 'Vite', 'Tailwind CSS'],
  }),
  personal({
    title: 'Computer Stores',
    description:
      'A simple web-based system for computer stores to manage their inventory, sales, and customer data. Built with Laravel and Bootstrap, this project serves as a portfolio piece to demonstrate my full-stack development skills and ability to create functional web applications.',
    image: shot('computerstores'),
    techStack: ['Laravel', 'Bootstrap'],
  }),
];

// Counts straight from the data above
export const stats = [
  { value: projects.length, label: 'Projects' },
  { value: experience.length, label: 'Experiences' },
];

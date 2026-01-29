'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Hospital Management System',
    description: 'A comprehensive healthcare management platform with patient records, appointment scheduling, and billing systems. Built for scalability and HIPAA-compliant data handling.',
    image: '/projects/hospital-management.jpg',
    tech: ['Python', 'Flask', 'React', 'PostgreSQL', 'SQLAlchemy'],
    features: [
      'Patient record management with secure data encryption',
      'Appointment scheduling with automated reminders',
      'Billing and invoice generation system',
      'Role-based access control for staff',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/hospital-management',
    live: '',
    role: 'Solo Developer',
    category: 'Healthcare',
  },
  {
    id: 2,
    title: 'Burden - Parcel Tracking SaaS',
    description: 'Full-stack SaaS application for logistics companies to track parcels in real-time with customer notifications and analytics dashboard.',
    image: '/projects/burden-tracking.jpg',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Real-time parcel tracking with map integration',
      'Automated SMS and email notifications',
      'Analytics dashboard for business insights',
      'Multi-tenant architecture for scalability',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/burden',
    live: '',
    role: 'Solo Developer',
    category: 'SaaS',
  },
  {
    id: 3,
    title: 'Stride Footwear E-commerce',
    description: 'Modern e-commerce landing page with smooth animations, product showcases, and optimized conversion funnels. Mobile-first responsive design.',
    image: '/projects/stride-footwear.jpg',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    features: [
      'Animated product showcases with 3D effects',
      'Responsive design for all device sizes',
      'Optimized for Core Web Vitals',
      'A/B tested conversion elements',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/stride-footwear',
    live: '',
    role: 'Frontend Developer',
    category: 'E-commerce',
  },
  {
    id: 4,
    title: 'Galaxy Medicare Platform',
    description: 'Healthcare platform connecting patients with medical professionals. Features telemedicine capabilities and medical record management.',
    image: '/projects/galaxy-medicare.jpg',
    tech: ['JavaScript', 'Python', 'Flask', 'React', 'SQLite'],
    features: [
      'Video consultation scheduling',
      'Digital prescription management',
      'Patient health history tracking',
      'Insurance claim processing',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/galaxy-medicare',
    live: '',
    role: 'Full Stack Developer',
    category: 'Healthcare',
  },
  {
    id: 5,
    title: 'Real Estate Management System',
    description: 'Property management application for real estate agencies with listing management, tenant tracking, and financial reporting.',
    image: '/projects/real-estate.jpg',
    tech: ['Python', 'Flask', 'PostgreSQL', 'React', 'Redux'],
    features: [
      'Property listing with advanced search filters',
      'Tenant and lease management',
      'Maintenance request tracking',
      'Financial reports and analytics',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/real-estate-management',
    live: '',
    role: 'Solo Developer',
    category: 'Business',
  },
  {
    id: 6,
    title: 'Bot Battlr - React App',
    description: 'Interactive React application demonstrating component architecture, state management, and API integration with a playful UI.',
    image: '/projects/bot-battlr.jpg',
    tech: ['React', 'JavaScript', 'CSS3', 'REST API'],
    features: [
      'Dynamic component rendering',
      'State management with hooks',
      'Filter and sort functionality',
      'Responsive card-based layout',
    ],
    github: 'https://github.com/TheCoderBuilder-dev/bot-battlr',
    live: '',
    role: 'Frontend Developer',
    category: 'Web App',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isLarge = index === 0 || index === 3

  return (
    <motion.article
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`project-card group relative bg-white rounded-2xl border border-border overflow-hidden ${
        isLarge ? 'md:col-span-2' : ''
      }`}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden bg-surface-alt ${isLarge ? 'h-64 md:h-80' : 'h-48 md:h-56'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-primary/20">{project.title}</span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-primary hover:bg-accent hover:text-white transition-colors"
              aria-label="View GitHub repository"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-primary hover:bg-accent hover:text-white transition-colors"
              aria-label="View live demo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Category & Role */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {project.category}
          </span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="text-xs text-secondary">{project.role}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="text-xs text-secondary flex items-start gap-2">
              <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">
            Featured Work
          </p>
          <h2 className="section-title mb-4">
            Projects that showcase my craft
          </h2>
          <p className="section-subtitle mx-auto">
            A selection of production-ready applications across healthcare, e-commerce, 
            and SaaS domains. Each project demonstrates clean architecture, 
            user-focused design, and attention to detail.
          </p>
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/TheCoderBuilder-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            View all projects on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

'use client';

import { useState, useMemo, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import useIsMobile from '../hooks/useIsMobile';

// Define types for our project data
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  technologies: string[];
  link: string;
  color: string;
  features: string[];
  role: string;
  duration: string;
}

// Project data with extended information
const projects = [
  {
    id: 1,
    title: 'Nexcrow - Solana Escrow Platform',
    description: 'A blockchain-based escrow platform ensuring secure, transparent, and reliable payments for freelancers and Web3 businesses on Solana.',
    longDescription: 'Nexcrow is a Solana-backed escrow platform designed to ensure secure, transparent, and reliable payments for freelancers and Web3 businesses. It allows freelancers and clients to engage in contracts with the security of escrow services, making sure that payments are locked upfront and only released when job milestones are met. The platform combines social platform integration, instant payments, and AI-driven dispute resolution to create a trusted ecosystem for Web3 freelancing.',
    imageUrl: '/Space Monk/Twitter header - 5.png',
    technologies: ['Solana', 'React', 'Next.js', 'TypeScript', 'Web3', 'AI/ML'],
    link: '/case-studies/nexus-nexcrow',
    color: 'bg-blue-600',
    features: [
      'Nexcrow Blinks (Blockchain Links) for social contract sharing',
      'Direct contract Linktree for freelancers',
      'AI-driven dispute resolution system',
      'Blockchain transparency & immutable records',
      'Instant, low-cost USDC transactions',
      'Social platform onboarding via Twitter'
    ],
    role: 'Launched Project',
    duration: 'March 2025'
  },
  {
    id: 2,
    title: 'Creation by Obsession',
    description: 'A visual narrative exploring the journey of the Primordial Space Monk – a story of evolution, transformation, and surrender.',
    longDescription: 'Creation by Obsession is a visual journey following the Primordial Space Monk through phases of doubt, search, obsession, and becoming. This narrative explores themes of identity, surrender, and evolution through a series of captivating visuals and immersive storytelling. The project renders the monk\'s transformation not as a tale of victory, but as a profound meditation on the nature of existence itself.',
    imageUrl: '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.40_6b0e1ab4.jpg',
    technologies: ['Digital Art', 'Visual Storytelling', '3D Rendering', 'Narrative Design', 'Conceptual Art'],
    link: '/case-studies/creation-by-obsession',
    color: 'bg-purple-800',
    features: [
      'Four-phase narrative exploration',
      'Immersive visual storytelling',
      'Philosophical meditation on existence',
      'Captivating space monk character design',
      'Evolution of form and consciousness',
      'Exploration of void and transformation'
    ],
    role: 'Art Project',
    duration: 'April 2025'
  },
  {
    id: 3,
    title: 'Bone Shamans',
    description: 'COMING SOON - An immersive NFT collection with unique lore and interactive experiences.',
    longDescription: 'Bone Shamans is an upcoming NFT collection that combines stunning artwork with rich lore and interactive experiences. Each NFT will have unique attributes and abilities that can be used in the accompanying digital experiences. Stay tuned for the official launch!',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['Ethereum', 'NFTs', 'Web3', 'Interactive Art'],
    link: '#',
    color: 'bg-emerald-600',
    features: [
      'Unique collectible NFTs',
      'Rich lore and backstory',
      'Interactive experiences',
      'Community-driven development'
    ],
    role: 'Coming Soon',
    duration: 'In Development'
  },
  {
    id: 4,
    title: 'BoneCLOB AI Powered NFT Marketplace',
    description: 'CASE STUDY - An exploratory NFT marketplace powered by AI that reached testnet development.',
    longDescription: 'BoneCLOB was an exploratory case study for an AI-powered NFT marketplace designed to revolutionize digital asset discovery and trading. The platform implemented advanced AI algorithms to match collectors with creators and optimize trading strategies. The project reached testnet level development but never launched commercially, serving instead as a valuable technical proof of concept.',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['AI/ML', 'Blockchain', 'React', 'Node.js'],
    link: '#',
    color: 'bg-purple-600',
    features: [
      'AI-powered asset discovery',
      'Automated price recommendations',
      'Creator-collector matching',
      'Secure trading infrastructure'
    ],
    role: 'Case Study',
    duration: 'Completed'
  },
  {
    id: 5,
    title: 'Zee, The Nexus AI Assistant',
    description: 'COMING SOON - An intelligent AI assistant designed to help users navigate the Nexus ecosystem.',
    longDescription: 'Zee is an upcoming AI assistant specifically designed for the Nexus ecosystem. It will help users navigate the platform, provide insights on smart contracts, offer recommendations, and automate routine tasks. With natural language processing capabilities, Zee will make blockchain interactions more accessible to everyone. Stay tuned for the official launch!',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['Natural Language Processing', 'Machine Learning', 'React', 'Python'],
    link: '#',
    color: 'bg-amber-600',
    features: [
      'Natural language interaction',
      'Smart contract analysis',
      'Personalized recommendations',
      'Automated task execution'
    ],
    role: 'Coming Soon',
    duration: 'In Development'
  },
  {
    id: 6,
    title: 'Nexus Protocol',
    description: 'COMING SOON - An all-in-one web3 HR tech solution leveraging AI and Blockchain to streamline operations for web3 businesses.',
    longDescription: 'Nexus Protocol is an all-in-one web3 HR tech solutions protocol, leveraging AI and Blockchain to solve HR insecurities and streamline managerial and financial daily activities of web3 businesses and service providers. The platform aims to transform how decentralized organizations manage their workforce, ensuring compliance, efficiency, and transparency.',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['AI', 'Blockchain', 'HR Tech', 'Web3', 'Financial Management'],
    link: '#',
    color: 'bg-indigo-600',
    features: [
      'AI-powered HR management',
      'Secure payroll automation',
      'Decentralized identity verification',
      'Performance analytics dashboard'
    ],
    role: 'Coming Soon',
    duration: 'In Development'
  },
  {
    id: 7,
    title: 'Mrble Labs',
    description: 'COMING SOON - A team building innovative blockchain products and solutions with cutting-edge technology.',
    longDescription: 'Mrble Labs is a team building cool blockchain products and solutions. Their innovative approach combines technical expertise with creative design to create market-leading digital experiences. Mrble Labs focuses on developing products that make blockchain technology more accessible and user-friendly for both developers and end-users.',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['Blockchain Development', 'Smart Contracts', 'Web3', 'DeFi'],
    link: '#',
    color: 'bg-emerald-600',
    features: [
      'Innovative blockchain solutions',
      'Cross-chain interoperability',
      'User-centric design',
      'Advanced security protocols'
    ],
    role: 'Coming Soon',
    duration: 'In Development'
  },
  {
    id: 8,
    title: 'Mean Finance - Money Streaming Protocol',
    description: 'COMING SOON - A decentralized finance protocol enabling continuous, real-time money streaming for payments, salaries, and subscriptions.',
    longDescription: 'Mean Finance is a Money Streaming Protocol that enables continuous, real-time payments on the blockchain. The platform allows for creating programmable payment streams where funds flow seamlessly from sender to recipient every second, ideal for salaries, subscriptions, and recurring payments. By automating financial flows, Mean Finance eliminates payment delays and enhances financial planning for both individuals and organizations.',
    imageUrl: '/images/coming-soon.jpg',
    technologies: ['DeFi', 'Money Streaming', 'Smart Contracts', 'Payment Infrastructure'],
    link: '#',
    color: 'bg-blue-600',
    features: [
      'Real-time money streaming',
      'Programmable payment flows',
      'Multi-chain compatibility',
      'Customizable streaming parameters'
    ],
    role: 'Coming Soon',
    duration: 'In Development'
  }
];

// Project Card component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isNexcrowProject = project.id === 1;
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleClick = () => {
    if (project.link !== '#') {
      window.location.href = project.link;
    } else {
      setIsExpanded(true);
    }
  };

  // 3D rotation effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - cardCenterX) / (rect.width / 2)) * 10;
    const rotateX = -((e.clientY - cardCenterY) / (rect.height / 2)) * 10;
    
    // Update rotation state
    setRotation({ x: rotateX, y: rotateY });
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <>
    <motion.div
        ref={cardRef}
        className={`rounded-xl overflow-hidden ${
          isDark 
            ? 'bg-black border border-gray-800 shadow-lg' 
            : 'bg-white border border-gray-200 shadow-lg'
        } h-full perspective-1000 card-container`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
          transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'perspective(1000px)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={!isHovered ? handleClick : undefined}
      >
        {/* Card Header/Image */}
        <div 
          className="relative h-48 overflow-hidden" 
        style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {isNexcrowProject ? (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/Space Monk/Twitter header - 5.png" 
                alt="Nexcrow - Solana Escrow Platform" 
                className="w-full h-full object-cover"
              />
            </div>
            ) : (
            <>
            <div className={`absolute inset-0 ${project.color} opacity-10 z-10`}></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className={`p-1 rounded-lg ${project.color} opacity-70`}>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                    <h3 className="text-black text-base md:text-lg font-bold">{project.title}</h3>
                </div>
              </div>
          </div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="object-cover w-full h-full opacity-50"
                />
            </>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-5" style={{ 
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease-out'
        }}>
          <p className={`${isDark ? 'text-gray-300' : 'text-black'} mb-4 text-sm ${isHovered ? '' : 'line-clamp-3'}`}>
            {isHovered ? project.longDescription : project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-4" style={{ 
            transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out'
          }}>
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                  isDark ? 'bg-black text-gray-300 border border-gray-700' : 'bg-gray-100 text-black'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Hover reveal content */}
          <AnimatePresence>
            {isHovered && (
                  <motion.div 
                className="mt-4 mb-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transform: 'translateZ(50px)',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <h4 className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Key Features:</h4>
                <ul className={`list-disc pl-5 text-xs space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <h5 className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Role</h5>
                    <p className={`text-xs ${isDark ? 'text-white' : 'text-black'}`}>{project.role}</p>
                  </div>
                  <div>
                    <h5 className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Timeline</h5>
                    <p className={`text-xs ${isDark ? 'text-white' : 'text-black'}`}>{project.duration}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Button or Coming Soon indicator */}
          <div style={{ 
            transform: isHovered ? 'translateZ(60px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out'
          }}>
            {project.link === '#' && project.id !== 1 ? (
              <div className="mt-3 flex items-center gap-2">
                <motion.div 
                  className={`text-xl ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
                    animate={{ 
                    y: [0, -3, 0],
                    opacity: [1, 0.7, 1]
                    }}
                    transition={{
                    duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    ease: "easeInOut"
                    }}
                  >
                    👀
                  </motion.div>
                <span className={`text-sm font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    Coming Soon
                </span>
                </div>
              ) : (
              <motion.button
            className={`inline-flex items-center ${
                  isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                } font-medium hover:underline mt-2`}
            whileHover={{ x: 5 }}
                onClick={isHovered ? handleClick : undefined}
          >
                {isHovered ? "Explore Project" : "View Project"}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
              </motion.button>
            )}
        </div>
      </div>
        
        {/* 3D hover shadow effect */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none" 
      style={{
        boxShadow: isDark 
                ? `0 15px 40px 5px rgba(79, 70, 229, 0.2), 
                   ${rotation.y < 0 ? '-' : ''}${Math.abs(rotation.y)}px ${rotation.x < 0 ? '-' : ''}${Math.abs(rotation.x)}px 30px rgba(79, 70, 229, 0.1)`
                : `0 15px 40px 5px rgba(0, 0, 0, 0.1), 
                   ${rotation.y < 0 ? '-' : ''}${Math.abs(rotation.y)}px ${rotation.x < 0 ? '-' : ''}${Math.abs(rotation.x)}px 30px rgba(0, 0, 0, 0.05)`,
              borderRadius: '0.75rem',
              opacity: 0.8
            }}
          />
        )}
        
        {/* Subtle highlight effect on the edges */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" 
                  style={{ 
                    background: isDark 
                ? `linear-gradient(${135 + rotation.y}deg, rgba(79, 70, 229, 0.2) 0%, transparent 60%, rgba(236, 72, 153, 0.2) 100%)`
                : `linear-gradient(${135 + rotation.y}deg, rgba(79, 70, 229, 0.1) 0%, transparent 60%, rgba(236, 72, 153, 0.1) 100%)`,
              transform: 'translateZ(5px)',
              opacity: 0.7
            }}
          />
        )}
              </motion.div>
            
      {/* Expanded modal for mobile - shown only when a "Coming Soon" project is clicked */}
      <AnimatePresence>
        {isExpanded && (
            <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
          <motion.div 
              className={`w-full max-w-md rounded-xl overflow-hidden ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/30 p-2 rounded-full"
                onClick={() => setIsExpanded(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Modal header */}
              <div className="h-40 relative">
                <div className={`absolute inset-0 ${project.color} opacity-30`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
              </div>
              </div>
              
              {/* Modal content */}
              <div className="p-6">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                {project.longDescription}
              </p>
                
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Coming Soon
              </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    This project is currently in development. Check back later for updates!
                  </p>
                </div>
              </div>
            </motion.div>
              </motion.div>
            )}
      </AnimatePresence>
    </>
  );
};

// Add this CSS at the end of the component to ensure perspective works correctly
const styleElement = typeof document !== 'undefined' ? 
  document.getElementById('project-card-styles') || 
  (() => {
    const style = document.createElement('style');
    style.id = 'project-card-styles';
    document.head.appendChild(style);
    return style;
  })() : null;

if (styleElement) {
  styleElement.innerHTML = `
    .perspective-1000 {
      perspective: 1000px;
    }
    .card-container {
      transition: transform 0.5s ease-out;
    }
    .card-container:hover {
      z-index: 10;
    }
  `;
}

// Main ProjectsSection component
export default function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  return (
    <section id="projects" className="relative py-16 md:py-32 overflow-hidden bg-white dark:bg-black">
      {/* Light/dark mode background */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-white"></div>
        )}
      </div>

      {/* Ghost shiny message */}
      <div className="absolute top-10 inset-x-0 z-20 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className={`text-xl md:text-2xl font-bold ${isDark ? 'ghost-message' : 'ghost-message-light'} whitespace-nowrap`}>
          I like to build cool stuff
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mb-12 text-center">
          <motion.h2 
            className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-glow-purple' 
                : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className={`${isDark ? 'text-gray-300 text-glow-sm' : 'text-black'} max-w-2xl mx-auto text-sm sm:text-base`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Explore my latest work showcasing interactive 3D experiences, creative coding,
            and immersive digital solutions.
          </motion.p>
        </div>
        
        {/* 3D Cards Grid replacing the wheel carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 
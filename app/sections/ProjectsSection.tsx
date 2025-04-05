'use client';

import { useState, useRef, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

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

// Define types for component props
interface ProjectCardProps {
  project: Project;
  style: any; // Using any for the framer-motion style object
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void; // Add onClick handler
}

interface ExplanatoryCardProps {
  project: Project;
}

// Project data with extended information
const projects = [
  {
    id: 1,
    title: 'Nexcrow - Solana Escrow Platform',
    description: 'A blockchain-based escrow platform ensuring secure, transparent, and reliable payments for freelancers and Web3 businesses on Solana.',
    longDescription: 'Nexcrow is a Solana-backed escrow platform designed to ensure secure, transparent, and reliable payments for freelancers and Web3 businesses. It allows freelancers and clients to engage in contracts with the security of escrow services, making sure that payments are locked upfront and only released when job milestones are met. The platform combines social platform integration, instant payments, and AI-driven dispute resolution to create a trusted ecosystem for Web3 freelancing.',
    imageUrl: '/images/nexus-platform.jpg',
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
    description: 'COMING SOON - A revolutionary NFT marketplace powered by AI to enhance discovery, creation, and trading.',
    longDescription: 'BoneCLOB is an upcoming AI-powered NFT marketplace that will revolutionize how digital assets are discovered, created, and traded. The platform uses advanced AI algorithms to match collectors with creators, generate unique artwork, and optimize trading strategies. Stay tuned for the official launch!',
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
    role: 'Coming Soon',
    duration: 'In Development'
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

// Memoized project card component for better performance
const ProjectCard = memo(({ 
  project, 
  style, 
  isActive, 
  isHovered, 
  onHoverStart, 
  onHoverEnd,
  onClick  // Add onClick parameter
}: ProjectCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isNexcrowProject = project.id === 1;
  
  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  return (
    <motion.div
      className="absolute w-[90%] sm:w-[85%] md:w-[80%] max-w-xl transform -translate-x-1/2"
      animate={style}
      transition={style.transition}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity", 
        filter: isActive ? "drop-shadow(0 20px 20px rgba(0,0,0,0.15))" : "none",
        transformOrigin: "center bottom"
      }}
      whileHover={{ 
        scale: style.scale * 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick} // Add the onClick handler here
      role="button"
      aria-label={`View ${project.title} details`}
    >
      <div 
        className={`rounded-2xl ${
          isDark 
            ? 'bg-black border border-gray-800 shadow-2xl' 
            : 'bg-white border border-gray-200 shadow-lg'
        } overflow-hidden ${
          isActive 
            ? `ring-1 ${isDark ? 'ring-gray-700' : 'ring-indigo-500/50'}` 
            : ''
        } ${
          isHovered 
            ? `ring-1 ${isDark ? 'ring-gray-600' : 'ring-indigo-500'}` 
            : ''
        }`}
        style={{
          background: isDark 
            ? 'linear-gradient(145deg, #000000, #0a0a0a, #000000, #0a0a0a, #000000)' 
            : 'linear-gradient(145deg, #ffffff, #f8f8f8, #ffffff, #f8f8f8, #ffffff)',
          boxShadow: isDark 
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 1px rgba(0, 0, 0, 0.8)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className={`relative ${isMobile && isActive ? 'h-28 sm:h-36' : 'h-36 sm:h-48'} overflow-hidden`}>
          {/* For Nexcrow project only, use gradient background instead of image */}
          {isNexcrowProject ? (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800 z-10"></div>
          ) : (
            <div className={`absolute inset-0 ${project.color} opacity-10 z-10`}></div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {isNexcrowProject ? (
              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-200" viewBox="0 0 24 24" fill="none">
                    <path d="M8 9L12 5L16 9M16 15L12 19L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text-xs font-medium text-blue-200 uppercase tracking-wider">Solana Escrow Platform</span>
                </div>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold ">Nexcrow<span className="block text-sm sm:text-base font-medium mt-1 text-blue-200">Secure Freelance Payments</span></h3>
              </div>
            ) : (
              <div className={`p-1 rounded-lg ${project.color} opacity-70`}>
                <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                  <h3 className={`text-black text-lg sm:text-xl md:text-2xl font-bold text-center`}>{project.title}</h3>
                </div>
              </div>
            )}
          </div>
          
          {/* Project image with better visibility - only for non-Nexcrow projects */}
          {!isNexcrowProject && (
            <div className="w-full h-full">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="object-cover w-full h-full opacity-50"
                  style={{
                    objectPosition: 'center top',
                    maxHeight: '100%',
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Card content */}
        <div className="p-4 sm:p-6">
          {/* Basic content for all cards */}
          <p className={`${isDark ? 'text-gray-300' : 'text-black'} mb-4 text-sm sm:text-base line-clamp-3`}>{project.description}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {project.technologies.slice(0, isActive ? undefined : 3).map((tech: string, idx: number) => (
              <span
                key={idx}
                className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                  isDark ? 'bg-black text-gray-300 border border-gray-700' : 'bg-gray-100 text-black'
                }`}
                style={{
                  boxShadow: isDark ? 'inset 0px 1px 1px rgba(255,255,255,0.1)' : ''
                }}
              >
                {tech}
              </span>
            ))}
            {!isActive && project.technologies.length > 3 && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDark ? 'bg-black text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700'
              }`}>
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          {/* Extended content for active mobile cards */}
          {(isMobile && isActive) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {/* Show Coming Soon animation for non-Nexcrow projects on mobile with other content faded */}
              {isMobile && project.link === '#' && project.id !== 1 ? (
                <div className="mt-3 flex flex-col items-center py-3">
                  <motion.div 
                    className={`text-4xl mb-2 ${isDark ? 'text-indigo-500' : 'text-indigo-600'}`}
                    animate={{ 
                      y: [0, -8, 0],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0.5,
                      times: [0, 0.5, 1]
                    }}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    👀
                  </motion.div>
                  <motion.p 
                    className={`text-base font-medium mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Coming Soon
                  </motion.p>
                  <motion.p 
                    className={`text-xs text-center px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    This project is currently in development and will be available soon.
                  </motion.p>
                </div>
              ) : (
                <>
                  <div className={`mb-3 text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    <span className="font-semibold">Role:</span> {project.role} | <span className="font-semibold">Duration:</span> {project.duration}
                  </div>
                  
                  <div className="mb-3">
                    <h4 className={`text-xs font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Key Features
                    </h4>
                    <ul className={`list-disc pl-4 text-xs space-y-0.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.features.slice(0, 2).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                      {project.features.length > 2 && (
                        <li className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          +{project.features.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
          
          <motion.a
            href={project.link}
            className={`inline-flex items-center ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-indigo-600'
            } font-medium hover:underline`}
            whileHover={{ x: 5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            View Project
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Explanatory card for expanded project view
const ExplanatoryCard = memo(({ project }: ExplanatoryCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isNexcrowProject = project.id === 1;
  
  // Handler for clicking on the explanatory card
  const handleClick = () => {
    if (project.link && project.link !== '#') {
      window.location.href = project.link;
    }
  };
  
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden shadow-xl w-full max-w-md mx-auto ${
        isDark ? 'border border-gray-800' : 'border border-gray-200'
      } ${project.link ? 'cursor-pointer' : ''}`}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #000000, #0a0a0a, #050505, #0a0a0a, #000000)' 
          : 'linear-gradient(135deg, #ffffff, #fcfcfc, #f8f8f8, #fcfcfc, #ffffff)',
        boxShadow: isDark 
          ? '0 20px 50px -15px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
          : '0 20px 50px -15px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 10, rotateY: -5 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.6,
        rotateY: { type: "spring", stiffness: 100, damping: 15 }
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onClick={handleClick}
      role={project.link ? "button" : undefined}
      aria-label={project.link ? `View ${project.title} details` : undefined}
    >
      {isNexcrowProject || project.id === 2 ? (
        <>
          {/* Header with gradient overlay - with 3D effect */}
          <motion.div 
            className="relative"
            initial={{ z: -20 }}
            animate={{ z: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Project image with gradient overlay */}
            <div className="w-full h-44 overflow-hidden">
              <motion.div 
                className="relative w-full h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: isDark 
                      ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)' 
                      : 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>
            </div>
            
            {/* Floating project title card - 3D lifted effect */}
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-11/12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(30px)',
                zIndex: 10
              }}
            >
              <div 
                className={`px-3 py-2 rounded-lg shadow-lg ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'} backdrop-blur-sm`} 
                style={{
                  background: isDark 
                    ? 'linear-gradient(145deg, rgba(17, 24, 39, 0.95), rgba(10, 15, 25, 0.95))' 
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
                  boxShadow: isDark 
                    ? '0 15px 35px -10px rgba(0, 0, 0, 0.9), 0 0 10px rgba(255, 255, 255, 0.1)' 
                    : '0 15px 35px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className={`text-lg font-bold text-center ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {project.title.split(' - ')[0]}
                </h3>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content section with 3D layered effect */}
          <motion.div 
            className="p-5 pt-8"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)'
            }}
          >
            {/* Meta information with subtle divider - 3D lifted */}
            <motion.div 
              className={`flex justify-between items-center py-2 mb-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{ transform: 'translateZ(15px)' }}
            >
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDark 
                  ? project.id === 2 ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400' 
                  : project.id === 2 ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {project.role}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {project.duration}
              </div>
            </motion.div>
            
            {/* Enhanced description with pull quote styling - subtle 3D effect */}
            <motion.div 
              className={`relative mb-4 pl-3 ${
                isDark 
                  ? project.id === 2 ? 'border-l-2 border-purple-700' : 'border-l-2 border-gray-700' 
                  : project.id === 2 ? 'border-l-2 border-purple-200' : 'border-l-2 border-indigo-200'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ transform: 'translateZ(5px)' }}
            >
              <p className={`text-xs leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.longDescription}
              </p>
            </motion.div>
            
            {/* Features section - 3D staggered appearance */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{ transform: 'translateZ(10px)' }}
            >
              <h4 className={`text-xs font-semibold mb-2 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Key Features
              </h4>
              
              <ul className={`grid grid-cols-1 gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.features.slice(0, 3).map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="text-xs flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                  >
                    <span className={`mr-1 mt-0.5 text-xs ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>•</span>
                    {feature}
                  </motion.li>
                ))}
                {project.features.length > 3 && (
                  <motion.li 
                    className="text-xs flex items-start"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                  >
                    <span className={`mr-1 mt-0.5 text-xs ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>•</span>
                    <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                      And {project.features.length - 3} more features
                    </span>
                  </motion.li>
                )}
              </ul>
            </motion.div>
            
            {/* Technologies - 3D floating pills */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              style={{ transform: 'translateZ(20px)' }}
            >
              <h4 className={`text-xs font-semibold mb-2 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3432 2.65685L13.8995 6.21317M13.8995 6.21317L16.0491 4.06352C17.214 2.89866 19.0999 2.89866 20.2648 4.06352C21.4297 5.22837 21.4297 7.11438 20.2648 8.27924L18.1152 10.4289M13.8995 6.21317L4.81516 15.2975C4.42463 15.688 4.42463 16.3212 4.81516 16.7117L7.76822 19.6648C8.15874 20.0553 8.7919 20.0553 9.18242 19.6648L18.1152 10.4289M18.1152 10.4289L20.2648 8.27924" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Technologies
              </h4>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isDark 
                        ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    style={{
                      boxShadow: isDark ? 'inset 0px 1px 1px rgba(255,255,255,0.05)' : '',
                      transform: `translateZ(${15 + index * 2}px)`
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.0 + (index * 0.05) }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* CTA Button with 3D hover effect */}
            <motion.a
              href={project.link}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ 
                scale: 1.05,
                translateZ: 30,
                boxShadow: isDark 
                  ? '0 15px 25px -5px rgba(0,0,0,0.8), 0 0 15px rgba(79, 70, 229, 0.4)' 
                  : '0 15px 25px -5px rgba(0,0,0,0.1), 0 0 15px rgba(79, 70, 229, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center justify-center w-full px-3 py-1.5 rounded-lg font-medium text-xs ${
                isDark 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors duration-200 shadow-md`}
              style={{ 
                transform: 'translateZ(25px)',
                transformStyle: 'preserve-3d'
              }}
              onClick={(e) => {
                // Prevent default to allow our custom click handler on the parent div to work
                e.stopPropagation();
              }}
            >
              <span>{project.link !== '#' ? 'View Project Details' : 'Coming Soon'}</span>
              {project.link !== '#' && (
                <motion.svg 
                  className="ml-1.5 w-3.5 h-3.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              )}
            </motion.a>
            
            {/* Add a subtle "Click anywhere" hint */}
            {project.link !== '#' && (
              <motion.div
                className={`text-center mt-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                Click anywhere to view case study
              </motion.div>
            )}
          </motion.div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[300px] p-5">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              scale: { type: "spring", stiffness: 100, damping: 15 }
            }}
          >
            <motion.div 
              className={`text-4xl mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                times: [0, 0.5, 1]
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              👀
            </motion.div>
            <motion.p 
              className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Coming Soon
            </motion.p>
            <motion.p 
              className={`text-xs mt-1 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Select Nexcrow to view project details
            </motion.p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
});

ExplanatoryCard.displayName = 'ExplanatoryCard';

export default function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null); // Track last hovered project
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastInteractionTime = useRef(Date.now());
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Memoize the getProjectStyles function to prevent recalculations
  const getProjectStyles = useMemo(() => (index: number, activeIndex: number) => {
    const totalProjects = projects.length;
    
    // Calculate relative index with proper looping
    let relativeIndex = index - activeIndex;
    
    // Normalize relative index for looping
    if (relativeIndex > totalProjects / 2) {
      relativeIndex -= totalProjects;
    } else if (relativeIndex < -totalProjects / 2) {
      relativeIndex += totalProjects;
    }
    
    // Calculate angle in a full circle (2π)
    const angleIncrement = (Math.PI * 2) / totalProjects;
    // Position projects along the top half of the circle
    const angle = (relativeIndex * angleIncrement) + Math.PI / 2;
    
    // Calculate radius based on container width for half-circle effect
    const radiusPercent = 70; // % of container width for the radius
    
    // Calculate position on the circle
    const x = Math.cos(angle) * radiusPercent;
    const y = Math.sin(angle) * radiusPercent;
    
    // Only show items that are in the top half of the circle with some margin
    const isInView = y >= -30;
    
    // Scale and opacity based on y-position (higher = more prominent)
    const normalizedY = Math.max(0, (y + 30) / (radiusPercent + 30));
    const scale = 0.7 + (0.3 * normalizedY);
    const opacity = isInView ? 0.4 + (0.6 * normalizedY) : 0;
    
    // Items are positioned along the semicircle
    const xPos = 50 + x;
    const yPos = 100 - y; // Inverted for CSS coordinates
    
    // Calculate z-index based on position for proper layering
    const zIndex = Math.round(opacity * 10);
    
    return {
      x: `${xPos}%`,
      y: `${yPos}%`,
      scale: isInView ? scale : 0,
      opacity,
      zIndex,
      rotateZ: relativeIndex * -5, // Gentler rotation
      rotateX: (1 - normalizedY) * 10, // Add slight perspective tilt
      // Smooth transitions for rotation
      transition: { type: "spring", stiffness: 300, damping: 30, mass: 1 }
    };
  }, []);
  
  const rotateCarousel = (direction: number) => {
    setDirection(direction);
    setActiveIndex((prev) => {
      // Ensure proper looping
      const newIndex = (prev - direction + projects.length) % projects.length;
      // Update slider value to match
      setSliderValue(newIndex * (100 / (projects.length - 1)));
      return newIndex;
    });
    
    // Update last interaction time
    lastInteractionTime.current = Date.now();
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);
    
    // Calculate the corresponding project index
    const projectIndex = Math.round(newValue / (100 / (projects.length - 1)));
    
    // Only update if different from current index
    if (projectIndex !== activeIndex) {
      // Fix direction to move cards in the opposite direction when sliding down
      const direction = projectIndex > activeIndex ? -1 : 1;
      setDirection(direction);
      setActiveIndex(projectIndex);
    }
    
    // Update last interaction time
    lastInteractionTime.current = Date.now();
  };
  
  // Hover handlers for project cards
  const handleProjectHover = (index: number) => {
    setHoveredIndex(index);
    setLastHoveredIndex(index); // Store the last hovered index
  };
  
  const handleProjectLeave = () => {
    // Only reset hoveredIndex on desktop, to keep the tap state active on mobile
    if (!isMobile) {
      setHoveredIndex(null);
    }
    // We don't reset lastHoveredIndex here so the card persists
  };

  // Handle tap/click on mobile - simulate hover state
  const handleProjectTap = (index: number) => {
    if (isMobile) {
      // If the same project is tapped again, toggle its state
      if (hoveredIndex === index) {
        setHoveredIndex(null);
      } else {
        setHoveredIndex(index);
        setLastHoveredIndex(index);
      }
    }
  };
  
  // Auto-rotation (pause when hovering) - use throttled interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (hoveredIndex === null) {
      interval = setInterval(() => {
        // Only auto-rotate if no interaction in last 5 seconds
        if (Date.now() - lastInteractionTime.current > 5000) {
          rotateCarousel(1);
        }
      }, 6000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredIndex]);
  
  // Only render visible projects for better performance
  const visibleProjects = useMemo(() => {
    return projects.filter((_, index) => {
      const distance = Math.abs(index - activeIndex);
      // Only render projects that are within 2 positions of the active index
      // or the currently hovered project
      return distance <= 2 || index === hoveredIndex;
    });
  }, [activeIndex, hoveredIndex]);
  
  return (
    <section id="projects" className="relative py-16 md:py-32 overflow-hidden bg-white dark:bg-black">
      {/* Light/dark mode background - no extra borders */}
      <div className="absolute inset-0 z-0">
        {isDark ? (
          // Dark mode - keep some styling
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </div>
        ) : (
          // Light mode - pure white with absolutely no styling
          <div className="absolute inset-0 bg-white"></div>
        )}
      </div>

      {/* Ghost shiny message - fixed positioning at the top */}
      <div className="absolute top-10 inset-x-0 z-20 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className={`text-xl md:text-2xl font-bold ${isDark ? 'ghost-message' : 'ghost-message-light'} whitespace-nowrap`}>
          I like to build cool stuff
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mb-8 md:mb-12 text-center">
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
        
        <div className="relative flex flex-col md:flex-row">
          {/* Half Pie Chart Carousel - Moved up */}
          <div 
            ref={carouselRef}
            className="relative h-[550px] sm:h-[580px] md:h-[650px] overflow-hidden perspective mx-auto select-none w-full"
          >
            <div className="w-full h-full relative">
              {projects.map((project, index) => {
                const style = getProjectStyles(index, activeIndex);
                const isActive = index === activeIndex;
                const isHovered = index === hoveredIndex;
                
                // Skip rendering projects that are far from the active index unless hovered
                const distance = Math.abs(index - activeIndex);
                if (distance > 2 && !isHovered) return null;
                
                return (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    style={style}
                    isActive={isActive}
                    isHovered={isHovered}
                    onHoverStart={() => handleProjectHover(index)}
                    onHoverEnd={handleProjectLeave}
                    onClick={() => {
                      // On mobile, first tap selects the card, second tap navigates
                      if (isMobile) {
                        handleProjectTap(index);
                        // Only navigate if already selected and it's a valid link (not "#" which is for Coming Soon projects)
                        if (hoveredIndex === index && project.link && project.link !== '#') {
                          window.location.href = project.link;
                        }
                      } else {
                        // On desktop, clicking navigates directly if it's a valid link
                        if (project.link && project.link !== '#') {
                          window.location.href = project.link;
                        }
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Vertical Slider - In the middle between carousel and explanatory card */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center h-[400px] px-2 opacity-20 hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              onClick={() => rotateCarousel(-1)}
              className={`p-3 rounded-full ${
                isDark 
                  ? 'bg-black/80 text-white hover:bg-indigo-500' 
                  : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 border border-gray-200 shadow-sm'
              } transition-all flex-shrink-0 mb-2`}
              aria-label="Previous project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="relative h-full w-14 flex items-center justify-center">
              {/* Slider Track with improved styles */}
              <div 
                className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 ${
                  isDark 
                    ? 'bg-gradient-to-t from-gray-900 to-gray-800' 
                    : 'bg-gradient-to-t from-gray-100 to-gray-200'
                } rounded-full overflow-hidden`}
                style={{
                  boxShadow: isDark 
                    ? 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' 
                    : 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              ></div>
              
              {/* Slider Colored Track with glow */}
              <motion.div 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 ${
                  isDark 
                    ? 'bg-gradient-to-t from-indigo-600 to-indigo-500' 
                    : 'bg-gradient-to-t from-indigo-400 to-indigo-500'
                } rounded-full`}
                style={{ 
                  height: `${sliderValue}%`,
                  boxShadow: isDark 
                    ? '0 0 8px rgba(99, 102, 241, 0.6)' 
                    : '0 0 8px rgba(99, 102, 241, 0.3)'
                }}
                initial={{ height: 0 }}
                animate={{ height: `${sliderValue}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ></motion.div>
              
              {/* Slider Markers with animations */}
              {projects.map((_, index) => {
                const position = index * (100 / (projects.length - 1));
                const isActive = index <= activeIndex;
                
                return (
                  <motion.button 
                    key={index} 
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all z-10`}
                    style={{ 
                      bottom: `${position}%`,
                      backgroundColor: isActive ? 'rgb(79, 70, 229)' : isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
                      borderWidth: 1,
                      borderColor: isActive ? 'rgb(99, 102, 241)' : isDark ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
                      boxShadow: isActive 
                        ? (isDark ? '0 0 8px rgba(99, 102, 241, 0.6)' : '0 0 6px rgba(99, 102, 241, 0.4)') 
                        : 'none'
                    }}
                    animate={{ 
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isActive ? 'rgb(79, 70, 229)' : isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => {
                      const prevIndex = activeIndex;
                      setActiveIndex(index);
                      setSliderValue(index * (100 / (projects.length - 1)));
                      // Fix direction to move cards in the opposite direction
                      setDirection(index > prevIndex ? -1 : 1);
                      lastInteractionTime.current = Date.now();
                    }}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                );
              })}
              
              {/* Full-height clickable track with improved feel */}
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  // Get click position relative to the track
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickY = e.clientY - rect.top;
                  const trackHeight = rect.height;
                  
                  // Calculate position as percentage from bottom (0-100)
                  const percentage = 100 - (clickY / trackHeight * 100);
                  
                  // Smoother animation by using controls
                  controls.start({ 
                    height: `${percentage}%`,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  });
                  
                  setSliderValue(percentage);
                  
                  // Calculate corresponding project index
                  const projectIndex = Math.round(percentage / (100 / (projects.length - 1)));
                  const clampedIndex = Math.max(0, Math.min(projects.length - 1, projectIndex));
                  
                  // Update if different from current
                  if (clampedIndex !== activeIndex) {
                    // Fix direction to move cards in the opposite direction when sliding down
                    const direction = clampedIndex > activeIndex ? -1 : 1;
                    setDirection(direction);
                    setActiveIndex(clampedIndex);
                  }
                  
                  lastInteractionTime.current = Date.now();
                }}
              ></div>
              
              {/* Draggable Thumb with improved feedback */}
              <motion.div 
                className={`absolute left-1/2 -translate-x-1/2 w-7 h-7 ${
                  isDark 
                    ? 'bg-white border-2 border-indigo-600' 
                    : 'bg-white border-2 border-indigo-500'
                } rounded-full z-20 cursor-grab active:cursor-grabbing`}
                style={{ 
                  bottom: `calc(${sliderValue}% - 14px)`,
                  boxShadow: isDark 
                    ? '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(99, 102, 241, 0.1)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(99, 102, 241, 0.05)'
                }}
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(0, 0, 0, 0.6), 0 0 0 6px rgba(99, 102, 241, 0.2)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 6px rgba(99, 102, 241, 0.1)'
                }}
                whileTap={{ 
                  scale: 0.95,
                  boxShadow: isDark 
                    ? '0 1px 4px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(99, 102, 241, 0.3)' 
                    : '0 1px 4px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(99, 102, 241, 0.2)'
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.05}
                dragMomentum={false}
                onDrag={(event, info: PanInfo) => {
                  const element = event.currentTarget as HTMLElement;
                  if (!element.parentElement) return;
                  
                  const track = element.parentElement;
                  const trackRect = track.getBoundingClientRect();
                  const thumbY = info.point.y - trackRect.top;
                  
                  // Calculate percentage (0 to 1)
                  const percentage = Math.min(Math.max(thumbY / trackRect.height, 0), 1);
                  
                  // Update slider value (inverted)
                  const newValue = 100 - (percentage * 100);
                  setSliderValue(newValue);
                  
                  // Update the active index based on the percentage
                  const newActiveIndex = Math.round((projects.length - 1) * (1 - percentage));
                  const clampedIndex = Math.max(0, Math.min(projects.length - 1, newActiveIndex));
                  
                  if (clampedIndex !== activeIndex) {
                    // Fix direction to move cards in the opposite direction when sliding down
                    const direction = clampedIndex > activeIndex ? -1 : 1;
                    setActiveIndex(clampedIndex);
                    setDirection(direction);
                  }
                  
                  lastInteractionTime.current = Date.now();
                }}
                dragTransition={{ 
                  bounceStiffness: 800, 
                  bounceDamping: 35,
                  power: 0.2
                }}
              />
            </div>
            
            <motion.button
              onClick={() => rotateCarousel(1)}
              className={`p-3 rounded-full ${
                isDark 
                  ? 'bg-black/80 text-white hover:bg-indigo-500' 
                  : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 border border-gray-200 shadow-sm'
              } transition-all flex-shrink-0 mt-2`}
              aria-label="Next project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {/* Explanatory Project Card - Only on desktop */}
          {!isMobile && (
            <AnimatePresence mode="wait">
              {/* Use lastHoveredIndex instead of hoveredIndex to maintain visibility */}
              {lastHoveredIndex !== null && (
                <motion.div 
                  className="absolute top-1/2 right-0 w-full md:w-1/2 p-4 z-30 transform -translate-y-1/2 hidden md:block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  key={lastHoveredIndex}
                >
                  <ExplanatoryCard project={projects[lastHoveredIndex]} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
          
          {/* Mobile Explanatory Card - Only shown when a project is selected/hovered */}
          {false && isMobile && (
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div 
                  className="fixed inset-x-0 bottom-0 p-4 z-40"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  key={hoveredIndex}
                >
                  {/* Close button */}
                  <div className="relative max-w-md mx-auto">
                    <button 
                      className={`absolute -top-3 -right-3 z-50 p-2 rounded-full shadow-md ${
                        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
                      }`}
                      onClick={() => setHoveredIndex(null)}
                      aria-label="Close details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <ExplanatoryCard project={projects[hoveredIndex]} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          
          {/* Pagination indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setSliderValue(index * (100 / (projects.length - 1)));
                  lastInteractionTime.current = Date.now();
                }}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-indigo-600' : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-300'} transition-all`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile navigation buttons - Fixed at bottom of viewport on small screens */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-4 md:hidden z-50">
        <button
          onClick={() => rotateCarousel(-1)}
          className={`p-2.5 sm:p-3 rounded-full ${isDark ? 'bg-black/90 text-white' : 'bg-white/90 text-gray-800'} border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:bg-indigo-600 hover:text-white transition-all shadow-lg backdrop-blur-sm`}
          aria-label="Previous project"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full bg-black/80 text-white backdrop-blur-sm">
          {activeIndex + 1}/{projects.length}
        </div>
        
        <button
          onClick={() => rotateCarousel(1)}
          className={`p-2.5 sm:p-3 rounded-full ${isDark ? 'bg-black/90 text-white' : 'bg-white/90 text-gray-800'} border ${isDark ? 'border-white/10' : 'border-gray-200'} hover:bg-indigo-600 hover:text-white transition-all shadow-lg backdrop-blur-sm`}
          aria-label="Next project"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Horizontal Slider (only visible on mobile) */}
      <div className="md:hidden max-w-xl mx-auto mb-6 w-full px-2 sm:px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => rotateCarousel(-1)}
            className={`p-2 rounded-full ${
              isDark 
                ? 'bg-black/80 text-white' 
                : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
            } hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0`}
            aria-label="Previous project"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="relative w-full h-14 flex items-center">
            {/* Slider Track */}
            <div className={`absolute inset-0 my-auto h-1 ${isDark ? 'bg-black' : 'bg-gray-100 border border-gray-200'} rounded-full`}></div>
            
            {/* Slider Colored Track */}
            <div 
              className={`absolute left-0 my-auto h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full`}
              style={{ width: `${sliderValue}%` }}
            ></div>
            
            {/* Slider Markers */}
            {projects.map((_, index) => {
              const position = index * (100 / (projects.length - 1));
              return (
                <div 
                  key={index} 
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all z-10 ${
                    index <= activeIndex ? 'bg-indigo-600' : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'
                  }`}
                  style={{ left: `${position}%` }}
                />
              );
            })}
            
            {/* Draggable Thumb for mobile */}
            <motion.div 
              className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-2 ${
                isDark ? 'border-indigo-600' : 'border-indigo-500'
              } shadow-md z-20 cursor-grab active:cursor-grabbing`}
              style={{ left: `calc(${sliderValue}% - 14px)` }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(event, info: PanInfo) => {
                const element = event.currentTarget as HTMLElement;
                if (!element.parentElement) return;
                
                const track = element.parentElement;
                const trackRect = track.getBoundingClientRect();
                const thumbX = info.point.x - trackRect.left;
                
                // Calculate percentage (0 to 1)
                const percentage = Math.min(Math.max(thumbX / trackRect.width, 0), 1);
                
                // Update slider value
                setSliderValue(percentage * 100);
                
                // Update the active index based on the percentage
                const newActiveIndex = Math.min(
                  Math.floor(percentage * projects.length),
                  projects.length - 1
                );
                
                if (newActiveIndex !== activeIndex) {
                  setActiveIndex(newActiveIndex);
                  setDirection(newActiveIndex > activeIndex ? 1 : -1);
                }
                
                lastInteractionTime.current = Date.now();
              }}
            />
            
            {/* Actual Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
              aria-label="Project carousel slider"
            />
          </div>
          
          <button
            onClick={() => rotateCarousel(1)}
            className={`p-2 rounded-full ${
              isDark 
                ? 'bg-black/80 text-white' 
                : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
            } hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0`}
            aria-label="Next project"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
} 
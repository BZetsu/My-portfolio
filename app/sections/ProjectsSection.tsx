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
}

interface ExplanatoryCardProps {
  project: Project;
}

// Project data with extended information
const projects = [
  {
    id: 1,
    title: 'Interactive 3D Product Showcase',
    description: 'A WebGL-powered 3D product configurator that allows users to customize and interact with products in real-time.',
    longDescription: 'This project leverages Three.js and WebGL to create an immersive product configuration experience. Users can customize colors, materials, and components while seeing changes in real-time. The application includes realistic lighting, shadows, and physically-based rendering for photorealistic results.',
    imageUrl: '/projects/project1.jpg',
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    link: '#',
    color: 'bg-indigo-600',
    features: [
      'Real-time 3D rendering with dynamic lighting',
      'Interactive configuration options',
      'Physically-based materials',
      'Performance optimized for mobile devices'
    ],
    role: 'Lead Developer',
    duration: '3 months'
  },
  {
    id: 2,
    title: 'Immersive Virtual Gallery',
    description: 'A virtual art gallery experience featuring interactive 3D spaces for digital art exhibitions.',
    longDescription: 'An experimental virtual gallery that reimagines how digital art can be displayed and experienced online. Visitors navigate through custom-designed 3D spaces to discover and interact with digital artworks, creating a sense of presence that traditional online galleries lack.',
    imageUrl: '/projects/project2.jpg',
    technologies: ['Spline', 'Next.js', 'Three.js', 'Framer Motion'],
    link: '#',
    color: 'bg-purple-600',
    features: [
      'Spatial audio design',
      'Custom exhibition spaces',
      'Interactive art installations',
      'Multi-user gallery experiences'
    ],
    role: 'Creative Developer',
    duration: '6 months'
  },
  {
    id: 3,
    title: 'Spatial Web Experience',
    description: 'An experimental spatial web interface that reimagines how users navigate and interact with content online.',
    longDescription: 'This experimental project explores new paradigms for web navigation using spatial interfaces. Rather than traditional page-based navigation, content is organized in a three-dimensional space that users can explore. The interface uses gesture controls and spatial audio to create an intuitive and immersive browsing experience.',
    imageUrl: '/projects/project3.jpg',
    technologies: ['WebGL', 'GLSL', 'React Three Fiber', 'TypeScript'],
    link: '#',
    color: 'bg-emerald-600',
    features: [
      'Gesture-based navigation',
      'Spatial audio cues',
      '3D content organization',
      'Custom shader effects'
    ],
    role: 'UX Engineer',
    duration: '4 months'
  },
  {
    id: 4,
    title: 'Augmented Reality Portfolio',
    description: 'A mobile AR application that brings portfolio projects to life through augmented reality interactions.',
    longDescription: 'This mobile AR application transforms a physical portfolio into an interactive showcase. By scanning pages with a smartphone, static designs come to life with 3D models, animations, and interactive elements that demonstrate the functionality and features of each project in an engaging way.',
    imageUrl: '/projects/project4.jpg',
    technologies: ['AR.js', 'Three.js', 'React Native', 'WebXR'],
    link: '#',
    color: 'bg-amber-600',
    features: [
      'Image tracking and recognition',
      '3D model overlays',
      'Interactive AR elements',
      'Cross-platform compatibility'
    ],
    role: 'AR Developer',
    duration: '5 months'
  },
];

// Memoized project card component for better performance
const ProjectCard = memo(({ 
  project, 
  style, 
  isActive, 
  isHovered, 
  onHoverStart, 
  onHoverEnd
}: ProjectCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      className="absolute w-[90%] max-w-xl transform -translate-x-1/2"
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
    >
      <div 
        className={`rounded-2xl ${isDark ? 'bg-black backdrop-blur-sm border border-white/10' : 'bg-white'} shadow-lg overflow-hidden ${
          isActive ? `ring-2 ${isDark ? 'ring-indigo-400/50 box-glow-blue' : 'ring-indigo-500/50'}` : ''
        } ${
          isHovered ? `ring-2 ${isDark ? 'ring-indigo-400 box-glow-blue' : 'ring-indigo-500'}` : ''
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 ${project.color} opacity-90 z-10`}></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <h3 className={`text-white text-xl md:text-2xl font-bold text-center px-4 ${isDark ? 'text-glow' : ''}`}>{project.title}</h3>
          </div>
          {/* Placeholder for project image - Fixed to ensure visibility in dark mode */}
          <div className={`w-full h-full ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
        </div>
        
        <div className="p-6">
          <p className={`${isDark ? 'text-gray-300 text-glow-sm' : 'text-gray-700'} mb-4 line-clamp-3`}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, isActive ? undefined : 2).map((tech: string, idx: number) => (
              <span 
                key={idx}
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isDark ? 'bg-black text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
            {!isActive && project.technologies.length > 2 && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isDark ? 'bg-black text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'
              }`}>
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
          <motion.a
            href={project.link}
            className={`inline-flex items-center ${
              isDark ? 'text-indigo-400 text-glow-indigo hover:text-glow-blue' : 'text-indigo-600'
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
  
  return (
    <div className={`rounded-xl ${
      isDark 
        ? 'bg-black backdrop-blur-sm border border-white/10 box-glow' 
        : 'bg-white border border-gray-200'
    } p-6 md:p-8 shadow-xl max-w-3xl mx-auto`}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white text-glow-sm' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`${isDark ? 'text-gray-300 text-glow-sm' : 'text-gray-700'}`}>{project.description}</p>
        </div>
        
        <div className={`min-w-24 px-3 py-1 text-sm rounded-full ${isDark ? 'bg-black text-indigo-400 border border-indigo-500/30 text-glow-indigo' : 'bg-indigo-50 text-indigo-700'}`}>
          {project.duration}
        </div>
      </div>
      
      <p className={`mb-6 text-justify ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {project.longDescription}
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white text-glow-sm' : 'text-gray-900'}`}>Key Features</h4>
          <ul className={`list-disc pl-5 space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white text-glow-sm' : 'text-gray-900'}`}>Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  isDark ? 'bg-black text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-black border border-white/10' : 'bg-gray-50'}`}>
        <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white text-glow-sm' : 'text-gray-900'}`}>My Role</h4>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.role}</p>
      </div>
      
      <div className="flex justify-end">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-6 py-3 rounded-lg ${
            isDark 
              ? 'bg-indigo-600 text-white text-glow-sm hover:bg-indigo-700' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } transition-all font-medium`}
        >
          View Project
          <svg
            className="ml-2 w-5 h-5"
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
        </a>
      </div>
    </div>
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
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastInteractionTime = useRef(Date.now());
  
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
      const newIndex = (prev + direction + projects.length) % projects.length;
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
      const direction = projectIndex > activeIndex ? 1 : -1;
      setDirection(direction);
      setActiveIndex(projectIndex);
    }
    
    // Update last interaction time
    lastInteractionTime.current = Date.now();
  };
  
  // Hover handlers for project cards
  const handleProjectHover = (index: number) => {
    setHoveredIndex(index);
  };
  
  const handleProjectLeave = () => {
    setHoveredIndex(null);
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
    <section id="projects" className={`py-20 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <motion.h2 
            className={`text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 ${isDark ? 'text-glow-purple' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className={`${isDark ? 'text-gray-300 text-glow-sm' : 'text-gray-700'} max-w-2xl mx-auto`}
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
            className="relative h-[550px] md:h-[650px] overflow-hidden perspective mx-auto select-none w-full"
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
                  />
                );
              })}
            </div>
          </div>
          
          {/* Vertical Slider - In the middle between carousel and explanatory card */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center h-[400px] px-2 opacity-20 hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={() => rotateCarousel(-1)}
              className={`p-2 mb-2 rounded-full ${isDark ? 'bg-black/80 text-white' : 'bg-gray-100/80 text-gray-600'} hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0 backdrop-blur-sm ${isDark ? 'border border-white/10' : ''}`}
              aria-label="Previous project"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-5 h-5 rotate-90"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="relative h-full w-14 flex items-center justify-center">
              {/* Slider Track */}
              <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 ${isDark ? 'bg-gradient-to-t from-gray-900 to-gray-800' : 'bg-gradient-to-t from-gray-200 to-gray-300'} rounded-full`}></div>
              
              {/* Slider Colored Track */}
              <div 
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 ${isDark ? 'bg-gradient-to-t from-indigo-600 to-indigo-500' : 'bg-gradient-to-t from-gray-400 to-gray-500'} rounded-full`}
                style={{ height: `${sliderValue}%` }}
              ></div>
              
              {/* Slider Markers */}
              {projects.map((_, index) => {
                const position = index * (100 / (projects.length - 1));
                return (
                  <button 
                    key={index} 
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all z-10 ${
                      index <= activeIndex ? 'bg-indigo-600' : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-300'
                    }`}
                    style={{ bottom: `${position}%` }}
                    onClick={() => {
                      setActiveIndex(index);
                      setSliderValue(index * (100 / (projects.length - 1)));
                      lastInteractionTime.current = Date.now();
                    }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                );
              })}
              
              {/* Full-height clickable track */}
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  // Get click position relative to the track
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickY = e.clientY - rect.top;
                  const trackHeight = rect.height;
                  
                  // Calculate position as percentage from bottom (0-100)
                  const percentage = 100 - (clickY / trackHeight * 100);
                  setSliderValue(percentage);
                  
                  // Calculate corresponding project index
                  const projectIndex = Math.round(percentage / (100 / (projects.length - 1)));
                  const clampedIndex = Math.max(0, Math.min(projects.length - 1, projectIndex));
                  
                  // Update if different from current
                  if (clampedIndex !== activeIndex) {
                    const direction = clampedIndex > activeIndex ? 1 : -1;
                    setDirection(direction);
                    setActiveIndex(clampedIndex);
                  }
                  
                  lastInteractionTime.current = Date.now();
                }}
              ></div>
              
              {/* Draggable Thumb */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full border-2 border-indigo-600 shadow-md z-20 cursor-grab active:cursor-grabbing"
                style={{ bottom: `calc(${sliderValue}% - 14px)` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={(event, info: PanInfo) => {
                  const element = event.currentTarget as HTMLElement;
                  if (!element.parentElement) return;
                  
                  const track = element.parentElement;
                  const trackRect = track.getBoundingClientRect();
                  const thumbY = info.point.y - trackRect.top;
                  
                  // Calculate percentage (0 to 1)
                  const percentage = Math.min(Math.max(thumbY / trackRect.height, 0), 1);
                  
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
              
              {/* We'll use a custom implementation instead of the rotated input which might be causing issues */}
              <div 
                className="absolute inset-0 cursor-pointer z-30 slider-track"
                onClick={(e) => {
                  if (!e.currentTarget) return;
                  
                  // Get the click position relative to the slider height
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickY = e.clientY - rect.top;
                  const sliderHeight = rect.height;
                  
                  // Convert to percentage (inverted since 0% is at the bottom)
                  const newValue = 100 - (clickY / sliderHeight * 100);
                  setSliderValue(newValue);
                  
                  // Calculate the corresponding project index
                  const projectIndex = Math.round(newValue / (100 / (projects.length - 1)));
                  setActiveIndex(projectIndex);
                  
                  // Update last interaction time
                  lastInteractionTime.current = Date.now();
                }}
              ></div>
            </div>
            
            <button
              onClick={() => rotateCarousel(1)}
              className={`p-2 mt-2 rounded-full ${isDark ? 'bg-black/80 text-white' : 'bg-gray-100/80 text-gray-600'} hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0 backdrop-blur-sm ${isDark ? 'border border-white/10' : ''}`}
              aria-label="Next project"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-5 h-5 rotate-90"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Horizontal Slider (only visible on mobile) */}
          <div className="md:hidden max-w-xl mx-auto mb-8 w-full px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => rotateCarousel(-1)}
                className={`p-2 rounded-full ${isDark ? 'bg-black/80 text-white' : 'bg-indigo-50 text-indigo-600'} hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0 ${isDark ? 'border border-white/10' : ''}`}
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
                <div className={`absolute inset-0 my-auto h-1 ${isDark ? 'bg-black' : 'bg-gray-200'} rounded-full`}></div>
                
                {/* Slider Colored Track */}
                <div 
                  className="absolute left-0 my-auto h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${sliderValue}%` }}
                ></div>
                
                {/* Slider Markers */}
                {projects.map((_, index) => {
                  const position = index * (100 / (projects.length - 1));
                  return (
                    <div 
                      key={index} 
                      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all z-10 ${
                        index <= activeIndex ? 'bg-indigo-600' : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-300'
                      }`}
                      style={{ left: `${position}%` }}
                    />
                  );
                })}
                
                {/* Draggable Thumb for mobile */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-2 border-indigo-600 shadow-md z-20 cursor-grab active:cursor-grabbing"
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
                className={`p-2 rounded-full ${isDark ? 'bg-black/80 text-white' : 'bg-indigo-50 text-indigo-600'} hover:bg-indigo-100 hover:text-indigo-600 transition-all flex-shrink-0 ${isDark ? 'border border-white/10' : ''}`}
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
          
          {/* Explanatory Project Card (RIGHT Side) */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div 
                className="absolute top-1/2 right-0 w-full md:w-1/3 p-5 z-30 pointer-events-none transform -translate-y-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {hoveredIndex !== null && <ExplanatoryCard project={projects[hoveredIndex]} />}
              </motion.div>
            )}
          </AnimatePresence>
          
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
        
        {/* Add a subtle glow to the projects section background in dark mode */}
        {isDark && (
          <div className="absolute inset-0 bg-black box-glow pointer-events-none"></div>
        )}
      </div>
    </section>
  );
} 
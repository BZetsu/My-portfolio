'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft } from 'react-icons/fi';
import { SiBlender, SiUnrealengine, SiAdobephotoshop, SiAdobeaftereffects, SiAdobepremierepro } from 'react-icons/si';
import dynamic from 'next/dynamic';
import { useTheme } from '../../context/ThemeContext';

// Use dynamic import for SplineWrapper with fallback
const SplineWrapper = dynamic(
  () => import('../../components/SplineWrapper').catch(() => import('../../components/SplineFallback')),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading 3D scene...</div>
      </div>
    )
  }
);

// Custom component for animated images with parallax and 3D effects
const ParallaxImage = ({ src, alt, className = "", index = 0, floating = false, rotating = false }: { src: string; alt: string; className?: string; index?: number; floating?: boolean; rotating?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // For mobile devices, reduce the intensity of animations
  const isMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false).current;
  
  // Use fixed values instead of dynamic calculations to avoid hydration mismatches
  const baseTransform = { 
    y: useTransform(scrollYProgress, [0, 1], [0, -20]),
    rotateY: useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1]), 
    rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0, -0.5]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]),
    filter: useTransform(scrollYProgress, [0, 0.5, 1], ['brightness(0.8)', 'brightness(1)', 'brightness(0.8)']),
  };

  // Create different hover animations based on the image index
  const getHoverAnimation = () => {
    // Simpler animations for mobile
    if (isMobile) {
      return {
        scale: 1.03,
        filter: 'brightness(1.1)',
        transition: { duration: 0.3 }
      };
    }
    
    // Every 5th image gets a special 3D rotation effect (Nexcrow style)
    if (index % 5 === 0) {
      return {
        scale: 1.08,
        rotateY: 15,
        rotateX: -5,
        filter: 'brightness(1.2)',
        boxShadow: "0 30px 60px rgba(76, 29, 149, 0.6)",
        transition: { 
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1]  // Custom easing for smoother motion
        }
      };
    }
    
    // Every 4th image gets a zoom effect
    if (index % 4 === 0) {
      return {
        scale: 1.1,
        rotateY: 0,
        filter: 'brightness(1.15) contrast(1.1)',
        transition: { duration: 0.5 }
      };
    }
    
    // Default hover effect
    return {
      scale: 1.05,
      rotateY: 0,
      filter: 'brightness(1.1)',
      transition: { duration: 0.4 }
    };
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div 
        className="relative rounded-xl overflow-hidden bg-black shadow-2xl"
        style={{
          y: baseTransform.y,
          rotateY: baseTransform.rotateY,
          rotateX: baseTransform.rotateX,
          scale: baseTransform.scale,
          opacity: baseTransform.opacity,
          filter: baseTransform.filter,
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"
        }}
        animate={
          !isMobile && rotating ? {
            rotateY: [0, 3, 0, -3, 0],
            rotateX: [0, 1, 0, -1, 0],
            scale: [1, 1.01, 1, 1.01, 1],
            filter: ['brightness(1)', 'brightness(1.03)', 'brightness(1)', 'brightness(1.03)', 'brightness(1)']
          } : !isMobile && floating ? {
            y: ['-3%', '3%'],
            rotateZ: ['-0.5deg', '0.5deg'],
          } : undefined
        }
        transition={
          rotating ? {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          } : floating ? {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          } : undefined
        }
        whileHover={getHoverAnimation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="object-cover w-full h-full"
        />
        
        {/* Add a subtle glow effect on hover for certain images */}
        {index % 3 === 0 && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-transparent to-indigo-500/0 mix-blend-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Custom component for tech stack items
const TechStack = ({ icon: Icon, name }: { icon: any; name: string }) => (
  <div className="flex items-center gap-2 text-gray-300 bg-purple-900/30 px-3 py-2 rounded-lg border border-purple-700/40">
    <Icon className="w-5 h-5 text-purple-400" />
    <span className="text-sm font-medium">{name}</span>
  </div>
);

// Animated phase section component
const PhaseSection = ({ title, description, imageUrls, index }: { title: string; description: string; imageUrls: string[]; index: number }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <motion.div 
      className="mb-16 sm:mb-24 md:mb-40"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative z-10`}>
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 bg-white/80 sm:bg-transparent p-3 sm:p-0 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Phase {index + 1}: {title}
          </motion.h3>
          <motion.div 
            className="text-sm sm:text-base md:text-lg text-black leading-relaxed space-y-4 bg-white/80 sm:bg-transparent p-3 sm:p-0 rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        {/* Better grid for mobile */}
        <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mt-8 sm:mt-6 lg:mt-0`}>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {imageUrls.map((url, imgIndex) => (
            <ParallaxImage 
              key={imgIndex}
              src={url} 
              alt={`Space Monk - Phase ${index + 1} - Image ${imgIndex + 1}`}
                className={`${imgIndex === 0 ? "col-span-2" : ""} min-h-[180px] sm:min-h-[220px] h-auto`}
              index={imgIndex + index}
              floating={imgIndex === 0 && !isMobile}
              rotating={imgIndex === 1 && !isMobile}
            />
          ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CreationByObsessionCaseStudy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // STEP 1: Create a master list of all unique available images
  const allUniqueImages = [
    // Contemplation images - Group 1
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_97e7f62a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_b3a33378.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_3dd48d70.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_17de8739.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_25b9a180.jpg',
    
    // Movement images - Group 2
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_a3af147d.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_59dfcee4.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_84ca4c4a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_29aa0415.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_88f1b050.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_99825900.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_616065db.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_c74d7958.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_c22598a9.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_2785ed96.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_fc231867.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_d14521c4.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_9928e667.jpg',
    
    // Creation tools images - Group 3
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.01_dc9d4940.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.00_d1143bbf.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.16_df403158.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.09_92735b77.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.11_57aa64b2.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.04_403eee64.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.05_d75e568f.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.07_4a5fb9dd.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.15_b831e11e.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.13_79b5543f.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.14_754937fe.jpg',
    
    // Transformation images - Group 4
    '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_b4f61367.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_f8444486.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_72f8a44e.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_62986eb5.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_8030be67.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_9656b75a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.57_5b089301.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.15_873bcc98.jpg',
    
    // Additional journey images - Group 5
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.34_6316bf0a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.34_63365279.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.33_55ddf517.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.32_40b8d9e0.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.31_d00959f1.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.30_f6207d3b.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.31_054043f8.jpg',
    
    // Extra images - Group 6
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.56_9049c102.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.52_d52026d9.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.52_dfa33126.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.53_2b568cf0.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.53_68d6caa8.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.55_ff5b5e22.jpg',
  ];
  
  // STEP 2: Create a tracker to ensure no image is used twice
  const usedImages = new Set<string>();
  
  // STEP 3: Create an image allocation function
  const allocateImages = (count: number, preferredGroup?: number): string[] => {
    // Try to get images from the preferred group first
    let candidates = [...allUniqueImages];
    
    // Prioritize images from the preferred group if specified
    if (preferredGroup !== undefined) {
      const startIdx = preferredGroup * 10; // Approximate group size
      const endIdx = Math.min(startIdx + 15, allUniqueImages.length);
      // Move preferred group to the front of candidates
      candidates = [
        ...allUniqueImages.slice(startIdx, endIdx),
        ...allUniqueImages.slice(0, startIdx),
        ...allUniqueImages.slice(endIdx)
      ];
    }
    
    // Filter out already used images
    candidates = candidates.filter(img => !usedImages.has(img));
    
    // Take the requested number of images
    const result = candidates.slice(0, count);
    
    // Mark these as used
    result.forEach(img => usedImages.add(img));
    
    return result;
  };
  
  // STEP 4: Allocate images to each section
  
  // Hero section
  const heroImages = {
    main: allocateImages(1, 0)[0],
    side1: allocateImages(1, 1)[0],
    side2: allocateImages(1, 2)[0]
  };
  
  // Phase images - allocate from appropriate groups
  const phaseImages = {
    phase1: allocateImages(3, 0), // Contemplation
    phase2: allocateImages(3, 1), // Movement
    phase3: allocateImages(3, 2), // Creation
    phase4: allocateImages(2, 3)  // Transformation
  };
  
  // Additional explorations
  const additionalImages = allocateImages(6, 3); // Prefer transformation images
  
  // Gallery images - use all remaining unique images
  const galleryImages = allocateImages(allUniqueImages.length); // This will use all remaining images
  
  // Phase descriptions
  const phases = [
    {
      title: "The Doubt",
      description: `
        <p>Alone in the dark, the Monk questions his own presence.</p> 
        <p>Each star a memory. Each silence a mirror.</p>
        <p>Doubt is his first companion. He wonders if the path was ever real — or if he invented it to avoid the fall.</p>
        <p>But even in stillness, he listens. The void is not empty. It speaks — in fragments, in feelings, in frequencies older than time.</p>
      `,
      images: phaseImages.phase1
    },
    {
      title: "The Search",
      description: `
        <p>He begins to move. Not forward, but inward.</p>
        <p>Across ruins of forgotten systems, echoes of past selves, broken orbits.</p>
        <p>He watches, studies, breaks, and rebuilds. With every cycle, he lets go of what he thought he was.</p>
        <p>His form flickers. His essence shifts. He becomes less solid — more spirit.</p>
      `,
      images: phaseImages.phase2
    },
    {
      title: "The Obsession",
      description: `
        <p>Then he finds it — the pulse.</p>
        <p>A hidden rhythm beneath chaos. Not a destination, but a frequency of becoming.</p>
        <p>It consumes him. He dives in. Repeats rituals. Experiments. Destroys. Rebuilds.</p>
        <p>He disappears into the process. He forgets who he was. But he never stops.</p>
      `,
      images: phaseImages.phase3
    },
    {
      title: "The Becoming",
      description: `
        <p>The Monk does not transcend. He does not escape. He returns — changed.</p>
        <p>There is no final form. Only awareness.</p>
        <p>He walks the same path — but now he feels it breathing under his feet.</p>
        <p>He no longer fears the void. He has become part of it.</p>
      `,
      images: phaseImages.phase4
    }
  ];

  return (
    <div className={`relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 border-b border-purple-900/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            {/* Name */}
            <div className="font-mono text-lg tracking-wider uppercase font-bold text-purple-300" style={{ fontFamily: "'Space Mono', 'Roboto Mono', monospace", letterSpacing: '0.15em' }}>
              JAMES
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero with Spline 3D Background */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          {/* Particle Nebula Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/Space Monk/Particle Nebula@1-1920x869 (1).png"
              alt="Particle Nebula Background"
              fill
              style={{objectFit: 'cover'}}
              priority
            />
            {/* Add overlay to improve text contrast */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          </div>
          
          {/* Text glow effects behind text to prevent overlap with background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-full max-w-4xl h-full flex items-center justify-center">
              <div className="absolute w-full h-3/4 rounded-full bg-purple-800/20 blur-[150px] opacity-60"></div>
            </div>
          </div>
          
          <div className="container mx-4 sm:px-6 py-24 relative z-20">
            <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
              <motion.p 
                className="text-purple-300 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                VISUAL NARRATIVE CASE STUDY
              </motion.p>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Creation by Obsession
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl text-purple-200 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                A visual narrative of evolution and surrender
              </motion.p>
              <motion.p
                className="text-base sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto italic leading-relaxed bg-black/50 px-4 sm:px-6 py-4 rounded-lg backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                In the beginning, there was stillness.<br/>
                Then came a whisper — a pulse — a call from the void.<br/>
                He heard it.
              </motion.p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="col-span-1 md:col-span-2 h-[280px] sm:h-[400px] md:h-[500px]">
              <ParallaxImage
                    src={heroImages.main}
                alt="Space Monk - Contemplation"
                    className="h-full"
                index={0}
                rotating={true}
              />
                </div>
                <div className="flex flex-row md:flex-col gap-4 sm:gap-6">
                  <div className="h-[280px] w-1/2 md:w-auto md:h-[240px]">
                <ParallaxImage
                      src={heroImages.side1}
                  alt="Space Monk - Searching"
                      className="h-full"
                  index={1}
                  floating={true}
                />
                  </div>
                  <div className="h-[280px] w-1/2 md:w-auto md:h-[240px]">
                <ParallaxImage
                      src={heroImages.side2}
                  alt="Space Monk - Creating"
                      className="h-full"
                  index={2}
                  floating={true}
                />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 sm:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 z-0"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                className="text-base sm:text-xl text-gray-700 space-y-4 sm:space-y-6 leading-relaxed text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p>
                  He was not born to conquer galaxies or wield power.
                  He was born to feel — to listen — to drift through the fabric of existence, seeking nothing but truth.
                </p>
                <p>
                  This is a story of a monk who does not fight, but dissolves.
                  Who does not arrive, but becomes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content - The Four Phases */}
        <section className="py-20 sm:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 sm:mb-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                The Journey
              </motion.h2>

              {phases.map((phase, index) => (
                <PhaseSection 
                  key={index}
                  title={phase.title}
                  description={phase.description}
                  imageUrls={phase.images}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Additional Images Section */}
        <section className="py-16 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
          {/* Add overlay to improve text contrast */}
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Additional Explorations
            </motion.h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 mb-12 sm:mb-20">
              {additionalImages.map((image, index) => (
                <div key={index} className="h-[180px] sm:h-[250px] md:h-[300px]">
                <ParallaxImage
                  src={image}
                  alt={`Space Monk Additional Exploration ${index + 1}`}
                    className="h-full"
                  index={index}
                  floating={true}
                />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Now with guaranteed unique images */}
        <section className="py-20 sm:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Gallery
            </motion.h2>
            
            {/* Responsive grid gallery with all unique images */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="mb-3 sm:mb-6">
                  <div className="h-[160px] sm:h-[180px] md:h-[220px] xl:h-[240px]">
                  <ParallaxImage
                    src={image}
                    alt={`Space Monk Gallery Image ${index + 1}`}
                      className="w-full h-full"
                    index={index}
                    floating={index % 3 === 0}
                    rotating={index % 4 === 1}
                  />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Reflection */}
        <section className="py-20 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
          
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-purple-800/10 blur-[100px] opacity-40"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-900/10 blur-[150px] opacity-30 animate-pulse-slow"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Creation by Obsession
              </motion.h2>
              
              <motion.div 
                className="text-base sm:text-xl text-gray-300 mb-12 sm:mb-16 space-y-4 sm:space-y-6 leading-relaxed text-center italic backdrop-blur-sm bg-black/30 p-4 sm:p-8 rounded-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p>
                  A story told in matter, motion, and meditation.<br/>
                  Rendered through space, silence, and sound.<br/>
                  An exploration of identity, surrender, and evolution.
                </p>
                <p>
                  Not a tale of victory —<br/>
                  but of transformation through obsession.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-purple-700 hover:bg-purple-600 text-white font-medium transition-colors shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40"
                >
                  Back to Projects
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Add CSS for animation effects */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 
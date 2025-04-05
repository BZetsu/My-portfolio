'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft } from 'react-icons/fi';
import { SiBlender, SiUnrealengine, SiAdobephotoshop, SiAdobeaftereffects, SiAdobepremierepro } from 'react-icons/si';
import Spline from '@splinetool/react-spline/next';

// Custom component for animated images with parallax and 3D effects
const ParallaxImage = ({ src, alt, className = "", index = 0, floating = false, rotating = false }: { src: string; alt: string; className?: string; index?: number; floating?: boolean; rotating?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create different effects for each image based on its index
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 + (index % 3) * 10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5 - (index % 2) * 10, 0, 5 + (index % 2) * 10]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2 + (index % 3), 0, -2 - (index % 3)]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ['brightness(0.8)', 'brightness(1)', 'brightness(0.8)']);

  // Create different hover animations based on the image index
  const getHoverAnimation = () => {
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
          y,
          rotateY,
          rotateX,
          scale,
          opacity,
          filter,
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"
        }}
        animate={
          rotating ? {
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, 3, 0, -3, 0],
            scale: [1, 1.02, 1, 1.02, 1],
            filter: ['brightness(1)', 'brightness(1.05)', 'brightness(1)', 'brightness(1.05)', 'brightness(1)']
          } : floating ? {
            y: ['-5%', '5%'],
            rotateZ: ['-1deg', '1deg'],
          } : undefined
        }
        transition={
          rotating ? {
            duration: 8 + (index % 4),
            repeat: Infinity,
            ease: "easeInOut"
          } : floating ? {
            duration: 4 + (index % 4),
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
  return (
    <motion.div 
      className="mb-40"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative z-10`}>
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-black mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Phase {index + 1}: {title}
          </motion.h3>
          <motion.div 
            className="text-base sm:text-lg text-black leading-relaxed space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto sm:h-[550px] mt-8 lg:mt-0`}>
          {imageUrls.map((url, imgIndex) => (
            <ParallaxImage 
              key={imgIndex}
              src={url} 
              alt={`Space Monk - Phase ${index + 1} - Image ${imgIndex + 1}`}
              className={imgIndex === 0 ? "col-span-1 sm:col-span-2" : ""}
              index={imgIndex + index}
              floating={imgIndex === 0}
              rotating={imgIndex === 1}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function CreationByObsessionCaseStudy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Images for each phase
  const phaseImages = {
    phase1: [
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_97e7f62a.jpg', // Contemplative pose
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_b3a33378.jpg', // Looking up/thinking
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_3dd48d70.jpg', // Focused inward
    ],
    phase2: [
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_a3af147d.jpg', // Beginning to move
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_59dfcee4.jpg', // Examining ruins
      '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_84ca4c4a.jpg', // Form flickering
    ],
    phase3: [
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.01_dc9d4940.jpg', // With hammer (obsession)
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.00_d1143bbf.jpg', // Working with tools
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.16_df403158.jpg', // Creation process
    ],
    phase4: [
      '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_b4f61367.jpg', // Transformation
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_62986eb5.jpg', // Changed form
    ],
    additional: [
      '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_f8444486.jpg',
      '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_72f8a44e.jpg',
      '/Space Monk/WhatsApp Image 2025-04-05 at 18.17.16_96c3256b.jpg', // Added from phase3
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.15_b831e11e.jpg', // Added from phase3
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.13_79b5543f.jpg',
      '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.14_754937fe.jpg'
    ]
  };
  
  // Gallery images (additional images not used in phases)
  const galleryImages = [
    // Contemplation and early journey images
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.34_6316bf0a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.34_63365279.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.33_55ddf517.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.32_40b8d9e0.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.31_d00959f1.jpg',
    
    // Searching and movement images
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_29aa0415.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_88f1b050.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_99825900.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_616065db.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.39_c74d7958.jpg',
    
    // Creation and building with tools
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.09_92735b77.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.11_57aa64b2.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.04_403eee64.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.05_d75e568f.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.07_4a5fb9dd.jpg',
    
    // Transformation and becoming images
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_8030be67.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.18_9656b75a.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.57_5b089301.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.02.15_873bcc98.jpg',
    
    // Additional complementary images
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.56_9049c102.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.52_d52026d9.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.52_dfa33126.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.53_2b568cf0.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.53_68d6caa8.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 15.01.55_ff5b5e22.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.38_c22598a9.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_2785ed96.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_fc231867.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.36_d14521c4.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_9928e667.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.30_f6207d3b.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.31_054043f8.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_17de8739.jpg',
    '/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_25b9a180.jpg'
  ];
  
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
    <div className="relative bg-gray-950 text-white">
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
          </div>
          
          {/* Text glow effects behind text to prevent overlap with background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-full max-w-4xl h-full flex items-center justify-center">
              <div className="absolute w-full h-3/4 rounded-full bg-purple-800/20 blur-[150px] opacity-60"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 py-24 relative z-20">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <motion.p 
                className="text-purple-300 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                VISUAL NARRATIVE CASE STUDY
              </motion.p>
              <motion.h1 
                className="text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Creation by Obsession
              </motion.h1>
              <motion.p 
                className="text-2xl text-purple-200 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                A visual narrative of evolution and surrender
              </motion.p>
              <motion.p
                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto italic leading-relaxed bg-black/50 px-6 py-4 rounded-lg backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                In the beginning, there was stillness.<br/>
                Then came a whisper — a pulse — a call from the void.<br/>
                The Primordial Space Monk heard it.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <TechStack icon={SiBlender} name="3D Modeling" />
                <TechStack icon={SiUnrealengine} name="Unreal Engine" />
                <TechStack icon={SiAdobephotoshop} name="Photoshop" />
                <TechStack icon={SiAdobeaftereffects} name="After Effects" />
                <TechStack icon={SiAdobepremierepro} name="Premiere Pro" />
              </motion.div>
            </div>

            <div className="relative h-[600px] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <ParallaxImage
                src={'/Space Monk/WhatsApp Image 2025-04-05 at 14.58.35_97e7f62a.jpg'}
                alt="Space Monk - Contemplation"
                className="col-span-1 md:col-span-2 h-full"
                index={0}
                rotating={true}
              />
              <div className="flex flex-col gap-6">
                <ParallaxImage
                  src={'/Space Monk/WhatsApp Image 2025-04-05 at 14.58.37_a3af147d.jpg'}
                  alt="Space Monk - Searching"
                  className="h-1/2"
                  index={1}
                  floating={true}
                />
                <ParallaxImage
                  src={'/Space Monk/WhatsApp Image 2025-04-05 at 15.02.01_dc9d4940.jpg'}
                  alt="Space Monk - Creating"
                  className="h-1/2"
                  index={2}
                  floating={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                The Primordial Space Monk
              </motion.h2>
              <motion.div
                className="text-xl text-gray-700 space-y-6 leading-relaxed text-center"
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
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-20 text-center"
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
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.h3
              className="text-3xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Additional Explorations
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {phaseImages.additional.map((image, index) => (
                <ParallaxImage
                  key={index}
                  src={image}
                  alt={`Space Monk Additional Exploration ${index + 1}`}
                  className="h-[350px]"
                  index={index}
                  floating={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section Update - Apply rotating to certain images */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.h2 
              className="text-4xl font-bold text-white mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Gallery
            </motion.h2>
            
            {/* Masonry-style gallery with improved layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="break-inside-avoid mb-6">
                  <ParallaxImage
                    src={image}
                    alt={`Space Monk Gallery Image ${index + 1}`}
                    className="w-full h-auto"
                    index={index}
                    floating={index % 3 === 0}
                    rotating={index % 4 === 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Reflection */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
          
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-purple-800/10 blur-[100px] opacity-40"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-900/10 blur-[150px] opacity-30 animate-pulse-slow"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-4xl font-bold text-white mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Creation by Obsession
              </motion.h2>
              
              <motion.div 
                className="text-xl text-gray-300 mb-16 space-y-6 leading-relaxed text-center italic backdrop-blur-sm bg-black/30 p-8 rounded-xl"
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
                  className="inline-flex items-center px-8 py-4 rounded-full bg-purple-700 hover:bg-purple-600 text-white font-medium transition-colors shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40"
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
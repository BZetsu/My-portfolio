'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { SiReact, SiTypescript, SiSolidity, SiNextdotjs } from 'react-icons/si';

const ProjectMockup = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 0, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100]);

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
        className="relative rounded-xl overflow-hidden bg-white"
        style={{
          y,
          rotateY,
          scale,
          z,
          boxShadow: "0 50px 100px rgba(0, 0, 0, 0.1)"
        }}
        whileHover={{
          scale: 1.05,
          rotateY: 0,
          z: 50,
          transition: { duration: 0.4 }
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="object-contain w-full h-full bg-white"
        />
      </motion.div>
    </motion.div>
  );
};

const TechStack = ({ icon: Icon, name }: { icon: any; name: string }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{name}</span>
  </div>
);

export default function NexusCaseStudy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative bg-gray-50">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            {/* Robot-style name */}
            <div className="font-mono text-lg tracking-wider uppercase font-bold" style={{ fontFamily: "'Space Mono', 'Roboto Mono', monospace", letterSpacing: '0.15em' }}>
              JAMES
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
          
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.p 
                className="text-blue-600 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                FEATURED PROJECT CASE STUDY
              </motion.p>
              <motion.h1 
                className="text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Nexcrow by Nexus
              </motion.h1>
              <motion.p 
                className="text-2xl text-gray-600 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Building a Solana-backed escrow platform that ensures secure payments for freelancers and Web3 businesses
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <TechStack icon={SiReact} name="React" />
                <TechStack icon={SiTypescript} name="TypeScript" />
                <TechStack icon={SiSolidity} name="Solana" />
                <TechStack icon={SiNextdotjs} name="Next.js" />
              </motion.div>
            </div>

            <div className="relative h-[600px] max-w-5xl mx-auto">
              <ProjectMockup
                src="/images/nexus-dashboard.jpg"
                alt="Nexus Dashboard"
                className="absolute inset-0"
              />
            </div>
          </div>
        </section>

        {/* Project Context */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  The Challenge We Solved
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  In the rapidly growing Web3 space, we identified a critical problem: 
                  freelancers and businesses lacked a secure, transparent, and reliable payment system 
                  designed specifically for their unique needs.
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold">The Problem:</span>
                    Freelancers were getting scammed, and clients received subpar work with no recourse
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold">My Role:</span>
                    CEO and Lead Designer overseeing platform development and strategic direction
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold">Launch:</span>
                    Officially launched March 2025 with support from Solana Foundation and Superteam NG
                  </li>
                </ul>
              </div>
              <div className="relative h-[600px]">
                <ProjectMockup
                  src="/images/nexcrow-ui-mockup.png"
                  alt="Nexcrow UI"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Development Journey - New Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Key Features & Innovations
              </h2>
              <div className="space-y-16">
                {/* Feature 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      1. Nexcrow Blinks (Blockchain Links)
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We created a revolutionary approach to contract creation and sharing through unique blockchain links.
                      This innovation allows freelancers and clients to engage with contracts directly from Twitter DMs,
                      providing unprecedented access for social-first Web3 communities.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        • Seamless contract creation through social platforms
                      </li>
                      <li className="flex items-start gap-2">
                        • Instant sharing via Twitter DMs
                      </li>
                      <li className="flex items-start gap-2">
                        • Reduced onboarding friction for new users
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Dramatically simplified the contract creation process</li>
                      <li>• Increased platform adoption in Web3 social communities</li>
                      <li>• Reduced contract setup time from hours to minutes</li>
                    </ul>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      2. Direct Contracts
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We developed a contract Linktree system for freelancers to create and share their services
                      with minimal friction. This innovation streamlines the contract creation and sharing process,
                      allowing freelancers to quickly establish professional relationships.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        • Custom contract creation templates
                      </li>
                      <li className="flex items-start gap-2">
                        • Shareable contract links for instant client onboarding
                      </li>
                      <li className="flex items-start gap-2">
                        • Automated payment milestone tracking
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Quick setup for recurring service offerings</li>
                      <li>• Professional presentation of freelancer services</li>
                      <li>• Streamlined client acquisition process</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Deep Dive - Enhanced */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative h-[700px] order-2 lg:order-1">
                <ProjectMockup
                  src="/images/nexcrow-escrow.jpg"
                  alt="Escrow System"
                  className="absolute inset-0"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Advanced Features
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Nexcrow goes beyond basic escrow functionality with innovative features
                  designed to create the most secure and transparent freelancing experience on Web3.
                </p>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      AI-Driven Dispute Resolution
                    </h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="font-semibold">Fair & Automated:</span>
                        Our AI system ensures transparent conflict resolution between clients and freelancers
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-semibold">Evidence-Based:</span>
                        Disputes are resolved through objective analysis of contract terms and deliverables
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Blockchain Transparency & Records
                    </h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="font-semibold">Immutable Transactions:</span>
                        Every transaction is verifiable and permanently recorded on Solana
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-semibold">Quality Control:</span>
                        Automated checks and balances prevent under-delivery or non-payment issues
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages - New Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                Competitive Advantages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Payment Security
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Nexcrow eliminates the risk of unpaid work or under-delivered services.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-semibold">Our Solution:</p>
                    <ul className="list-disc pl-4 text-gray-600 space-y-1">
                      <li>Guaranteed payment security through escrow</li>
                      <li>Milestone-based releases protect both parties</li>
                      <li>Clear contract terms with transparent conditions</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Social Platform Integration
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Seamless Web3 onboarding through existing social media channels.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-semibold">Our Innovation:</p>
                    <ul className="list-disc pl-4 text-gray-600 space-y-1">
                      <li>Twitter-based contract creation and sharing</li>
                      <li>Leveraging existing social networks for rapid adoption</li>
                      <li>Reduced friction for Web3 newcomers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Reflection - existing section with minor enhancements */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Future Vision
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Our vision for Nexcrow extends beyond just secure payments. We're building a comprehensive
                ecosystem of tools to facilitate trust and efficiency in the freelance economy, with a particular
                focus on Web3 communities and their unique needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Expanding Features</h3>
                  <p className="text-gray-600">
                    Building more integrated tools for seamless freelancer-client collaboration
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Community Growth</h3>
                  <p className="text-gray-600">
                    Creating dedicated solutions for Web3 communities and DAOs
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Technology Innovation</h3>
                  <p className="text-gray-600">
                    Advancing our AI systems for even more transparent dispute resolution
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  href="https://github.com"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  <span>View on GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        /* Change cursor trail to black */
        .cursor-pulse {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Add robot font support */
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
      `}</style>
    </div>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

// Skill categories with corresponding skills
const skillCategories = [
  {
    name: '3D Development',
    skills: ['Three.js', 'WebGL', 'GLSL', 'Spline', 'Blender', 'React Three Fiber', '3D Modeling', 'Texture Mapping', 'Animation Rigging'],
    color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Responsive Design', 'Web Accessibility'],
    color: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Creative Coding',
    skills: ['p5.js', 'WebGL Shaders', 'Canvas API', 'SVG Animation', 'Generative Art', 'Particle Systems', 'Procedural Generation', 'Interactive Installations'],
    color: 'bg-gradient-to-r from-amber-500 to-rose-500',
  },
  {
    name: 'Tools & Software',
    skills: ['Figma', 'Canva', 'VS Code', 'Cursor', 'Spline', 'ZBrush', 'Adobe AfterEffect', 'Microsoft Clipchamp', 'Framer', 'Chat GPT', 'Git', 'GitHub'],
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  {
    name: 'Motion & Animation',
    skills: ['Keyframe Animation', 'Motion Design', '3D Animation', 'Character Animation', 'Visual Effects', 'Storyboarding', 'Video Editing'],
    color: 'bg-gradient-to-r from-red-500 to-orange-500',
  },
  {
    name: 'Development Practices',
    skills: ['Responsive Design', 'Performance Optimization', 'Cross-Browser Compatibility', 'Version Control', 'CI/CD', 'Agile Methodology'],
    color: 'bg-gradient-to-r from-teal-500 to-emerald-400',
  },
];

// Key highlights
const keyHighlights = [
  {
    icon: '🚀',
    title: 'Nexcrow on Solana Mainnet',
    description: 'Launched in 2025 — processing secure escrow payments for freelancers & clients'
  },
  {
    icon: '🧠',
    title: 'Nexcrow Blinks & Direct Contracts',
    description: 'Created Twitter-based contracts and direct contracts for seamless onboarding'
  },
  {
    icon: '🛠️',
    title: 'Aptos Grant DAO S3 Winner',
    description: 'Led team to win with AI-powered NFT marketplace BoneCLOB'
  },
  {
    icon: '🎯',
    title: 'Solana Hackathon Participant',
    description: 'Participated in top Solana hackathons: Colosseum Renaissance, Colosseum Radar, and Solana Hyperdrive'
  },
  {
    icon: '💼',
    title: 'Previous Web3 Leadership',
    description: 'Led design & community for projects like Mean Finance, Oak Paradise, and Arcane Valley (raised $60K+)'
  },
  {
    icon: '🧩',
    title: 'Ecosystem Recognition',
    description: 'Recognized builder backed by Solana Foundation and Superteam NG'
  }
];

// Hobbies with icons
const hobbies = [
  { name: 'Coding', icon: '💻' },
  { name: 'Learning', icon: '📚' },
  { name: 'Making Art', icon: '🎨' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Working Out', icon: '💪' },
];

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className={`py-20 md:py-32 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-6">
              <div className="w-72 h-48 relative rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/enhanced_WhatsApp_human_crisp_clear.jpg" 
                  alt="James" 
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <div className="w-72 h-48 relative rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="/WhatsApp Image 2025-04-05 at 17.23.29_74ad90d0.jpg" 
                  alt="James" 
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Full-Stack Developer & Entrepreneur
                </h3>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Certified and skilled across both technical and non-technical domains, I blend product design, 
                  full-stack engineering, AI, and automation with project management, HR, and business development.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Hobbies
              </h4>
              <div className="flex flex-wrap gap-3">
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
                    } shadow-sm`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-lg">{hobby.icon}</span>
                    <span>{hobby.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                I take ideas from concept to market — using the right tools, the right people, and the right network 
                to turn ideas into real products that solve real problems.
              </p>
              
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                I've worked across a range of roles — from leading design at Mean Finance, to managing communities and 
                raising funds at Oak Paradise and Arcane Valley. I've built products that never launched, like BoneCLOB 
                (an AI-powered NFT marketplace that still got us the Aptos Grant DAO win), and ones that are now live, 
                like Nexcrow — a Solana-based escrow platform under Nexus Protocol.
              </p>
              
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                After getting rugged by some of the same projects I helped grow, I knew it was time to build my own. 
                That decision has led to me being recognized as a builder in the Solana ecosystem, backed by 
                Superteam NG and the Solana Foundation.
                <span className="block mt-4 italic">Still learning. Still building. Always keeping an open mind.</span>
              </p>
            </div>
          </motion.div>
          
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.name}>
                <div className={`h-1 w-20 mb-3 rounded-full ${category.color}`}></div>
                <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1 ${isDark ? 'bg-black text-gray-200' : 'bg-gray-100 text-gray-800'} rounded-full text-sm`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.4 + (categoryIndex * 0.1) + (skillIndex * 0.05),
                        type: 'spring',
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: isDark 
                          ? 'rgba(139, 92, 246, 0.2)' 
                          : 'rgba(99, 102, 241, 0.1)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Key Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24"
        >
          <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Key Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className={`p-6 rounded-xl ${
                  isDark 
                    ? 'bg-gray-900/60 border border-gray-800' 
                    : 'bg-white border border-gray-200 shadow-md'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: isDark 
                    ? '0 15px 30px rgba(0,0,0,0.4)' 
                    : '0 15px 30px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {highlight.title}
                </h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
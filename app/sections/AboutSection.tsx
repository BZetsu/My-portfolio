'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Skill categories with corresponding skills
const skillCategories = [
  {
    name: '3D Development',
    skills: ['Three.js', 'WebGL', 'GLSL', 'Spline', 'Blender', 'React Three Fiber'],
    color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    color: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Creative Coding',
    skills: ['p5.js', 'WebGL Shaders', 'Canvas API', 'SVG Animation', 'Generative Art'],
    color: 'bg-gradient-to-r from-amber-500 to-rose-500',
  },
  {
    name: 'Tools & Other',
    skills: ['Figma', 'Git', 'VS Code', 'WebXR', 'Progressive Web Apps', 'Performance Optimization'],
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
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
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Creative Developer with a Passion for Immersive Experiences
            </h3>
            
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                I'm a developer specializing in creating cutting-edge 3D web experiences 
                that push the boundaries of what's possible on the web. With expertise in 
                Three.js, WebGL, and modern front-end technologies, I bring creative visions to life.
              </p>
              
              <p>
                My background in both design and development allows me to bridge the gap between 
                aesthetics and functionality, creating experiences that are not only visually 
                stunning but also performant and accessible.
              </p>
              
              <p>
                I'm constantly exploring new technologies and techniques to create more immersive 
                and interactive digital experiences. When I'm not coding, you can find me experimenting 
                with generative art, 3D modeling, or exploring the latest in WebXR.
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
      </div>
    </section>
  );
} 
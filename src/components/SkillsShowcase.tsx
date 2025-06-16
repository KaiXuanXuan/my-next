'use client';

import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

interface Skill {
  category: string;
  skills: string[];
  color: string;
}

interface SubSkill {
  subCategory: string;
  skills: string[];
}

const frontendSubSkills: SubSkill[] = [
  {
    subCategory: '主流框架',
    skills: ['React', 'Vue', 'Next']
  },
  {
    subCategory: 'UI 框架',
    skills: ['Element', 'Antd', 'Shadcn']
  },
  {
    subCategory: '样式与动画',
    skills: ['Tailwind CSS', 'Scss', 'Less', 'motion']
  },
  {
    subCategory: '3D/可视化',
    skills: ['Three.js', 'Echarts', 'r3f']
  },
  {
    subCategory: '工程化',
    skills: ['Vite', 'Webpack']
  },
];

const otherSkills: Skill[] = [
  {
    category: '后端开发',
    skills: ['Node', 'Egg', 'Express', 'MySQL'],
    color: 'emerald'
  },
  {
    category: '开发工具',
    skills: ['Git', 'Docker', 'Cursor'],
    color: 'violet'
  },
  {
    category: '其他技能',
    skills: ['Python', 'Matlab', '剪辑'],
    color: 'amber'
  }
];

export const SkillsShowcase: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 标题区域 */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">
          技能展示
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-light">
          掌握现代前端技术栈，专注于用户体验和性能优化
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* 前端开发大板块 - 现代化浅色风格 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-200/60 flex flex-col md:col-span-3 relative overflow-hidden"
        >
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 shadow-sm"></div>
              <Title level={3} className="!mb-0 !text-slate-800 font-bold text-xl">
                前端开发
              </Title>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {frontendSubSkills.map((sub) => (
                <div key={sub.subCategory} className="space-y-3">
                  <div className="text-slate-600 font-semibold text-sm uppercase tracking-wider">{sub.subCategory}</div>
                  <div className="flex flex-wrap gap-2">
                    {sub.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-300/50 hover:from-blue-200 hover:to-indigo-200 hover:border-blue-400/60 transition-all duration-200 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 其他技能板块 - 浅色现代风格 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200/60 flex flex-col md:col-span-2 relative overflow-hidden"
        >
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mr-3"></div>
              <Title level={3} className="!mb-0 !text-slate-700 font-bold text-xl">
                其他技能
              </Title>
            </div>
            <div className="space-y-6">
              {otherSkills.map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-3">
                  <div className={`font-semibold text-sm uppercase tracking-wider ${skillGroup.color === 'emerald' ? 'text-emerald-600' :
                    skillGroup.color === 'violet' ? 'text-violet-600' :
                      'text-amber-600'
                    }`}>
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${skillGroup.color === 'emerald'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' :
                          skillGroup.color === 'violet'
                            ? 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' :
                            'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 
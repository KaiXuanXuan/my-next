'use client';

import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  {
    title: '2024美国大学生数学建模竞赛',
    award: '国际二等奖',
    tags: ['数学建模', '国际竞赛', '团队协作'],
    year: '2024',
    icon: '🏆',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-500',
    bgGradient: 'from-yellow-50 to-amber-50'
  },
  {
    title: '2024亚太地区大学生数学建模竞赛',
    award: '二等奖',
    tags: ['数学建模', '亚太地区', '数据分析'],
    year: '2024',
    icon: '🥈',
    gradient: 'from-gray-400 via-gray-500 to-slate-500',
    bgGradient: 'from-gray-50 to-slate-50'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const AwardSection: React.FC = () => {
  return (
    <section className="relative py-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-gray-400/10 to-slate-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-yellow-700 to-amber-700 bg-clip-text text-transparent mb-4">
            获奖经历
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-light">
            在学术竞赛中展现实力，通过团队协作获得优异成绩
          </p>
        </motion.div>

        {/* 获奖列表 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className="group relative"
            >
              {/* 卡片主体 */}
              <div className={`relative bg-gradient-to-br ${award.bgGradient} rounded-2xl p-8 shadow-xl border border-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}>
                {/* 装饰性渐变边框 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${award.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* 年份标签 */}
                <div className="absolute -top-3 -right-3">
                  <div className={`bg-gradient-to-r ${award.gradient} text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg`}>
                    {award.year}
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="relative z-10">
                  {/* 图标和奖项 */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${award.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl filter drop-shadow-sm">{award.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block bg-gradient-to-r ${award.gradient} text-white px-4 py-2 rounded-xl text-sm font-bold mb-2 shadow-md`}>
                        {award.award}
                      </div>
                    </div>
                  </div>

                  {/* 竞赛标题 */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-gray-900 transition-colors duration-300">
                    {award.title}
                  </h3>

                  {/* 标签区域 */}
                  <div className="flex flex-wrap gap-2">
                    {award.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.2 + tagIndex * 0.1,
                          ease: "easeOut"
                        }}
                        className="px-3 py-1 bg-white/70 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* 底部装饰线 */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${award.gradient} rounded-b-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 底部装饰 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="font-medium">持续努力，追求卓越</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 
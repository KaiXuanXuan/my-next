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
    gradient: 'gradient-btn-yellow',
    bgGradient: 'gradient-bg-yellow'
  },
  {
    title: '2024亚太地区大学生数学建模竞赛',
    award: '二等奖',
    tags: ['数学建模', '亚太地区', '数据分析'],
    year: '2024',
    icon: '🥈',
    gradient: 'gradient-btn-gray',
    bgGradient: 'gradient-bg-gray'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const AwardSection: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gray-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-12 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-award mb-4">
            获奖经历
          </h2>
          <div className="w-16 sm:w-20 h-1 gradient-line-yellow mx-auto rounded-full"></div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto font-light">
            在学术竞赛中展现实力，通过团队协作获得优异成绩
          </p>
        </motion.div>

        {/* 获奖列表 - 移动端改为单列布局 */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" } 
              }}
              className="group relative"
            >
              {/* 卡片主体 */}
              <div className={`relative ${award.bgGradient} rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl border border-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}>
                {/* 装饰性渐变边框 */}
                <div className={`absolute inset-0 ${award.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* 年份标签 - 移动端调整位置和大小 */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                  <div className={`${award.gradient} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg`}>
                    {award.year}
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="relative z-10">
                  {/* 图标和奖项 - 移动端优化布局 */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${award.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <span className="text-xl sm:text-2xl filter drop-shadow-sm">{award.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`inline-block ${award.gradient} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold mb-2 shadow-md`}>
                        {award.award}
                      </div>
                    </div>
                  </div>

                  {/* 竞赛标题 - 移动端优化字体大小和行距 */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight group-hover:text-gray-900 transition-colors duration-300">
                    {award.title}
                  </h3>

                  {/* 标签区域 - 移动端优化间距 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {award.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.3 + tagIndex * 0.1,
                          ease: "easeOut"
                        }}
                        className="px-2.5 py-1 sm:px-3 sm:py-1 bg-white/70 backdrop-blur-sm text-gray-700 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* 底部装饰线 */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${award.gradient} rounded-b-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 底部装饰 */}
        <motion.div 
          className="text-center mt-12 sm:mt-14 lg:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
            <div className="w-8 sm:w-12 h-px bg-gray-300"></div>
            <span className="font-medium whitespace-nowrap">持续努力，追求卓越</span>
            <div className="w-8 sm:w-12 h-px bg-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 
'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AwardSection } from './AwardSection';



// 动态加载3D组件，避免SSR问题
const Avatar3D = dynamic(() => import('./Avatar3D').then(mod => ({ default: mod.Avatar3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center shadow-inner">
      <div className="text-gray-400 text-xs sm:text-sm font-medium">头像加载中...</div>
    </div>
  ),
});

export function ProfileSection() {
  const personalInfo = {
    name: "黄凯旋",
    email: "1749043188@qq.com",
    phone: "+86 182-5795-2097",
    location: "广东省广州市",
    education: "暨南大学 信息管理与信息系统",
    description: "我是一名热爱钻研新技术，充满探索欲望的前端开发者。专注于现代 Web 开发技术。"
  };

  const contactInfo = [
    {
      label: "邮箱",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24V9H24H4V24V39H24" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M44 34L30 34" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M39 29L44 34L39 39" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 9L24 24L44 9" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    },
    {
      label: "电话",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11" y="4" width="26" height="40" rx="3" fill="none" stroke="#ddd" strokeWidth="4" /><path d="M22 10L26 10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 38H28" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    },
    {
      label: "地址",
      value: personalInfo.location,
      href: null,
      icon: <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 36V44H40V4H8V12" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 30H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 24H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 18H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="24" cy="17" r="4" fill="none" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M32 35C32 30.5817 28.4183 27 24 27C19.5817 27 16 30.5817 16 35" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    }
  ];

  const stats = [
    { label: "项目经验", value: "7+", icon: "🚀" },
    { label: "技术栈", value: "15+", icon: "⚡" },
    { label: "获奖经历", value: "2", icon: "🏆" }
  ];

  return (
    <div className="relative min-h-screen gradient-bg-main">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-title mb-3">
            个人简历
          </h1>
          <div className="w-16 sm:w-20 h-1 gradient-line-blue mx-auto rounded-full"></div>
        </motion.div>

        {/* 主要内容区域 - 移动端改为垂直布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {/* 左侧：头像和统计区域 */}
          <motion.div
            className="lg:col-span-1 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* 3D头像区域 - 移动端优化尺寸 */}
            <div className="flex justify-center h-[200px] sm:h-[240px] lg:h-[280px] items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64">
                {/* 外层旋转边框 - 正确的颜色旋转效果 */}
                <div className="animated-border-container absolute inset-0 rounded-2xl p-[2px]">
                  {/* 发光模糊效果 */}
                  <div className="animated-border-glow absolute inset-0 rounded-2xl opacity-60 blur-sm"></div>
                  {/* 白色边框容器 */}
                  <div className="relative w-full h-full bg-white rounded-2xl p-2 sm:p-3 shadow-xl">
                    {/* 3D头像内容 */}
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <Avatar3D />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 统计信息区域 - 移动端保持3列但调整间距 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/20 h-auto lg:h-[140px] flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-center w-full">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + index * 0.15,
                      ease: "easeOut"
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl mb-1">{stat.icon}</div>
                    <div className="text-base sm:text-lg font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧：个人信息 */}
          <motion.div
            className="lg:col-span-2 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* 基本信息和简介区域 - 移动端自适应高度 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/20 h-auto lg:h-[280px] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4 sm:space-y-6 lg:space-y-4"
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  {personalInfo.name}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center text-gray-600 font-medium">
                    <span className="w-1.5 h-4 sm:h-5 lg:h-6 gradient-line-blue mr-2 sm:mr-3 rounded-full"></span>
                    <span className="text-sm sm:text-base font-medium">教育经历</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-5 sm:pl-6">
                    {personalInfo.education}
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center text-gray-600 font-medium">
                    <span className="w-1.5 h-4 sm:h-5 lg:h-6 gradient-line-blue mr-2 sm:mr-3 rounded-full"></span>
                    <span className="text-sm sm:text-base font-medium">关于我</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-5 sm:pl-6">
                    {personalInfo.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 联系方式区域 - 移动端改为垂直布局 */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/20 h-auto lg:h-[140px] flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="w-1.5 h-4 sm:h-5 lg:h-6 gradient-line-cyan mr-2 sm:mr-3 rounded-full"></span>
                联系方式
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    className="flex items-center space-x-2 sm:space-x-3 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1 + index * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 gradient-btn-blue rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-xs sm:text-sm">
                        {contact.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 font-medium">{contact.label}</div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium text-xs sm:text-sm truncate block"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-gray-800 font-medium text-xs sm:text-sm">{contact.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 获奖经历部分 */}
        <AwardSection />
      </div>
    </div>
  );
} 
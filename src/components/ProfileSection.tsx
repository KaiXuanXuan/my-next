'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AwardSection } from './AwardSection';

// 动态加载3D组件，避免SSR问题
const Avatar3D = dynamic(() => import('./Avatar3D').then(mod => ({ default: mod.Avatar3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl flex items-center justify-center shadow-inner">
      <div className="text-gray-400 text-sm font-medium">头像加载中...</div>
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
      icon: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24V9H24H4V24V39H24" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M44 34L30 34" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M39 29L44 34L39 39" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 9L24 24L44 9" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    },
    {
      label: "电话",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11" y="4" width="26" height="40" rx="3" fill="none" stroke="#ddd" strokeWidth="4" /><path d="M22 10L26 10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 38H28" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    },
    {
      label: "地址",
      value: personalInfo.location,
      href: null,
      icon: <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 36V44H40V4H8V12" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 30H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 24H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 18H10" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="24" cy="17" r="4" fill="none" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M32 35C32 30.5817 28.4183 27 24 27C19.5817 27 16 30.5817 16 35" stroke="#ddd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    }
  ];

  const stats = [
    { label: "项目经验", value: "7+", icon: "🚀" },
    { label: "技术栈", value: "15+", icon: "⚡" },
    { label: "获奖经历", value: "2", icon: "🏆" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            个人简历
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* 左侧：头像和统计区域 */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* 3D头像区域 - 与右侧基本信息高度对齐 */}
            <div className="flex justify-center h-[280px]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-20 scale-110"></div>
                <div className="relative w-64 h-64 bg-white rounded-xl shadow-xl p-3">
                  <Avatar3D />
                </div>
              </div>
            </div>

            {/* 统计信息区域 - 与右侧联系方式高度对齐 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 h-[140px] flex items-center justify-center">
              <div className="grid grid-cols-3 gap-6 text-center w-full">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧：个人信息 */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* 基本信息和简介区域 - 与左侧头像高度对齐 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 h-[280px] flex flex-col !justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent !mb-8">
                  {personalInfo.name}
                </h2>
                <div className="flex items-center text-gray-600 mb-4 font-medium">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"></span>
                  <span className="text-base font-medium">教育经历</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {personalInfo.education}
                </p>
                <div className="flex items-center text-gray-600 mb-4 font-medium">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"></span>
                  <span className="text-base font-medium">关于我</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-base !mb-0">
                  {personalInfo.description}
                </p>
              </motion.div>
            </div>

            {/* 联系方式区域 - 与左侧统计信息高度对齐 */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 h-[140px] flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-gray-800 !mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 mr-3 rounded-full"></span>
                联系方式
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    className="flex items-center space-x-3 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm">
                        {contact.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 font-medium">{contact.label}</div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium text-sm truncate block"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className="text-gray-800 font-medium text-sm">{contact.value}</span>
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
#!/usr/bin/env node

/**
 * GLTF模型压缩脚本
 * 使用 gltf-pipeline 和 Draco 压缩来减小模型文件大小
 * 
 * 安装依赖: npm install -g gltf-pipeline
 * 使用方法: node scripts/compress-models.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归复制目录函数（兼容Windows）
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 模型文件夹路径
const MODELS_DIR = path.join(__dirname, '../public/models');
const COMPRESSED_DIR = path.join(__dirname, '../public/models-compressed');

// 创建压缩目录
if (!fs.existsSync(COMPRESSED_DIR)) {
  fs.mkdirSync(COMPRESSED_DIR, { recursive: true });
}

// 需要压缩的模型目录
const modelDirs = [
  'pusheen_-_im_busy',
  'pusheen_vs_noodle', 
  'halloween',
  'pom-pom__blockbench'
];

console.log('🚀 开始压缩3D模型...\n');

modelDirs.forEach(dirName => {
  const inputDir = path.join(MODELS_DIR, dirName);
  const outputDir = path.join(COMPRESSED_DIR, dirName);
  const inputFile = path.join(inputDir, 'scene.gltf');
  
  if (!fs.existsSync(inputFile)) {
    console.log(`⚠️  跳过 ${dirName}: scene.gltf 不存在`);
    return;
  }
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputFile = path.join(outputDir, 'scene.gltf');
  
  try {
    console.log(`📦 压缩 ${dirName}...`);
    
    // 获取原始文件大小
    const originalStats = fs.statSync(inputFile);
    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
    
    // 检查模型是否已经使用Draco压缩
    const gltfContent = fs.readFileSync(inputFile, 'utf8');
    const isAlreadyCompressed = gltfContent.includes('KHR_draco_mesh_compression');
    
    if (isAlreadyCompressed) {
      console.log(`ℹ️  ${dirName} 已使用Draco压缩，直接复制...`);
      fs.copyFileSync(inputFile, outputFile);
      
      // 复制bin文件
      const binFile = path.join(inputDir, 'scene.bin');
      if (fs.existsSync(binFile)) {
        fs.copyFileSync(binFile, path.join(outputDir, 'scene.bin'));
      }
    } else {
      // 使用 gltf-pipeline 进行 Draco 压缩
      const command = `gltf-pipeline -i "${inputFile}" -o "${outputFile}" --draco.compressionLevel=7 --draco.quantizePositionBits=11 --draco.quantizeTexcoordBits=10 --draco.quantizeColorBits=8 --draco.quantizeNormalBits=8`;
      
      execSync(command, { stdio: 'pipe' }); // 使用pipe减少输出
    }
    
    // 获取压缩后文件大小
    const compressedStats = fs.statSync(outputFile);
    const compressedSize = (compressedStats.size / 1024 / 1024).toFixed(2);
    const reduction = (((originalStats.size - compressedStats.size) / originalStats.size) * 100).toFixed(1);
    
    console.log(`✅ ${dirName} 处理完成:`);
    console.log(`   原始大小: ${originalSize} MB`);
    console.log(`   处理后大小: ${compressedSize} MB`);
    if (isAlreadyCompressed) {
      console.log(`   状态: 已经压缩过，直接复制`);
    } else {
      console.log(`   压缩效果: ${reduction > 0 ? '减少' : '增加'} ${Math.abs(parseFloat(reduction))}%`);
    }
    console.log('');
    
    // 复制其他资源文件
    const files = fs.readdirSync(inputDir);
    files.forEach(file => {
      if (file !== 'scene.gltf' && file !== 'scene.bin') {
        const srcFile = path.join(inputDir, file);
        const destFile = path.join(outputDir, file);
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
        } else if (fs.statSync(srcFile).isDirectory()) {
          copyDirectory(srcFile, destFile);
        }
      }
    });
    
  } catch (error) {
    console.error(`❌ 处理 ${dirName} 失败:`, error.message);
  }
});

console.log('🎉 模型处理完成！');
console.log('\n📝 使用处理后模型的步骤:');
console.log('1. 将 public/models 备份为 public/models-original');
console.log('2. 将 public/models-compressed 重命名为 public/models'); 
console.log('3. 测试网站加载速度');
console.log('\n💡 注意: 某些模型可能已经过优化，压缩效果有限'); 
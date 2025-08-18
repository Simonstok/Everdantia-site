import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-build optimization script
async function preBuildOptimization() {
  console.log('🚀 Pre-build optimization starting...\n');
  
  // 1. Check if images need optimization
  const publicDir = path.join(__dirname, '../public/images');
  let needsOptimization = false;
  
  console.log('📁 Checking for unoptimized images...');
  
  function checkDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        checkDirectory(fullPath);
      } else if (item.match(/\.(jpg|jpeg|png)$/i)) {
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const originalStat = fs.statSync(fullPath);
        
        if (!fs.existsSync(webpPath)) {
          console.log(`❌ Missing WebP: ${path.relative(publicDir, fullPath)}`);
          needsOptimization = true;
        } else {
          const webpStat = fs.statSync(webpPath);
          if (originalStat.mtime > webpStat.mtime) {
            console.log(`⚠️  Outdated WebP: ${path.relative(publicDir, fullPath)}`);
            needsOptimization = true;
          }
        }
        
        // Check for oversized images
        if (originalStat.size > 1000000) { // 1MB
          console.log(`📏 Large image: ${path.relative(publicDir, fullPath)} (${(originalStat.size / 1024 / 1024).toFixed(2)}MB)`);
        }
      }
    });
  }
  
  if (fs.existsSync(publicDir)) {
    checkDirectory(publicDir);
  }
  
  if (needsOptimization) {
    console.log('\n🔧 Running image optimization...');
    // Could run the Python script here or use Sharp
    console.log('Run: npm run optimize-images');
  } else {
    console.log('✅ All images are optimized');
  }
  
  // 2. Validate critical Twitter Cards
  console.log('\n🐦 Validating Twitter Card setup...');
  
  // Check if critical meta tags are properly configured
  const blogLayoutPath = path.join(__dirname, '../src/layouts/BlogLayout.astro');
  const layoutContent = fs.readFileSync(blogLayoutPath, 'utf-8');
  
  const criticalChecks = [
    { pattern: /twitter:card.*summary_large_image/, name: 'Twitter Card type' },
    { pattern: /twitter:image.*content=/, name: 'Twitter image meta tag' },
    { pattern: /og:image.*content=/, name: 'Open Graph image meta tag' },
    { pattern: /absoluteFeaturedImageFallback/, name: 'Image fallback system' }
  ];
  
  criticalChecks.forEach(check => {
    if (check.pattern.test(layoutContent)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
  
  console.log('\n🎯 Performance recommendations:');
  console.log('• Use WebP images for page content');
  console.log('• Use JPG images for social media meta tags');
  console.log('• Keep social images under 1MB for fast crawling');
  console.log('• Test with Twitter Card Validator before publishing');
  
  console.log('\n✨ Pre-build optimization complete!');
}

preBuildOptimization().catch(console.error);

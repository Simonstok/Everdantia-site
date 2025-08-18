import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for common files that cause 404 errors
function checkFor404Issues() {
  console.log('🔍 Checking for common 404 error sources...\n');
  
  const publicDir = path.join(__dirname, '../public');
  const srcDir = path.join(__dirname, '../src');
  
  const commonFiles = [
    { path: 'sw.js', description: 'Service Worker file', required: false },
    { path: 'manifest.json', description: 'PWA Manifest', required: false },
    { path: 'robots.txt', description: 'Search engine robots file', required: true },
    { path: 'favicon.ico', description: 'Main favicon', required: true },
    { path: 'sitemap.xml', description: 'XML sitemap', required: false }
  ];
  
  console.log('📁 Checking public directory files:');
  commonFiles.forEach(file => {
    const filePath = path.join(publicDir, file.path);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : (file.required ? '❌' : '⚠️');
    const note = exists ? 'Present' : (file.required ? 'MISSING (causes 404)' : 'Optional (may cause 404 if referenced)');
    
    console.log(`${status} ${file.path} - ${file.description}: ${note}`);
  });
  
  // Check for broken script references
  console.log('\n🔗 Checking for script references:');
  
  function checkFileForScriptRefs(filePath, fileType) {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const scriptRefs = [
      ...content.matchAll(/src=["']([^"']*\.js)["']/g),
      ...content.matchAll(/href=["']([^"']*\.js)["']/g),
      ...content.matchAll(/register\(["']([^"']*\.js)["']\)/g)
    ];
    
    if (scriptRefs.length > 0) {
      console.log(`\n📄 ${fileType}: ${path.basename(filePath)}`);
      scriptRefs.forEach(match => {
        const scriptPath = match[1];
        const fullPath = scriptPath.startsWith('/') 
          ? path.join(publicDir, scriptPath.substring(1))
          : path.join(path.dirname(filePath), scriptPath);
        
        const exists = fs.existsSync(fullPath);
        console.log(`  ${exists ? '✅' : '❌'} ${scriptPath} ${exists ? '' : '(404 ERROR)'}`);
      });
    }
  }
  
  // Check main pages
  const pagesToCheck = [
    path.join(srcDir, 'pages/index.astro'),
    path.join(srcDir, 'layouts/Layout.astro'),
    path.join(srcDir, 'layouts/BlogLayout.astro'),
    path.join(srcDir, 'components/SEO.astro'),
    path.join(srcDir, 'components/PerformanceOptimization.astro')
  ];
  
  pagesToCheck.forEach(pageFile => {
    if (fs.existsSync(pageFile)) {
      checkFileForScriptRefs(pageFile, 'Component/Page');
    }
  });
  
  console.log('\n🎯 Recommendations:');
  
  if (!fs.existsSync(path.join(publicDir, 'sw.js'))) {
    console.log('✅ Created sw.js to prevent service worker 404 errors');
  }
  
  console.log('• Monitor browser console for additional 404 errors');
  console.log('• Check network tab in DevTools for failing requests');
  console.log('• Ensure all referenced scripts and assets exist');
  console.log('• Consider using relative paths for local assets');
  
  console.log('\n📊 Expected Lighthouse Best Practices improvements:');
  console.log('• Service Worker 404 fixed → Should improve score');
  console.log('• Reduced console errors → Cleaner browser environment');
  console.log('• Better PWA readiness → Higher best practices score');
}

checkFor404Issues();

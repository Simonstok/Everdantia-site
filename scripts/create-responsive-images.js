import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Sharp is available
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.log('Sharp is not installed. Please run: npm install sharp');
  process.exit(1);
}

async function createResponsiveImages() {
  console.log('🖼️  Creating responsive image sizes...\n');
  
  const treesDir = path.join(__dirname, '../public/images/trees');
  const problematicImages = ['14', '100', '74'];
  
  for (const imageNumber of problematicImages) {
    const inputPath = path.join(treesDir, `${imageNumber}.jpg`);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`❌ Source image not found: ${imageNumber}.jpg`);
      continue;
    }
    
    console.log(`📏 Processing image ${imageNumber}...`);
    
    // Get original stats
    const originalStats = fs.statSync(inputPath);
    console.log(`   Original JPG: ${(originalStats.size / 1024).toFixed(0)}KB`);
    
    // Tree cards are displayed at 300px height, aspect ratio varies
    // Create optimized versions for different screen densities
    const sizes = [
      { suffix: '-small', width: 300, height: 300, quality: 85 },
      { suffix: '-medium', width: 600, height: 600, quality: 85 },
      { suffix: '', width: 800, height: 800, quality: 80 } // Default size
    ];
    
    for (const size of sizes) {
      try {
        // WebP version
        const webpPath = path.join(treesDir, `${imageNumber}${size.suffix}.webp`);
        await sharp(inputPath)
          .resize(size.width, size.height, { 
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: size.quality })
          .toFile(webpPath);
        
        // JPG fallback
        const jpgPath = path.join(treesDir, `${imageNumber}${size.suffix}.jpg`);
        await sharp(inputPath)
          .resize(size.width, size.height, { 
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: size.quality })
          .toFile(jpgPath);
        
        const webpStats = fs.statSync(webpPath);
        const jpgStats = fs.statSync(jpgPath);
        
        console.log(`   ${size.width}x${size.height}: ${(webpStats.size / 1024).toFixed(0)}KB WebP, ${(jpgStats.size / 1024).toFixed(0)}KB JPG`);
        
      } catch (error) {
        console.error(`   ❌ Error creating ${size.width}x${size.height}: ${error.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log('🎯 Usage in HTML:');
  console.log(`
<picture>
  <source srcset="/images/trees/14-small.webp 1x, /images/trees/14-medium.webp 2x" 
          type="image/webp" 
          media="(max-width: 600px)" />
  <source srcset="/images/trees/14.webp" type="image/webp" />
  <img src="/images/trees/14-medium.jpg" 
       alt="Tree name" 
       loading="lazy"
       style="width: 100%; height: 100%; object-fit: cover;" />
</picture>
  `);
  
  console.log('\n✨ Responsive image generation complete!');
  console.log('💡 Expected savings: 50-70% reduction in image payload for mobile users');
}

async function createHeroResponsive() {
  console.log('🖼️  Creating hero image sizes...\n');
  
  const heroJpg = path.join(__dirname, '../public/images/background/hilltop/hilltop0.jpg');
  if (!fs.existsSync(heroJpg)) {
    console.log('❌ Source hero image not found: hilltop0.jpg');
    return;
  }

  console.log(`📏 Processing hero image...`);
  
  // Get original stats
  const originalStats = fs.statSync(heroJpg);
  console.log(`   Original JPG: ${(originalStats.size / 1024).toFixed(0)}KB`);
  
  const sizes = [
    { suffix: '-small', width: 768, quality: 80 },
    { suffix: '-medium', width: 1280, quality: 80 },
    { suffix: '-1920', width: 1920, quality: 75 }, // Large size
    { suffix: '', width: 1920, quality: 75 } // Default size (keep original)
  ];
  
  for (const size of sizes) {
    try {
      // WebP version
      const webpPath = path.join(__dirname, `../public/images/background/hilltop/hilltop0${size.suffix}.webp`);
      await sharp(heroJpg)
        .resize(size.width)
        .webp({ quality: size.quality })
        .toFile(webpPath);
      
      // JPG fallback
      const jpgPath = path.join(__dirname, `../public/images/background/hilltop/hilltop0${size.suffix}.jpg`);
      await sharp(heroJpg)
        .resize(size.width)
        .jpeg({ quality: size.quality })
        .toFile(jpgPath);
      
      const webpStats = fs.statSync(webpPath);
      const jpgStats = fs.statSync(jpgPath);
      
      console.log(`   ${size.width}: ${(webpStats.size / 1024).toFixed(0)}KB WebP, ${(jpgStats.size / 1024).toFixed(0)}KB JPG`);
      
    } catch (error) {
      console.error(`   ❌ Error creating hero ${size.width}: ${error.message}`);
    }
  }
  
  console.log('\n✨ Hero image generation complete!');
}

createResponsiveImages()
  .then(createHeroResponsive)
  .catch(console.error);

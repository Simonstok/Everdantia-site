import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Sharp is available, if not, provide instructions
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.log('Sharp is not installed. Please run: npm install sharp');
  process.exit(1);
}

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const {
      width = 1200,
      height = 630,
      quality = 85,
      format = 'webp'
    } = options;

    await sharp(inputPath)
      .resize(width, height, { 
        fit: 'cover',
        position: 'center'
      })
      .toFormat(format, { quality })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
    console.log(`   Original: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized: ${(outputStats.size / 1024).toFixed(0)}KB`);
    console.log(`   Savings: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}%`);
    
    return outputStats.size;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    throw error;
  }
}

async function optimizeBlogImages() {
  const blogImagesDir = path.join(__dirname, '../public/images/blog');
  
  console.log('🖼️  Optimizing blog images for social sharing...\n');
  
  // Optimize oak.jpg for Twitter Cards (1200x630, under 1MB)
  await optimizeImage(
    path.join(blogImagesDir, 'oak-original.jpg'),
    path.join(blogImagesDir, 'oak.webp'),
    { width: 1200, height: 630, quality: 85, format: 'webp' }
  );
  
  // Create a smaller JPG version as fallback
  await optimizeImage(
    path.join(blogImagesDir, 'oak-original.jpg'),
    path.join(blogImagesDir, 'oak.jpg'),
    { width: 1200, height: 630, quality: 80, format: 'jpeg' }
  );
  
  console.log('\n✨ Image optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Update your blog post to use oak.webp for better performance');
  console.log('2. Keep oak.jpg as fallback for older browsers');
  console.log('3. Test Twitter Card sharing with the optimized images');
}

// Run if this is the main module
optimizeBlogImages().catch(console.error);

export { optimizeImage, optimizeBlogImages };

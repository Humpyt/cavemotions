const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

/**
 * CSS Optimization Script
 * This script optimizes CSS files in the .next/static/css directory
 * after the build process to ensure maximum compression and optimization.
 */

async function optimizeCSS() {
  const cssDir = path.join(process.cwd(), '.next/static/css');
  
  if (!fs.existsSync(cssDir)) {
    console.log('No CSS directory found, skipping optimization.');
    return;
  }

  const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  
  if (cssFiles.length === 0) {
    console.log('No CSS files found to optimize.');
    return;
  }

  console.log(`Optimizing ${cssFiles.length} CSS files...`);

  for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    const css = fs.readFileSync(filePath, 'utf8');
    
    try {
      const result = await postcss([
        cssnano({
          preset: ['advanced', {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            minifySelectors: true,
            minifyParams: true,
            mergeLonghand: true,
            mergeRules: true,
            reduceIdents: false, // Keep this false to avoid breaking CSS variables
            zindex: false, // Keep this false to avoid z-index conflicts
          }],
        }),
      ]).process(css, { from: filePath, to: filePath });
      
      const originalSize = Buffer.byteLength(css, 'utf8');
      const optimizedSize = Buffer.byteLength(result.css, 'utf8');
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      
      fs.writeFileSync(filePath, result.css);
      console.log(`✓ ${file}: ${originalSize} → ${optimizedSize} bytes (${savings}% reduction)`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('CSS optimization complete!');
}

// Run the optimization
optimizeCSS().catch(console.error);